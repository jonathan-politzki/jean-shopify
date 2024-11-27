// app/components/AuthFlow.tsx
import { createClient } from '@/lib/supabase/client';

export function AuthFlow() {
  const handleAuth = async (provider) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    // Handle auth flow
  };
  // Render auth UI
}