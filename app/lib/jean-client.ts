import { createClient } from '@supabase/supabase-js';

export const jeanClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Re-export key types from main Jean repo
export type { User, SocialProfile } from '../../jean-technologies/src/lib/types';