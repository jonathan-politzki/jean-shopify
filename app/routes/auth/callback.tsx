import { authenticate } from "~/lib/shopify.server";
import { jeanClient } from "~/lib/jean-client";

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);
  
  // Handle Jean authentication callback
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    await jeanClient.auth.exchangeCodeForSession(code);
  }

  return redirect("/");
}