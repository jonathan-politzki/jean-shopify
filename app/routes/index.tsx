// app/routes/index.tsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "~/lib/shopify.server";
import { createClient } from "~/lib/supabase/server";
import { AuthFlow } from "~/components/AuthFlow";
import { PersonalityLink } from "~/components/PersonalityLink";
import { ProductRecommendation } from "~/components/ProductRecommendation";

export async function loader({ request }) {
  // Verify Shopify context
  await authenticate.admin(request);
  
  // Get user session
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  return json({ 
    isAuthenticated: !!session,
    user: session?.user 
  });
}

export default function Index() {
  const { isAuthenticated, user } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">Jean Personal Shopper</h1>
      
      {!isAuthenticated ? (
        <AuthFlow />
      ) : (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Welcome {user.email}</h2>
            <PersonalityLink />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Your Recommendations</h2>
            <ProductRecommendation />
          </div>
        </div>
      )}
    </div>
  );
}