import { Input } from '@/components/ui/input'
import { TaskParam, TaskParamType } from '@/types/task'
import React, { useCallback } from 'react'
import StringParam from './param/string-param'
import { useReactFlow } from '@xyflow/react'
import { AppNode } from '@/types/app-node'
import BrowserInstanceParam from './param/browser-instance-param'

type Props = {
    param: TaskParam
    nodeId: string
    disabled: boolean
}

function NodeParamField({ param, nodeId, disabled }: Props) {

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
                disabled={disabled}
                updateNodeParamValue={updateNodeParamValue}
            />
        case TaskParamType.BROWSER_INSTANCE:
            return <BrowserInstanceParam param={param}
                value={""}

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