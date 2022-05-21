import {
    serviceSpecificationFromName,
    serviceProviderDefinitionFromServiceClass,
    addServiceProvider,
} from "jacdac-ts"
import { useEffect } from "react"
import bus from "./bus"

export function useServiceProvider(options?: {
    serviceClass?: number
    serviceName?: string
}) {
    const { serviceClass, serviceName } = options || {}
    useEffect(() => {
        serviceSpecificationFromName
        const def = serviceProviderDefinitionFromServiceClass(
            serviceClass ||
                serviceSpecificationFromName(serviceName)?.classIdentifier
        )
        const provider = def && addServiceProvider(bus, def)
        return () => provider && bus.removeServiceProvider(provider)
    }, [serviceClass, serviceName])
}
