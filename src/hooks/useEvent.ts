import { JDService } from "jacdac-ts"
import { DependencyList, useMemo } from "react"

/**
 * Gets the event JDOM node from the service
 * @param service service JDOM node
 * @param identifier event identifier
 * @returns event JDOM node if any
 */
export function useEvent(
    service: JDService | undefined,
    identifier: number,
    deps?: DependencyList
) {
    return useMemo(
        () => service?.event(identifier),
        [service, identifier, ...(deps || [])]
    )
}
