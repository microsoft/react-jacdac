import { JDService } from "jacdac-ts"
import { useMemo } from "react"

/**
 * Gets the event JDOM node from the service
 * @param service service JDOM node
 * @param identifier event identifier
 * @returns event JDOM node if any
 */
export function useEvent(service: JDService, identifier: number) {
    return useMemo(() => service?.event(identifier), [service, identifier])
}
