"use client"
import React from 'react'
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getSmoothStepPath } from "@xyflow/react"
import { Button } from '@/components/ui/button'
export default function DeletableEdge(props: EdgeProps) {
    const [edgePath, labelX, labelY] = getSmoothStepPath(props)
    return <>
        <BaseEdge
            path={edgePath}
            markerEnd={props.markerEnd}
            className='relative'
            style={props.style}
        />
        <EdgeLabelRenderer>
            <div style={{
                position: "absolute",
                transform: `translate(-50%, -50%") translate(${labelX}px,${labelY}px)`
            }}>
                <Button variant={"outline"}
                    size={"icon"}
                    className='w-5 h-5 border cursor-pointer rounded-full text-xs leading-none hover:shadow-lg'>
                    X
                </Button>
            </div>
        </EdgeLabelRenderer>
    </>
}