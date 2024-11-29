// app/routes/_index.tsx
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Layout, Card, Text } from "@shopify/polaris";
import { authenticate } from "../lib/shopify.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  
  return json({
    message: "Welcome to Jean Personal Shopper",
  });
};

export default function Index() {
  const { message } = useLoaderData<typeof loader>();

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card>
            <Text variant="headingMd" as="h2">
              {message}
            </Text>
            <Text>
              Let's help your customers find the perfect products.
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
