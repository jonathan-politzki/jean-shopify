import "@shopify/shopify-app-remix/adapters/node";
import {
  AppDistribution,
  DeliveryMethod,
  shopifyApp,
  LATEST_API_VERSION
} from "@shopify/shopify-app-remix";
import { join } from "path";
import { LogSeverity } from "@shopify/shopify-api";

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY || "",
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  appUrl: process.env.SHOPIFY_APP_URL || "https://ffc2-2601-246-4100-39f0-5847-9fbd-456e-cdf3.ngrok-free.app",
  apiVersion: LATEST_API_VERSION,
  scopes: "write_products,read_products,write_customers,read_customers",
  distribution: AppDistribution.AppStore,
  deliveryMethod: DeliveryMethod.Http,
  isEmbeddedApp: true,
  logger: {
    level: LogSeverity.Debug,
  },
  sessionStorage: new (require('@shopify/shopify-app-session-storage-memory').MemorySessionStorage)(),
});

export const authenticate = shopify.authenticate;
export const sessionStorage = shopify.sessionStorage;