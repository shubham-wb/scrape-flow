"use client"
import { Workflow } from '@prisma/client'
import React from 'react'
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react'


import "@xyflow/react/dist/style.css"
import { CreateFlowNode } from '@/lib/workflow/create-flow-node'
import { TaskType } from '@/types/task'
import NodeComponent from './nodes/node-component'

const nodeTypes = {
    FlowScrapeNode: NodeComponent
}

const snapGrid: [number, number] = [50, 50]
const fitViewOptions = {

    padding: 1
}

function FlowEditor({ workflow }: {
    workflow: Workflow
}) {
    const [nodes, setNodes, onNodesChange] = useNodesState([CreateFlowNode(TaskType.LAUNCH_BROWSER)])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    return <main className='h-full w-full'>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            snapToGrid
            snapGrid={snapGrid}
            fitView
        >
            <Controls position='top-left'
                fitViewOptions={fitViewOptions}
            />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
    </main>
}

export default FlowEditor