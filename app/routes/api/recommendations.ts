import { json } from "@remix-run/node";
import { authenticate } from "~/lib/shopify.server";
import { analyzePersonality } from "~/lib/openai.server";

export async function action({ request }) {
  const { shop } = await authenticate.admin(request);
  const { personalityLink } = await request.json();

  const recommendations = await analyzePersonality(shop, personalityLink);
  
  return json({ success: true, data: recommendations });
}