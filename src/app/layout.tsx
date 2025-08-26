import "@/css/satoshi.css";
import "@/css/style.css";


import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import { LanguageProvider } from "@/context/LanguageContext";
import { StoreProvider } from "@/store/store-context";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    template: "Document Management System - Infoveave",
    default: "Document Management System - Infoveave",
  },
  description: "Document Management System - Demo",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <StoreProvider>
            <LanguageProvider>{children}</LanguageProvider>
          </StoreProvider>
        </Providers>
      </body>
    </html>
  );
}
