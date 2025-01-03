import { Workflow } from '@prisma/client'
import React from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import FlowEditor from './flow-editor'
import TopBar from './topbar/top-bar'
import TaskMenu from './task-menu'
import { FlowValidationContext, FlowValidationContextProvider } from '@/components/context/flow-validation-context'
type Props = {
    workflow: Workflow
}

function Editor({ workflow }: Props) {
    return (
        <FlowValidationContextProvider>


            <ReactFlowProvider>
                <div className="flex flex-col h-full w-full overflow-hidden"><TopBar
                    title={"Workflow Editor"}
                    workflowId={workflow.id}
                />
                    <section className="flex h-full overflow-auto">
                        <TaskMenu />
                        <FlowEditor workflow={workflow} />
                    </section>
                </div>
            </ReactFlowProvider>
        </FlowValidationContextProvider>
    )
}

export default Editor