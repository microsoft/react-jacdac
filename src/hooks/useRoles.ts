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
    deps: DependencyList = []
) {
    const roleManager = useRoleManager()
    const bindingsKey = JSON.stringify(bindings)

    useEffect(() => {
        roleManager.updateRoles(
            Object.entries(bindings).map(([role, binding]) => ({
                role,
                serviceClass: binding.serviceClass,
                preferredDeviceId: binding.preferredDeviceId,
                preferredServiceIndex: binding.preferredServiceIndex,
            }))
        )
    }, [roleManager, bindingsKey, ...deps])

    const { roles, updates } = useChange(
        roleManager,
        _ => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const r: Record<keyof TRoles, JDService> = {} as any
            const u: Record<keyof TRoles, (service: JDService) => void> =
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                {} as any
            Object.entries(bindings).map(([key, binding]) => {
                const srv = _.service(key)
                const serviceClass = binding.serviceClass
                r[key as keyof TRoles] = srv
                u[key as keyof TRoles] = (service: JDService) => {
                    if (service && service.serviceClass !== serviceClass)
                        throw new Error(`invalid service class for role ${key}`)
                    _.updateRole(
                        key,
                        service?.serviceClass,
                        service?.device.deviceId,
                        service?.serviceIndex
                    )
                }
            })
            return { roles: r, updates: u, changeId: _.changeId }
        },
        [bindingsKey, ...deps],
        (a, b) => a.changeId == b.changeId
    )

    return { roleManager, roles, updates }
}
