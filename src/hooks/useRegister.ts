import { JDService } from "jacdac-ts"
import { DependencyList, useMemo } from "react"

/**
 * A hook that resolves the register of a service, given the register code.
 * @param service service to query
 * @param identifier register code
 * @returns register JDOM node, if supported in the specification
 */
export function useRegister(
    service: JDService | undefined,
    identifier: number,
    deps?: DependencyList
) {
    return useMemo(
        () => service?.register(identifier),
        [service, identifier, ...(deps || [])]
    )
}
