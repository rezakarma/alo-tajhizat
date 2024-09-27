"use client";
import localFont from "@next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Providers } from "./providers";
import ThemeSwitcher from "../components/utils/themeSwitcher";
import { useEffect, useState } from "react";
import ReduxProvider from "@/store/provider";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const vazirFont = localFont({
  src: "../../public/fonts/Vazirmatn[wght].woff2",
});

export default function RootLayout({ children }) {
  const [mounted, setMounted] = useState(false);
  const queryClient = new QueryClient();
  useEffect(() => setMounted(true), []);

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <html className={vazirFont.className} lang="en">
          <body>
              <ReduxProvider>
                <Providers>
                  <ProgressBar
                    height="4px"
                    color="#00AFC1"
                    options={{ showSpinner: false }}
                    shallowRouting
                  />
                  {mounted && <ThemeSwitcher />}
                  {/* <ThemeSwitcher /> */}
                  {children}
                </Providers>
                <Toaster richColors />
              </ReduxProvider>
          
          </body>
        </html>
      </QueryClientProvider>
    </SessionProvider>
  );
}
