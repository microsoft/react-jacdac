import { arrayEq, JDService } from "jacdac-ts"
import { DependencyList, useEffect } from "react"
import { useChange } from "./useChange"
import { useRoleManager } from "./useRoleManager"

export interface RoleBinding {
    serviceClass: number
    preferredDeviceId?: string
    preferredServiceIndex?: number
}

/**
 * A hook that allow to create a service role mapping
 * @param bindings
 * @param options make sure to memoize onUpdate
 * @returns
 */
export function useRoles<TRoles extends Record<string, RoleBinding>>(
    bindings: TRoles,
    deps?: DependencyList
) {
    const roleManager = useRoleManager()

    // apply bindings
    useEffect(() => {
        roleManager.updateRoles(
            Object.keys(bindings).map(role => ({
                role,
                serviceClass: bindings[role].serviceClass,
                preferredDeviceId: bindings[role].preferredDeviceId,
                preferredServiceIndex: bindings[role].preferredServiceIndex,
            }))
        )
    }, [roleManager, ...(deps || [])])

    const { roles, updates } = useChange(
        roleManager,
        _ => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const r: Record<keyof TRoles, JDService> = {} as any
            const u: Record<keyof TRoles, (service: JDService) => void> =
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                {} as any
            for (const key in bindings) {
                const srv = _.service(key)
                r[key] = srv
                u[key] = (service: JDService) =>
                    _.updateRole(
                        key,
                        service?.serviceClass,
                        service?.device.deviceId,
                        service?.serviceIndex
                    )
            }
            return { roles: r, updates: u }
        },
        [...(deps || [])],
        (a, b) => {
            const akeys = Object.keys(a.roles)
            const bkeys = Object.keys(b.roles)
            return (
                arrayEq(akeys, bkeys) &&
                akeys.every(role => Object.is(a.roles[role], b.roles[role]))
            )
        }
    )

    return { roleManager, roles, updates }
}
