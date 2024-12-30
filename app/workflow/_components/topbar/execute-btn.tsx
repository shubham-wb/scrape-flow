"use client"
import useExecutionPlan from '@/components/hooks/useExecutionPlan'
import { Button } from '@/components/ui/button'
import { PlayIcon } from 'lucide-react'
import React from 'react'

type Props = {
    workflowId: string
}

function ExecuteBtn({ workflowId }: Props) {
    const generate = useExecutionPlan()
    return (
        <Button
            variant={"outline"}
            className='flex items-center gap-2'
            onClick={() => {
                const plan = generate()
                console.log(plan)
            }}
        >
            <PlayIcon size={16} className='stroke-orange-500' />
            Execute
        </Button>
    )
}

export default ExecuteBtn