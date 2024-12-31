import TopBar from "@/app/workflow/_components/topbar/top-bar";
import { auth } from "@clerk/nextjs/server";
import { Loader2Icon } from "lucide-react";
import React, { Suspense } from "react";
import ExecutionViewer from "./_components/execution-viewer";
import { GetWorkflowExecutionWithPhases } from "@/actions/workflows/get-workflow-execution-with-phases";

function ExecutionViewerPage({ params }: {
    params: {
        executionId: string;
        workflowId: string
    }
}) {
    return (
        <div className="flex flex-col h-screen w-full overflow-hidden">
            <TopBar workflowId={params.workflowId}
                title="Workflow run details"
                subtitle={`Run ID:${params.executionId}`}
                hideButtons={true} />
            <section className="flex h-full overflow-auto">
                <Suspense fallback={
                    <div className="flex w-full items-center justify-center">
                        <Loader2Icon className="h-10 w-10 animate-spin stroke-primary" />
                    </div>
                }>
                    <ExecutionViewerWrapper executionId={params.executionId} />
                </Suspense>

            </section>
        </div>
    )
}


export default ExecutionViewerPage

async function ExecutionViewerWrapper({
    executionId,
}: {
    executionId: string
}) {

    const workflowExecution = await GetWorkflowExecutionWithPhases(executionId);

    if (!workflowExecution) {
        return <div>
            Not found
        </div>
    }
    return <ExecutionViewer
        initialData={workflowExecution}
    />
}
