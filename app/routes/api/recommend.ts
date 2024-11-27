// app/routes/api/recommend.ts
import { json } from "@remix-run/node";
import { authenticate } from "~/lib/shopify.server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function action({ request }) {
  try {
    const { shop } = await authenticate.admin(request);
    const formData = await request.formData();
    const personalityLink = formData.get('personalityLink');

    if (!personalityLink) {
      throw new Error('Personality link is required');
    }

    // Get products from Shopify Admin API
    const response = await fetch(
      `https://${shop}/admin/api/2024-01/products.json`, 
      {
        headers: {
          'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
        },
      }
    );

    const { products } = await response.json();

    // Get recommendations from OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a personal shopping assistant. Given a link that represents someone's personality and a list of products, 
                   recommend 3-5 items that would suit them best. For each recommendation, explain why it matches their personality.
                   Return your response as a JSON array of objects with productId, reasoning fields.`
        },
        {
          role: "user",
          content: `Link: ${personalityLink}
                   Available Products: ${JSON.stringify(products)}`
        }
      ],
      response_format: { type: "json_object" }
    });

    // Parse and format recommendations
    const aiRecommendations = JSON.parse(completion.choices[0].message.content);
    
    // Match with full product data
    const recommendedProducts = aiRecommendations.recommendations.map(rec => {
      const product = products.find(p => p.id === rec.productId);
      return {
        ...product,
        reasoning: rec.reasoning
      };
    });

    return json({ products: recommendedProducts });
  } catch (error) {
    console.error('Recommendation error:', error);
    return json({ error: 'Failed to generate recommendations' }, { status: 500 });
  }
}