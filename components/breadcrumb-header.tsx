"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { MobileSidebar } from './sidebar'
type Props = {}

function BreadcrumbHeader({ }: Props) {
    const pathname = usePathname()
    const paths = pathname === "/" ? [""] : pathname.split("/")
    return (
        <div className="flex items-center flex-start">
            <MobileSidebar />
            <Breadcrumb>
                <BreadcrumbList>
                    {
                        paths.map((path, index) => {
                            return <React.Fragment key={index}>
                                <BreadcrumbItem>
                                    <BreadcrumbLink
                                        className='capitalize'
                                        href={`/${path}`}
                                    >
                                        {path === "" ? "home" : path}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </React.Fragment>
                        })
                    }
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}

export default BreadcrumbHeader