import React from 'react'
import { Separator } from "@/components/ui/separator"
import DesktopSidebar from '@/components/sidebar'
import BreadcrumbHeader from '@/components/breadcrumb-header'
import { ModeToggle } from '@/components/theme-mode-toggle'
import { AppProvider } from '@/components/providers/AppProvider'
import { SignedIn, UserButton } from '@clerk/nextjs'

function layout({ children }: {
    children: React.ReactNode

}) {
    return (
        <AppProvider>

            <div className='flex h-screen'>
                <DesktopSidebar />
                <div className="flex flex-col flex-1 min-h-screen">
                    <header
                        className='flex items-center justify-between px-6 py-4 h-[50px] container'
                    >
                        <BreadcrumbHeader />
                        <div className="gap-1 flex items-center">
                            <ModeToggle />
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </header>

                    <Separator />
                    <div className="overflow-auto">
                        <div className="flex-1 container py-4 text-accent-foreground">
                            {children}
                        </div>
                    </div>
                </div>

            </div>
        </AppProvider>

    )
}

export default layout