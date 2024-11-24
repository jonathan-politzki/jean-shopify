import { json } from "@remix-run/node";
import { createPersonalityLink } from "~/lib/db.server";
import { authenticate } from "~/lib/shopify.server";

export async function action({ request }) {
  const { shop } = await authenticate.admin(request);
  const { userId, link } = await request.json();

  const personalityLink = await createPersonalityLink(userId, shop, link);
  
  return json({ success: true, data: personalityLink });
}