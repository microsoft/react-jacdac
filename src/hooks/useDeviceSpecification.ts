import { DependencyList } from "react"
import { useChange } from "./useChange"
import useDeviceCatalog from "./useDeviceCatalog"
import { useDeviceProductIdentifier } from "./useDeviceProductIdentifier"
import { RegisterOptions } from "./useRegisterValue"
import { JDDevice } from "jacdac-ts"

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
    const deviceCatalog = useDeviceCatalog()
    const specification = useChange(
        deviceCatalog,
        _ => _.specificationFromProductIdentifier(id),
        [id]
    )
    return specification
}
