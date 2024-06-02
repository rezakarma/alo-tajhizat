'use client'
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";
import {NextUIProvider} from '@nextui-org/react'
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
export function Providers({children}){
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
    // const session =await auth()

  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
    </NextUIProvider>

  )
}