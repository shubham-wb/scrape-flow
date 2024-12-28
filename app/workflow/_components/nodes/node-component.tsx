import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./node-card"
import NodeHeader from "./node-header";
import { AppNodeData } from "@/types/app-node";
const NodeComponent = memo((props: NodeProps) => {
    const nodeData = props.data as AppNodeData
    return <NodeCard
        nodeId={props.id}
        isSelected={!!props.selected}
    >
        <NodeHeader taskType={nodeData.type} />
    </NodeCard>
})


export default NodeComponent
NodeComponent.displayName = 'NodeComponent'