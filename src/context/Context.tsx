import React, { createContext, ReactNode, useEffect, useRef } from "react"
import { JDBus } from "jacdac-ts"

export interface JacdacContextProps {
    bus: JDBus
}

/**
 * A React context hosting the Jacdac bus.
 */
const JacdacContext = createContext<JacdacContextProps>({
    bus: undefined,
})
JacdacContext.displayName = "Jacdac"

/**
 * Mounts a Jacdac context with the provided bus.
 */
export function JacdacProvider(props: {
    bus: JDBus
    connectOnStart?: boolean
    children: ReactNode
}) {
    const { bus, connectOnStart, children } = props
    const firstConnect = useRef(false)

    useEffect(() => {
        if (
            !firstConnect.current &&
            connectOnStart &&
            typeof document !== "undefined" &&
            document.visibilityState === "visible"
        ) {
            firstConnect.current = true
            bus.connect(true)
        }
    }, [bus])

    return (
        <JacdacContext.Provider value={{ bus }}>
            {children}
        </JacdacContext.Provider>
    )
}

export default JacdacContext
