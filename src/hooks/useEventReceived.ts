import { EVENT, JDEvent } from "jacdac-ts"
import { DependencyList, useEffect } from "react"

/**
 * Registers a handler to run whenever the event is received from the bus
 * @param event event to listen
 * @param handler handler, not part of depenency list
 */
export function useEventReceived(
    event: JDEvent | undefined,
    handler: (event: JDEvent) => void,
    deps?: DependencyList
) {
    useEffect(() => event?.subscribe(EVENT, handler), [event, ...(deps || [])])
}
