import React, {
    createContext,
    ReactNode,
    useEffect,
    useMemo,
    useRef,
} from "react"
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
    connectOnStart?: boolean
    children: ReactNode
}) {
    const { initialBus, connectOnStart, children } = props
    const bus = useMemo(() => initialBus || createWebBus(), [])
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
    }, [])

    return (
        <JacdacContext.Provider value={{ bus }}>
            {children}
        </JacdacContext.Provider>
    )
}

export default JacdacContext
