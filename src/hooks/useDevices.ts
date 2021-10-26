import { DeviceFilter } from "jacdac-ts"
import { DependencyList } from "react"
import { useBus } from "./useBus"
import { useChange } from "./useChange"

/**
 * A hook that returns an updated list of devices on the bus.
 * @param options device filters
 * @param deps optional list of dependencies (excluding filter options)
 * @returns
 */
export function useDevices(options?: DeviceFilter, deps?: DependencyList) {
    const bus = useBus()
    const devices = useChange(bus, _ => _.devices(options), [
        JSON.stringify(options),
        ...(deps || []),
    ])
    return devices
}
