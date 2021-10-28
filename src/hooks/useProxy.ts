import { ControlCmd, DEVICE_ANNOUNCE, Packet, SRV_CONTROL } from "jacdac-ts"
import { useEffect } from "react"
import { useBus } from "./useBus"

/**
 * A hook to force brains into proxy mode.
 * @param force
 */
export function useProxy(force: boolean) {
    const bus = useBus()
    useEffect(() => {
        if (!force) return

        const forceProxy = () => {
            const pkt = Packet.onlyHeader(ControlCmd.Proxy)
            pkt.sendAsMultiCommandAsync(bus, SRV_CONTROL)
        }
        const unsub = bus.subscribe(DEVICE_ANNOUNCE, forceProxy)
        forceProxy()
        return unsub
    }, [force])
}
