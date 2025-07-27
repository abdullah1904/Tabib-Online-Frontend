"use client";
import {HeroUIProvider } from "@heroui/react";
import {ToastProvider} from "@heroui/toast"
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
}

const HeroUIThemeProvider = ({children}: Props) => {
  return (
    <HeroUIProvider>
        {children}
        <ToastProvider/>
    </HeroUIProvider>
  )
}

export default HeroUIThemeProvider