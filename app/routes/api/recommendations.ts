// app/routes/api/recommendations.ts
import { json } from "@remix-run/node";
import { createClient } from '@/lib/supabase/server';
import { authenticate } from "~/lib/shopify.server";

export async function action({ request }) {
  // First verify Shopify admin authentication
  const { shop } = await authenticate.admin(request);
  
  // Then get Supabase session for user context
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return json({ error: 'User not authenticated' }, { status: 401 });
  }

  try {
    const { personalityLink } = await request.json();

    // Call Supabase Edge Function for analysis
    const { data: recommendations, error } = await supabase.functions.invoke(
      'understand_user',
      {
        body: {
          userId: session.user.id,
          domain: shop, // Pass shop context to the analysis
          query: personalityLink
        }
      }
    );

    if (error) throw error;

    return json({ success: true, data: recommendations });
  } catch (error) {
    console.error('Recommendation error:', error);
    return json({ 
      success: false, 
      error: 'Failed to generate recommendations' 
    }, { 
      status: 500 
    });
  }
}