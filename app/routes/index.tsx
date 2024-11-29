// root/app/routes/index.tsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
} from "@shopify/polaris";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return json({ 
    message: "App successfully loaded!" 
  });
};

export default function Index() {
  const { message } = useLoaderData();
  
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card>
            <Text variant="headingMd" as="h2">
              {message}
            </Text>
            <Button 
              primary 
              onClick={() => {
                alert("Button clicked!")
              }}
            >
              Test Button
            </Button>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
