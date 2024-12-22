import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { InboxIcon } from "lucide-react";
import { GetWorkflowsForUser } from "@/actions/workflows/getWorkflowsForUser";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react";
function Page() {
    return <div className="flex-1 flex flex-col h-full">
        <div className="flex justify-between">
            <div className="flex flex-col">
                <h1 className="text-3xl font-bold">
                    Workflows
                </h1>
                <p className="text-muted-foreground">
                    Manage your workflows.
                </p>
            </div>
        </div>
        <div className="h-full py-6">
            <Suspense fallback={<UserWorkflowsSkeleton />}>
                <UserWorkflows />
            </Suspense>

        </div>
    </div>
}

function UserWorkflowsSkeleton() {
    return <div className="space-y-2">
        {[...new Array(4)].map((_, i) => {
            return <Skeleton key={i} className="h-32 w-full" />
        })}
    </div>
}

async function UserWorkflows() {
    try {
        const workflows = await GetWorkflowsForUser();


        if (workflows.length < 1) {
            return <div className="flex flex-col gap-4 h-full items-center justify-center">
                <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
                    <InboxIcon size={40} className="stroke-primary" />                </div>
                <div className="flex flex-col gap-2 text-center">
                    <p className="font-bold">
                        No workflow created yet
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Click the button below to create your first workflow
                    </p>
                </div>
            </div>
        }
        return <div> </div>

    } catch (error) {
        <Alert variant={"destructive"}
        >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>
                Error
            </AlertTitle>
            <AlertDescription>
                Something went wrong. Please try again later.
            </AlertDescription>
        </Alert>

    }


}


export default Page