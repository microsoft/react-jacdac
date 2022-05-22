import { serviceSpecificationFromClassIdentifier } from "jacdac-ts"
import React, { useState } from "react"
import { useServiceProvider } from "./useServiceProvider"

export default function SimulatorButton(props: {
    serviceClass: number
    initialState?: boolean
}) {
    const { serviceClass, initialState } = props
    const spec = serviceSpecificationFromClassIdentifier(serviceClass)
    const [on, setOn] = useState(!!initialState)

    useServiceProvider({ serviceClass: on ? serviceClass : undefined })

    return (
        <button
            style={{ marginRight: "0.5rem" }}
            onClick={() => setOn(o => !o)}
        >
            {on ? `stop ${spec.name}` : `start ${spec.name}`}
        </button>
    )
}
