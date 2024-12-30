import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./node-card"
import NodeHeader from "./node-header";
import { AppNodeData } from "@/types/app-node";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { NodeInputs, NodeInput } from "./node-inputs";
import { NodeOutputs, NodeOutput } from "./node-outputs";
const NodeComponent = memo((props: NodeProps) => {
    const nodeData = props.data as AppNodeData

    const task = TaskRegistry[nodeData.type]

    return <NodeCard
        nodeId={props.id}
        isSelected={!!props.selected}
    >
        <NodeHeader taskType={nodeData.type}
            nodeId={props.id} />
        <NodeInputs>
            {
                task.inputs.map((input) => (<NodeInput input={input} key={input?.name} nodeId={props.id} />))
            }
        </NodeInputs>
        <NodeOutputs>
            {
                task.outputs.map((output) => (<NodeOutput output={output} key={output?.name} nodeId={props.id} />))
            }
        </NodeOutputs>
    </NodeCard>
})


export default NodeComponent
NodeComponent.displayName = 'NodeComponent'