import { deviceSpecificationFromProductIdentifier, JDDevice } from "jacdac-ts"
import { DependencyList } from "react"
import { useDeviceProductIdentifier } from "./useDeviceProductIdentifier"

/**
 * A hook that resolves the product specification if any.
 * @param device
 * @returns product specification or undefined if missing or unknown
 */
export function useDeviceSpecification(
    device: JDDevice | undefined,
    deps?: DependencyList
) {
    const id = useDeviceProductIdentifier(device, deps)
    const specification = deviceSpecificationFromProductIdentifier(id)
    return specification
}
