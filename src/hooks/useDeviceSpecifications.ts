import { deviceCatalog, DeviceSpecificationOptions } from "jacdac-ts"
import { useChange } from "./useChange"

/**
 * Gets the list of known Jacdac modules from a central repository
 * @param options
 * @returns
 */
export function useDeviceSpecifications(
    options?: DeviceSpecificationOptions
): jdspec.DeviceSpec[] {
    const specifications = useChange(
        deviceCatalog,
        _ => _.specifications(options),
        [JSON.stringify(options)]
    )
    return specifications
}
