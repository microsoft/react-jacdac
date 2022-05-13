import React, { createContext, ReactNode, useMemo } from "react"
import { createWebBus, JDBus } from "jacdac-ts"

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
 * The bus should be instantiated outside of the React tree
 * to work well with hot-reload solution (avoiding the bus to constantly reset)
 */
export function JacdacProvider(props: {
    initialBus?: JDBus
    children: ReactNode
}) {
    const { initialBus, children } = props
    const bus = useMemo(() => initialBus || createWebBus(), [])

    return (
        <JacdacContext.Provider value={{ bus }}>
            {children}
        </JacdacContext.Provider>
    )
}

export default JacdacContext
