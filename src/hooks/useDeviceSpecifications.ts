import { DeviceSpecificationOptions } from "jacdac-ts"
import { useChange } from "./useChange"
import useDeviceCatalog from "./useDeviceCatalog"

/**
 * Gets the list of known Jacdac modules from a central repository
 * @param options
 * @returns
 */
export function useDeviceSpecifications(
    options?: DeviceSpecificationOptions
): jdspec.DeviceSpec[] {
    const catalog = useDeviceCatalog()
    const specifications = useChange(
        catalog,
        _ => _.specifications(options),
        [JSON.stringify(options)],
        (a, b) => arrayEq(a, b, (l, r) => l.id === r.id)
    )
    return specifications
}
