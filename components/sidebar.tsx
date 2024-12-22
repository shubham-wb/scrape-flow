'use client'
import Link from 'next/link'
import { CoinsIcon, HomeIcon, Layers2Icon, MenuIcon, ShieldCheckIcon } from 'lucide-react'
import React, { useState } from 'react'
import Logo from '@/components/logo'
import { Button, buttonVariants } from './ui/button'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
type Props = {}
const routes = [
    {
        href: "",
        label: "Home",
        icon: HomeIcon
    },
    {
        href: "workflows",
        label: "Workflows",
        icon: Layers2Icon
    }, {
        href: "credentials",
        label: "Credentials",
        icon: ShieldCheckIcon
    },
    {
        href: "billing",
        label: "Billing",
        icon: CoinsIcon
    }
]
function DesktopSidebar({ }: Props) {
    const pathname = usePathname()
    const activeRoute = routes.find(((route) => {
        return route.href.length > 0 && pathname.includes(route.href)
    })) || routes[0]
    return (
        <div className="hidden relative md:block min-w-[280px] max-w-[280px]  h-screen overflow-hidden w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate">
            <div className="flex items-center justify-center border-b-[1px] gap-2 border-separate p-4">
                <Logo />
            </div>
            <div className="p-2 ">TODO Credits</div>
            <div className="flex flex-col gap-2 p-2">
                {
                    routes.map((route) => {
                        return <Link key={route.href}
                            href={route.href}
                            className={buttonVariants({
                                variant: activeRoute.href === route.href ? "sidebarActiveItem" :
                                    "sidebarItem"
                            })}

                        >
                            <route.icon size={20} />
                            {route.label}
                        </Link>
                    })
                }
            </div>
        </div>
    )
}

export default DesktopSidebar


export function MobileSidebar() {
    const pathname = usePathname()
    const activeRoute = routes.find(((route) => {
        return route.href.length > 0 && pathname.includes(route.href)
    })) || routes[0]
    const [isOpen, setOpen] = useState(false)
    return <div className='block border-separate bg-background md:hidden'>
        <nav className="container flex items-center justify-between px-8">
            <Sheet open={isOpen} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                    >
                        <MenuIcon />
                    </Button>
                </SheetTrigger>
                <SheetContent className='w-[400px] sm:w-[540px] space-y-4'
                    side="left"
                >
                    <Logo />
                    <div className="flex flex-col gap-2">
                        {
                            routes.map((route) => {
                                return <Link key={route.href}
                                    href={route.href}
                                    className={buttonVariants({
                                        variant: activeRoute.href === route.href ? "sidebarActiveItem" :
                                            "sidebarItem"
                                    })}
                                    onClick={() => {
                                        setOpen((prev) => !prev)
                                    }}
                                >
                                    <route.icon size={20} />
                                    {route.label}
                                </Link>
                            })
                        }
                    </div>
                </SheetContent>
            </Sheet>
        </nav>
    </div>
}