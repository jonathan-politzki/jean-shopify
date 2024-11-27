// app/routes/auth/callback.tsx
import { redirect } from "@remix-run/node";
import { createClient } from '@/lib/supabase/server';
import { authenticate } from "~/lib/shopify.server";

export async function loader({ request }) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  // Handle Supabase auth callback
  const supabase = await createClient();
  if (code) {
    const { error: authError } = await supabase.auth.exchangeCodeForSession(code);
    if (authError) {
      console.error('Auth error:', authError);
      return redirect('/auth/error');
    }
  }

  // Verify Shopify context is still valid
  try {
    await authenticate.admin(request);
  } catch (error) {
    console.error('Shopify auth error:', error);
    return redirect('/auth/error');
  }

  return redirect("/");
}