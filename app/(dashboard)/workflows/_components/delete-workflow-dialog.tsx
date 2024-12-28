"use client"

import { DeleteWorkflow } from '@/actions/workflows/delete-workflow'
import {

    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { Delete } from 'lucide-react'
import React, { ChangeEvent, SetStateAction, useState } from 'react'
import { toast } from 'sonner'

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
    workflowName: string
    workflowId: string
}

function DeleteWorkflowDialog({
    open, setOpen, workflowName, workflowId
}: Props) {
    const [confirmText, setConfirmText] = useState("")

    const deleteMutation = useMutation({
        mutationFn: DeleteWorkflow,
        onSuccess: () => {
            toast.success("Workflow deleted successfully", { id: workflowId })
            setConfirmText("")
        },
        onError: () => {
            toast.error("Something went wrong", {
                id: workflowId
            })
        },
    })
    return <AlertDialog
        open={open}
        onOpenChange={setOpen}
    >
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    If you delete this workflow, you will not be able to recover it.
                </AlertDialogDescription>
                <div className='flex flex-col gap-2'>
                    <p>
                        If you are sure, enter <b>
                            {workflowName}
                        </b> to confirm :
                    </p>
                    <Input value={confirmText}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setConfirmText(e.target.value)
                        }}
                    />

                </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel
                    onClick={() => {
                        setConfirmText("")
                    }}
                >
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                    onClick={() => {
                        toast.loading("Deleting workflow...", {
                            id: workflowId
                        });
                        deleteMutation.mutate(workflowId)
                    }}


                    disabled={confirmText !== workflowName || deleteMutation.isPending}
                    className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                >
                    Delete
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog >
}


export default DeleteWorkflowDialog