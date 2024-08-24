'use client'
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";
import {NextUIProvider} from '@nextui-org/react'
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { useDispatch } from "react-redux";
import { getUserCart } from '@/store/cart-slice'
import CartUpdateToast from "@/components/cart/cartUpdateToast";
export function Providers({children}){
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserCart())
  },[])

  // CartUpdateToast()

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