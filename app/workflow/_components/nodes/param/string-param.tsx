"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ParamProps } from "@/types/task"
import { ChangeEvent, useEffect, useId, useState } from "react"



function StringParam({ param, value, updateNodeParamValue }: ParamProps) {
    const id = useId()
    const [internalValue, setInternalValue] = useState(value)

    useEffect(() => {
        setInternalValue(value)
    }, [value])

    return <div className="space-y-1 p-1 w-full">
        <Label htmlFor={id}
            className="text-xs flex"
        >
            {param.name}
            {param.required && <p className="text-red-400 px-2">*</p>}
        </Label>
        <Input
            id={id}
            value={internalValue}
            placeholder="Enter value here"
            className="text-xs"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInternalValue(e.target.value)}
            onBlur={(e) => updateNodeParamValue(e.target.value)}
        />
        {
            param.helperText && (
                <p className="text-muted-foreground px-2">
                    {param.helperText}
                </p>
            )
        }
    </div>
}

export default StringParam