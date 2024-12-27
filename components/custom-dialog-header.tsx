"use client"

import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Separator } from "./ui/separator";

interface Props {
    title?: string;
    subtitle?: string;
    Icon?: LucideIcon;
    iconClassName?: string;
    titleClassName?: string;
    subtitleClassName?: string;
}
function CustomDialogHeader({ title, subtitle, Icon, titleClassName, iconClassName, subtitleClassName }: Props) {

    return <DialogHeader className="py-6">
        <DialogTitle asChild>
            <div className="flex flex-col items-center gap-2 mb-2">
                {
                    Icon && <Icon
                        className={cn("stroke-primary", iconClassName)} />
                }
                {title && <p
                    className={cn("text-xl text-primary", titleClassName)}
                >
                    {title}
                </p>}
                {subtitle && <p
                    className={cn("text-sm text-muted-foreground", subtitleClassName)}
                >
                    {subtitle}
                </p>}
            </div>
        </DialogTitle>
        <Separator />
    </DialogHeader>
}
export default CustomDialogHeader