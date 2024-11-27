// app/routes/auth/callback.tsx
import { redirect } from "@remix-run/node";
import { createClient } from '@/lib/supabase/server';

export async function loader({ request }) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  return redirect("/");
}