import { deviceSpecificationFromProductIdentifier, JDDevice } from "jacdac-ts"
import { useDeviceProductIdentifier } from "./useDeviceProductIdentifier"

/**
 * A hook that resolves the product specification if any.
 * @param device
 * @returns product specification or undefined if missing or unknown
 */
export function useDeviceSpecification(device: JDDevice) {
    const id = useDeviceProductIdentifier(device)
    const specification = deviceSpecificationFromProductIdentifier(id)
    return specification
}
