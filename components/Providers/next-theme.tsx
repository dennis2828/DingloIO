"use client"

import { ThemeProvider } from "next-themes"

export const ThemeProviderComponent = ({children}:{children: React.ReactNode}) =>{
    return (
        <ThemeProvider enableSystem={true} defaultTheme="light" attribute="class">
            {children}
        </ThemeProvider>
    )
}