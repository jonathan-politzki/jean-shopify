// app/routes/index.tsx
import { json } from "@remix-run/node";
import { useLoaderData, useActionData } from "@remix-run/react";
import { authenticate } from "~/lib/shopify.server";
import { createClient } from "~/lib/supabase/server";
import { AuthFlow } from "~/components/AuthFlow";
import { PersonalityLink } from "~/components/PersonalityLink";
import { ProductRecommendations } from "~/components/ProductRecommendations";

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
  const actionData = useActionData();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Jean Personal Shopper
        </h1>
        
        <div className="space-y-8">
          {!isAuthenticated ? (
            <div className="bg-white p-8 rounded-lg shadow-sm max-w-md mx-auto">
              <h2 className="text-xl font-semibold mb-6">Get Started</h2>
              <AuthFlow />
            </div>
          ) : (
            <>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-6">
                  Welcome, {user.email}
                </h2>
                <PersonalityLink />
              </div>

              {actionData?.products && (
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-6">
                    Your Personalized Recommendations
                  </h2>
                  <ProductRecommendations products={actionData.products} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}