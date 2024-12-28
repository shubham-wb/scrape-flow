import { AppNode } from "@/types/app-node";
import { TaskType } from "@/types/task";

export function CreateFlowNode(
  nodeType: TaskType,
  position?: {
    x: number;
    y: number;
  }
): AppNode {
  return {
    id: crypto.randomUUID(),
    data: {
      type: nodeType,
      inputs: {},
    },
    dragHandle: ".drag-handle",
    type: "FlowScrapeNode",
    position: position ?? {
      x: 0,
      y: 0,
    },
  };
}
