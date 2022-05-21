import { arrayEq, CHANGE, JDService, RoleManager, unique } from "jacdac-ts"
import { DependencyList, useEffect, useMemo } from "react"
import { useBus } from "./useBus"
import { useChange } from "./useChange"

/**
 * A hook that allow to create a service role mapping
 * @param bindings
 * @param options make sure to memoize onUpdate
 * @returns
 */
export function useRoles<
    TRoles extends Record<
        string,
        {
            serviceClass: number
            preferredDeviceId?: string
            preferredServiceIndex?: number
        }
    >
>(
    bindings: TRoles,
    options?: {
        onUpdate?: (newBindings: TRoles) => void
        /**
         * Calls update even if not all role around bound
         */
        incomplete?: boolean
    },
    deps?: DependencyList
) {
    const bus = useBus()
    const { incomplete, onUpdate } = options || {}
    const roleManager = useMemo(() => {
        const r = new RoleManager(bus)
        r.updateRoles(
            Object.keys(bindings).map(role => ({
                role,
                serviceClass: bindings[role].serviceClass,
                preferredDeviceId: bindings[role].preferredDeviceId,
                preferredServiceIndex: bindings[role].preferredServiceIndex,
            }))
        )
        return r
    }, [bus, bindings, ...(deps || [])])

    // callback to serialize bindings
    useEffect(
        () =>
            onUpdate
                ? roleManager?.subscribe(CHANGE, () => {
                      const r: any = {}
                      const roles = roleManager.saveRoles()
                      for (const key in bindings) {
                          const role = roles.find(r => r.role === key)
                          if (role)
                              r[key] = {
                                  serviceClass: role.serviceClass,
                                  preferredDeviceId: role.preferredDeviceId,
                                  preferredServiceIndex:
                                      role.preferredServiceIndex,
                              }
                      }
                      onUpdate(r as TRoles)
                  })
                : undefined,
        [roleManager, bindings, onUpdate, ...(deps || [])]
    )

    const { roles, updates } = useChange(
        roleManager,
        _ => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const r: Record<keyof TRoles, JDService> = {} as any
            const u: Record<keyof TRoles, (service: JDService) => void> =
                {} as any
            if (_) {
                for (const key in bindings) {
                    const srv = _.service(key)
                    if (srv && (incomplete || _.isBound)) r[key] = srv
                    u[key] = (service: JDService) =>
                        _.updateRole(
                            key,
                            service?.serviceClass,
                            service?.device.deviceId,
                            service?.serviceIndex
                        )
                }
            }
            return { roles: r, updates: u }
        },
        [incomplete, ...(deps || [])],
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
