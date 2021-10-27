import { CHANGE, JDService, RoleManager } from "jacdac-ts"
import { useEffect, useMemo } from "react"
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
        onUpdate?: (roles: TRoles) => void
        /**
         * Calls update even if not all role around bound
         */
        incomplete?: boolean
    }
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
    }, [bus, bindings])

    // callback to serialize bindings
    useEffect(
        () =>
            !!onUpdate &&
            roleManager?.subscribe(CHANGE, (_: RoleManager) => {
                const r: any = {}
                if (_) {
                    const roles = _.saveRoles()
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
                }
                onUpdate(r as TRoles)
            }),
        [roleManager, onUpdate]
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
        []
    )

    return { roleManager, roles, updates }
}
