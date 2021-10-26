import { DeviceFilter, ServiceFilter } from "jacdac-ts"
import { DependencyList } from "react"
import { useBus } from "./useBus"
import { useChange } from "./useChange"

/**
 * A hook that returns an updated list of services on the bus.
 * @param options service filters
 * @param deps optional list of dependencies (excluding filter options)
 * @returns list of services matching the filter
 */
export function useServices(
    options?: ServiceFilter & DeviceFilter,
    deps?: DependencyList
) {
    const bus = useBus()
    const services = useChange(bus, _ => _?.services(options) || [], [
        JSON.stringify(options),
        ...(deps || []),
    ])
    return services
}
