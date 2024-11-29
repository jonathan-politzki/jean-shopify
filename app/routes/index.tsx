// app/routes/_index.tsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../lib/shopify.server";
import {
  Card,
  Layout,
  Page,
  Text,
  BlockStack,
} from "@shopify/polaris";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  
  return json({ 
    message: "Welcome to Jean Personal Shopper" 
  });
};

export default function Index() {
  const { message } = useLoaderData();
  
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">
                {message}
              </Text>
              <Text>
                Get started by sharing your personality link.
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}