import { JDBus } from "jacdac-ts"
import { useContext } from "react"
import JacdacContext, { JacdacContextProps } from "../context/Context"

/**
 * Grabs the Jacdac singleton bus from the current Jacdac context.
 * Throws an error if bus is missing.
 */
export function useBus(): JDBus {
    const { bus } = useContext<JacdacContextProps>(JacdacContext)
    if (!bus) throw Error("Jacdac bus missing in context")
    return bus
}
