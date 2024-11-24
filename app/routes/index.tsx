import { useEffect } from "react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "~/lib/shopify.server";

export async function loader({ request }) {
  await authenticate.admin(request);
  return json({ });
}

export default function Index() {
  return (
    <div className="p-4">
      <h1>Jean Personal Shopper</h1>
      {/* Add your components here */}
    </div>
  );
}