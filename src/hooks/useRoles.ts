import { JDService, RoleManager } from "jacdac-ts"
import { useContext, useMemo } from "react"
import { useBus } from "./useBus"
import { useChange } from "./useChange"

/**
 * A hook that allow to create a service role mapping
 * @param bindings
 * @param options
 * @returns
 */
export function useRoles<
    TRoles extends Record<
        string,
        { serviceClass: number; preferredDeviceId?: string }
    >
>(
    bindings: TRoles,
    options?: {
        /**
         * Calls update even if not all role around bound
         */
        incomplete?: boolean
    }
) {
    const bus = useBus()
    const { incomplete } = options || {}
    const roleManager = useMemo(() => {
        const r = new RoleManager(bus)
        r.updateRoles(
            Object.keys(bindings).map(role => ({
                role,
                serviceClass: bindings[role].serviceClass,
                preferredDeviceId: bindings[role].preferredDeviceId,
            }))
        )
        return r
    }, [bindings, incomplete])

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
                            service?.device.deviceId
                        )
                }
            }
            return { roles: r, updates: u }
        },
        []
    )

    return { roleManager, roles, updates }
}
