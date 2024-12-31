import "server-only";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export async function ExecuteWorkflow(executionId: string) {
  const execution = await prisma.workflowExecution.findUnique({
    where: { id: executionId },
    include: { workflow: true, phases: true },
  });
  if (!execution) {
    throw new Error("execution not found");
  }

  // TODO: setup an execution environment
  // TODO: initialize workflow execution
  // TODO : initializer phases status
  let executionFailed = false;
  for (const phase of execution.phases) {
    // TODO: execute phases
  }
  //TODO : finalize execution
  //TODO : clean up environment

  revalidatePath("/workflows/runs");
}
