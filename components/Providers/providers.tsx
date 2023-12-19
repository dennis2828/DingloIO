"use client"

import { useEffect, useState } from "react"
import { ThemeProviderComponent } from "./next-theme"
import { Toaster } from "@/components/ui/toaster"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { dingloIO } from "@/lib/dingloIO";

export const Providers = ({children}:{children: React.ReactNode}) =>{
    const queryClient = new QueryClient();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[]);

    if(!isMounted)
        return null;

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ThemeProviderComponent>
                    {children}
                    <Toaster/>
                </ThemeProviderComponent>
            </QueryClientProvider>
        </>
    )
}