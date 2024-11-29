// app/routes/index.tsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../lib/shopify.server";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
} from "@shopify/polaris";
import { PersonalityLink } from "../components/PersonalityLink";

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
          <BlockStack gap="500">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">
                  {message}
                </Text>
                <Text>
                  Let's help your customers find the perfect products for them.
                </Text>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h3">
                  Get Product Recommendations
                </Text>
                <PersonalityLink />
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}