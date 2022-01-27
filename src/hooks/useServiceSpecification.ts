import { useMemo } from "react"
import { serviceSpecificationFromClassIdentifier, JDService } from "jacdac-ts"

export function useServiceSpecificationFromServiceClass(serviceClass: number) {
    const specification = useMemo(
        () => serviceSpecificationFromClassIdentifier(serviceClass),
        [serviceClass]
    )
    return specification
}

export function useServiceSpecification(service: JDService) {
    const serviceClass = service?.serviceClass
    const specification = useServiceSpecificationFromServiceClass(serviceClass)
    return specification
}
