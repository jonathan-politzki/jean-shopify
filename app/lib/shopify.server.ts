// app/lib/shopify.server.ts
import "@shopify/shopify-app-remix/adapters/node";
import {
  AppDistribution,
  DeliveryMethod,
  shopifyApp,
  LATEST_API_VERSION
} from "@shopify/shopify-app-remix";

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY || "",
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  appUrl: process.env.SHOPIFY_APP_URL || "",
  apiVersion: LATEST_API_VERSION,
  scopes: (process.env.SCOPES || "").split(","),
  distribution: AppDistribution.AppStore,
  deliveryMethod: DeliveryMethod.Http,
  isEmbeddedApp: true,
});

export const authenticate = shopify;
