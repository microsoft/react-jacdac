import { RoleManager } from "jacdac-ts"
import { useMemo } from "react"
import { useBus } from "./useBus"

export function useRoleManager() {
    const bus = useBus()
    const roleManager = useMemo(() => new RoleManager(bus), [bus])
    return roleManager
}
