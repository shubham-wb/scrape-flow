import Logo from '@/components/logo'
import { AppProvider } from '@/components/providers/AppProvider'
import { ModeToggle } from '@/components/theme-mode-toggle'
import { Separator } from '@/components/ui/separator'
import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
    return (
        <AppProvider>
            <div className='flex flex-col w-full h-screen'>
                {children}
                <Separator />
                <footer className='flex items-center justify-between p-2'>
                    <Logo iconSize={16} fontSize='text-xl' />
                    <ModeToggle />
                </footer>
            </div>
        </AppProvider>
    )

}

export default layout