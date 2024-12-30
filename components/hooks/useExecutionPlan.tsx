import { FlowToExecutionPlan, FlowToExecutionPlanValidationError } from "@/lib/workflow/execution-plan"
import { AppNode } from "@/types/app-node"
import { useReactFlow } from "@xyflow/react"
import { useCallback } from "react"
import useFlowValidation from "./useFlowValidation"
import { toast } from "sonner"

const useExecutionPlan = () => {
    const { toObject } = useReactFlow()
    const { setInvalidInputs, clearErrors } = useFlowValidation()


    const handleError = useCallback((error: any) => {
        switch (error.type) {
            case FlowToExecutionPlanValidationError.NO_ENTRY_POINT:
                { toast.error("No entry point found") }
            case FlowToExecutionPlanValidationError.INVALID_INPUTS: {
                toast.error("Not all input values are set")
                setInvalidInputs(error.invalidElements)
            }
            default:
                toast.error("Something went wrong")
        }
    }, [setInvalidInputs])


    const generateExecutionPlan = useCallback(() => {
        const { nodes, edges } = toObject()
        const { executionPlan, error } =
            FlowToExecutionPlan(nodes as AppNode[], edges);

        if (error) {
            handleError(error)
            return null
        }

        clearErrors()
        return executionPlan

    }, [toObject, handleError])



    return generateExecutionPlan
}

export default useExecutionPlan