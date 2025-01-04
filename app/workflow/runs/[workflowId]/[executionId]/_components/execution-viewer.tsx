"use client"
import { GetWorkflowExecutionWithPhases } from '@/actions/workflows/get-workflow-execution-with-phases'
import { GetWorkflowPhaseDetails } from '@/actions/workflows/get-workflow-phase-details'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { DatesToDurationString } from '@/lib/helper/dates'
import { GetPhasesTotalCost } from '@/lib/helper/phases'
import { WorkflowExecutionStatus } from '@/types/workflow'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { CalendarIcon, CircleDashedIcon, ClockIcon, CoinsIcon, Key, Loader2Icon, LucideIcon, WorkflowIcon } from 'lucide-react'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

import React, { ReactNode, useState } from 'react'
import { Input } from '@/components/ui/input'

type Props = {
    initialData: ExecutionData
}

type ExecutionData = Awaited<ReturnType<typeof GetWorkflowExecutionWithPhases>>;


function ExecutionViewer({ initialData }: Props) {

    const [selectedPhase, setSelectedPhase] = useState<string | null>(null)


    const query = useQuery({
        queryKey: ["execution", initialData?.id],
        initialData,
        queryFn: () => GetWorkflowExecutionWithPhases(initialData!.id),
        refetchInterval: (q) => q.state?.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
    })

    const duration = DatesToDurationString({
        end: query.data?.completedAt, start:
            query.data?.startedAt
    })

    const creditsConsumed = GetPhasesTotalCost(query.data?.phases || [])

    const isRunning = query?.data?.status === WorkflowExecutionStatus.RUNNING


    const phaseDetails = useQuery({
        queryKey: ["phaseDetails", selectedPhase],
        enabled: selectedPhase !== null,
        queryFn: () => GetWorkflowPhaseDetails(selectedPhase!)
    })

    return (
        <div className="flex w-full h-full">
            <aside className="w-[440px] min-w-[440px] border-r-2 border-separate flex flex-grow flex-col overflow-hidden">
                <div className="py-4 px-2">

                    <ExecutionLabel
                        Icon={CircleDashedIcon}
                        label={"Status"}
                        value={query.data?.status}
                    />

                    <ExecutionLabel
                        Icon={CalendarIcon}
                        label={"Started at"}
                        value={<span className='lowercase'>{query.data?.startedAt ? formatDistanceToNow(new Date(query.data?.startedAt), {
                            addSuffix: true
                        }) : '-'}</span>}
                    />
                    <ExecutionLabel
                        Icon={ClockIcon}
                        label={"Duration"}
                        value={
                            duration ? duration : <Loader2Icon className='animate-spin' size={20} />
                        }
                    />
                    <ExecutionLabel
                        Icon={CoinsIcon}
                        label={"Credits consumed"}
                        value={creditsConsumed}
                    />

                </div>
                <Separator />
                <div className='flex justify-center items-center py-2 px-4'>
                    <div className='text-muted-foreground flex items-center gap-2'>
                        <WorkflowIcon size={20} className='stroke-muted-foreground/80' />
                        <span className="font-semibold">
                            Phases
                        </span>
                    </div>

                </div>
                <Separator />
                <div className='overflow-auto flex gap-1 h-full px-2 py-4 flex-col'>
                    {query.data?.phases.map((phase, index) => {
                        return <Button
                            key={phase.id}
                            variant={selectedPhase === phase.id ? "secondary" : "ghost"}
                            className='w-full justify-between'
                            onClick={
                                () => {
                                    if (isRunning) return
                                    setSelectedPhase(phase.id)
                                }
                            }
                        ><div className='flex items-center gap-2'>

                                <Badge variant={"outline"}>
                                    {index + 1}
                                </Badge>
                                <p className="font-semibold">
                                    {phase.name}
                                </p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {phase.status}
                            </p>
                        </Button>
                    })}
                </div>
            </aside>
            <div className='flex h-full w-full'>
                {isRunning && <div className='flex items-center flex-col gap-2 justify-center h-full w-full'>
                    <p className="font-bold">
                        Run is in Progress, Please wait
                    </p>
                </div>}
                {
                    !isRunning && !selectedPhase && <div className='flex items-center flex-col gap-2 justify-center h-full w-full'>
                        <div className="flex flex-col gap-1 text-center">
                            <p className="font-bold">
                                No phase selected
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Select a phase to view details
                            </p>

                        </div>
                    </div>
                }
                {
                    !isRunning && selectedPhase &&
                    phaseDetails.data &&
                    <div className="flex flex-col py-4 container gap-4 overflow-y-auto">
                        <div className='flex gap-2 items-center'>
                            <Badge variant={"outline"} className='space-x-4'>
                                <div className='flex gap-1 items-center'>
                                    <CoinsIcon size={18} className='stroke-muted-foreground' />
                                    <span>
                                        Credits
                                    </span>
                                </div>
                                <span>
                                    Todo
                                </span>
                            </Badge>
                            <Badge variant={"outline"} className='space-x-4'>
                                <div className='flex gap-1 items-center'>
                                    <ClockIcon size={18} className='stroke-muted-foreground' />
                                    <span>
                                        Duration
                                    </span>
                                </div>
                                <span>
                                    {DatesToDurationString({
                                        start: phaseDetails.data.startedAt,
                                        end: phaseDetails.data.completedAt
                                    }) || '---'}
                                </span>
                            </Badge>
                        </div>
                        <ParameterViewer title='Inputs'
                            subtitle="Inputs used for this phase"
                            paramsJSON={phaseDetails.data.inputs} />
                    </div>
                }
            </div>
        </div>
    )



}

export default ExecutionViewer

function ExecutionLabel({ Icon, label, value }: {
    Icon: LucideIcon,
    label: ReactNode,
    value: ReactNode
}) {
    return <div className="flex justify-between items-center py-2 px-4 text-sm">
        <div className="text-muted-foreground flex items-center gap-2">
            <Icon
                size={20}
                className="stroke-muted-foreground/80" />
            <span>
                {label}
            </span>
        </div>
        <div className="font-semibold capitalize flex gap-2 items-center">
            {value}
        </div>
    </div>
}


function ParameterViewer({
    title, subtitle, paramsJSON
}: {
    title: string,
    subtitle: string,
    paramsJSON: string | null
}) {

    const params = paramsJSON ? JSON.parse(paramsJSON) : undefined

    return <Card>
        <CardHeader
            className='rounded-lg rounded-b-none border-b py-y bg-gray-50 dark:bg-background'
        >
            <CardTitle className='text-base'>
                {title}
            </CardTitle>
            <CardDescription className='text-muted-foreground text-sm'>
                {subtitle}
            </CardDescription>
        </CardHeader>
        <CardContent className='py-4'>
            <div className="flex flex-col gap-2">
                {
                    !params || Object.keys(params).length === 0 && (
                        <p className="text-sm">
                            No parameters generated by this phase
                        </p>
                    )
                }
                {
                    params && Object.entries(params).map(([key, value]) => (
                        <div key={key} className='flex justify-between items-center'>
                            <p className="text-sm text-muted-foreground flex-1 basis-1/3">
                                {key}
                            </p>
                            <Input readOnly className='flex-1 basis-2/3' value={value as string} />
                        </div>
                    ))
                }
            </div>
        </CardContent>
    </Card>
}