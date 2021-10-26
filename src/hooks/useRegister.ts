import { JDService } from "jacdac-ts"
import { useMemo } from "react"

export function useRegister(service: JDService, identifier: number) {
    return useMemo(() => service?.register(identifier), [service, identifier])
}
