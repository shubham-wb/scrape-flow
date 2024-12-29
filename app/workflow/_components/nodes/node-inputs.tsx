import { cn } from '@/lib/utils'
import { TaskParam } from '@/types/task'
import { Handle, Position } from '@xyflow/react'
import React from 'react'
import NodeParamField from './node-param-field'
import { ColorForHandle } from './common'

type Props = {
    children: React.ReactNode
}

export function NodeInputs({ children }: Props) {
    return (
        <div
            className='flex flex-col divide-y gap-2'
        >
            {children}
        </div>
    )
}



export function NodeInput({ input, nodeId }: {
    input: TaskParam
    nodeId: string
}) {
    return <div className='flex justify-start p-3 bg-secondary w-full'>
        <NodeParamField param={input} nodeId={nodeId} />
        {!input.hideHandle &&

            <Handle id={input.name} type="target" position={Position.Left}
                className={cn("!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4",
                    ColorForHandle[input.type]

                )}
            />}

    </div>
}