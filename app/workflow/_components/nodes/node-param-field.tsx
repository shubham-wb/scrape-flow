import { Input } from '@/components/ui/input'
import { TaskParam, TaskParamType } from '@/types/task'
import React, { useCallback } from 'react'
import StringParam from './param/string-param'
import { useReactFlow } from '@xyflow/react'
import { AppNode } from '@/types/app-node'

type Props = {
    param: TaskParam
    nodeId: string
}

function NodeParamField({ param, nodeId }: Props) {

    const { updateNodeData, getNode } = useReactFlow()

    const node = getNode(nodeId) as AppNode
    const value = node?.data?.inputs?.[param.name]


    const updateNodeParamValue = useCallback((newValue: string) => {
        updateNodeData(nodeId, {
            inputs: {
                ...node.data.inputs,
                [param.name]: newValue
            }
        })
    }, [nodeId, updateNodeData, param.name, node?.data.inputs])

    switch (param.type) {
        case TaskParamType.STRING:
            return <StringParam param={param}
                value={value}
                updateNodeParamValue={updateNodeParamValue}
            />
        default:
            return <div className='w-full'>
                <p className='text-xs text-muted-foreground '>
                    Not Implemented
                </p>
            </div>
    }
}

export default NodeParamField