// app/routes/test.tsx
import { json } from "@remix-run/node";
import { createClient } from "~/lib/supabase/server";
import { authenticate } from "~/lib/shopify.server";

export async function loader({ request }) {
  try {
    // Test Shopify auth
    const shopify = await authenticate.admin(request);
    
    // Test Supabase connection
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    return json({
      status: 'success',
      shopify: shopify ? 'connected' : 'not connected',
      supabase: session ? 'connected' : 'not connected'
    });
  } catch (error) {
    return json({
      status: 'error',
      message: error.message
    }, { status: 500 });
  }
}

export default function Test() {
  return (
    <div className="p-4">
      <h1>Auth Test Page</h1>
      <pre id="auth-status">Checking connections...</pre>
    </div>
  );
}