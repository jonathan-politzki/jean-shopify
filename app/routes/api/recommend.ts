// app/routes/api/recommend.ts
import { json } from "@remix-run/node";
import OpenAI from "openai";
import { authenticate } from "~/lib/shopify.server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function action({ request }) {
  const { shop } = await authenticate.admin(request);
  const { personalityLink } = await request.json();

  // Get products from Shopify
  const response = await fetch(`https://${shop}/admin/api/2024-01/products.json`, {
    headers: {
      'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
    },
  });
  
  const { products } = await response.json();
  
  // Get recommendations from OpenAI
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a personal shopping assistant. Based on the provided link that represents someone's personality, recommend the most suitable items from the store's products. Return your response as a JSON array of objects, each with productId and reasoning fields."
      },
      {
        role: "user",
        content: `Personality Link: ${personalityLink}\n\nAvailable Products: ${JSON.stringify(products)}`
      }
    ],
    response_format: { type: "json_object" }
  });

  const recommendations = JSON.parse(completion.choices[0].message.content);
  
  return json({ success: true, recommendations });
}