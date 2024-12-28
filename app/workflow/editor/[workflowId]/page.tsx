import { waitFor } from '@/lib/helper/waitFor'
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import React from 'react'
import Editor from '../../_components/editor'

type Props = {
    params: {
        workflowId: string
    }
}

async function page({ params }: Props) {
    const { workflowId } = params
    const { userId } = auth();

    if (!userId) {
        return <div>Unauthenticated</div>
    }



    const workflow = await prisma.workflow.findUnique({
        where: {
            id: workflowId,
            userId
        }
    })

    if (!workflow) {
        return <div>Workflow not found</div>
    }


    return (
        <Editor workflow={workflow} />
    )
}

export default page