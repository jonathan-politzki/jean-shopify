import { authenticate } from "~/lib/shopify.server";
import { jeanClient } from "~/lib/jean-client";

export async function loader({ request }) {
  await authenticate.admin(request);
  
  const { data: { url } } = await jeanClient.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.HOST}/auth/callback`
    }
  });

  return redirect(url);
}