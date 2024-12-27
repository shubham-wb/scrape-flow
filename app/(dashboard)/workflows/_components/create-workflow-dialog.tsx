"use client"

import React, { useCallback, useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Layers2Icon, Loader, Loader2 } from "lucide-react";
import CustomDialogHeader from "@/components/custom-dialog-header";
import { useForm } from "react-hook-form";
import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflow";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { CreateWorkflow } from "@/actions/workflows/create-workflow";
import { toast } from "sonner";
function CreateWorkflowDialog({ triggerText }: { triggerText?: string }) {
    const [open, setOpen] = useState(false);

    const form = useForm<createWorkflowSchemaType>({
        resolver: zodResolver(createWorkflowSchema),
        defaultValues: {}
    })


    const { mutate, isPending } = useMutation({
        mutationFn: CreateWorkflow,
        onSuccess: () => {
            toast.success(`Workflow created`, { id: "create-workflow" })
        },
        onError: () => {
            toast.error("Failed to create workflow", {
                id: "create-workflow",
            })
        },
    })

    const onSubmit = useCallback((values: createWorkflowSchemaType) => {
        toast.loading("Creating Workflow...", {
            id: "create-workflow",
        });
        mutate(values)
    }, [mutate])

    return <Dialog open={open}
        onOpenChange={(open) => {
            form.reset()
            setOpen(open)
        }}

    >
        <DialogTrigger asChild>
            <Button>
                {triggerText ?? "Create Workflow"}
            </Button>
        </DialogTrigger>
        <DialogContent className="px-0">
            <CustomDialogHeader
                Icon={Layers2Icon}
                title="Create Workflow"
                subtitle="Start Creating Workflow"
            />
            <div className="p-6">
                <Form {...form}>
                    <form action="" className="space-y-8 w-full"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel
                                            className="flex gap-1 items-center "
                                        >
                                            Name
                                            <p className="text-xs text-primary">

                                                (required)
                                            </p>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>

                                            Choose a descriptive and unique name                                     </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel
                                            className="flex gap-1 items-center "
                                        >
                                            Description
                                            <p className="text-xs text-primary">

                                                (optional)
                                            </p>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className="resize-none"
                                                {...field} />
                                        </FormControl>
                                        <FormDescription>

                                            Provide a brief description of what your workflow does, <br /> This is optional but can help you remember the workflow&pos;s purpose      </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <Button type="submit" className="w-full"
                            disabled={isPending}
                        >
                            {isPending ?
                                <Loader2 className="animate-spin" />
                                : "Proceed"}
                        </Button>
                    </form>
                </Form>
            </div>
        </DialogContent>
    </Dialog>
}
export default CreateWorkflowDialog