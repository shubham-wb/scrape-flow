"use client"
import { RunWorkflow } from '@/actions/workflows/run-workflow'
import useExecutionPlan from '@/components/hooks/useExecutionPlan'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useReactFlow } from '@xyflow/react'
import { PlayIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

type Props = {
    workflowId: string
}

function ExecuteBtn({ workflowId }: Props) {
    const generate = useExecutionPlan()
    const { toObject } = useReactFlow()


    const mutation = useMutation({
        mutationFn: RunWorkflow,
        onSuccess: () => {
            toast.success("Execution started", { id: "flow-execution" })
        },
        onError: () => {
            toast.error("Something went wrong", { id: "flow-execution" })
        }
    })

    return (
        <Button
            variant={"outline"}
            className='flex items-center gap-2'
            onClick={() => {
                const plan = generate()
                if (!plan) {
                    // client side validation
                    return
                }
                mutation.mutate({
                    workflowId: workflowId,
                    flowDefinition: JSON.stringify(toObject())
                })
            }}
        >
            <PlayIcon size={16} className='stroke-orange-500' />
            Execute
        </Button>
    )
}

export default ExecuteBtn