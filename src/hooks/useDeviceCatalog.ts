import { useBus } from "./useBus"

/**
 * Retreives an updatable device catalog
 */
export default function useDeviceCatalog() {
    const bus = useBus()
    return bus.deviceCatalog
}
