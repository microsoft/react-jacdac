import { deviceSpecificationFromProductIdentifier, JDDevice } from "jacdac-ts"
import { DependencyList } from "react"
import { useDeviceProductIdentifier } from "./useDeviceProductIdentifier"
import { RegisterOptions } from "./useRegisterValue"

/**
 * A hook that resolves the product specification if any.
 * @param device
 * @returns product specification or undefined if missing or unknown
 */
export function useDeviceSpecification(
    device: JDDevice | undefined,
    options?: RegisterOptions,
    deps?: DependencyList
) {
    const id = useDeviceProductIdentifier(device, options, deps)
    const specification = deviceSpecificationFromProductIdentifier(id)
    return specification
}
