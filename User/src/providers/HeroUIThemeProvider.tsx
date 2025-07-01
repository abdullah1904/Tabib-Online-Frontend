"use client";
import {HeroUIProvider} from "@heroui/react";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
}

const HeroUIThemeProvider = ({children}: Props) => {
  return (
    <HeroUIProvider>
        {children}
    </HeroUIProvider>
  )
}

export default HeroUIThemeProvider