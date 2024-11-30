// app/routes/_index.tsx
import { LoaderFunction, json, ActionFunction } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { Page, Layout, Card, TextField, Button } from "@shopify/polaris";
import { authenticate } from "../lib/shopify.server";
import { useState } from "react";

export const loader: LoaderFunction = async ({ request }) => {
  await authenticate.admin(request);
  return json({ ok: true });
};

export const action: ActionFunction = async ({ request }) => {
  const { shop } = await authenticate.admin(request);
  const formData = await request.formData();
  const personalityLink = formData.get('personalityLink');

  // Fetch products from Shopify
  const response = await fetch(
    `https://${shop}/admin/api/2024-01/products.json`,
    {
      headers: {
        'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
      },
    }
  );
  const { products } = await response.json();

  // Get OpenAI recommendations
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a personal shopping assistant. Given a link that represents someone's personality and a list of products, recommend 3 items that would suit them best.`
      },
      {
        role: "user",
        content: `Link: ${personalityLink}\nProducts: ${JSON.stringify(products)}`
      }
    ]
  });

  return json({ recommendations: completion.choices[0].message.content });
};

export default function Index() {
  const [loading, setLoading] = useState(false);

  return (
    <Page title="Personal Shopper">
      <Layout>
        <Layout.Section>
          <Card>
            <Form method="post" onSubmit={() => setLoading(true)}>
              <TextField
                label="Share a link that represents you"
                type="url"
                name="personalityLink"
                placeholder="https://..."
                required
              />
              <Button submit loading={loading}>
                Get Recommendations
              </Button>
            </Form>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
