// app/root.tsx
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
  } from "@remix-run/react";
  import { AppProvider } from "@shopify/shopify-app-remix";
  import { PolarisProvider } from "@shopify/shopify-app-remix/build/node/components";
  
  export default function App() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <AppProvider>
            <PolarisProvider>
              <Outlet />
            </PolarisProvider>
          </AppProvider>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }