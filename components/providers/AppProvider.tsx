"use client"

import { ThemeProvider } from "next-themes"
import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export function AppProvider({ children }: {
    children: React.ReactNode
}) {
    const queryClient =
        new QueryClient()
    return (
        <QueryClientProvider
            client={queryClient}
        >
            <ThemeProvider attribute="class"
                defaultTheme="system"
                enableSystem>
                {
                    children
                }
            </ThemeProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}