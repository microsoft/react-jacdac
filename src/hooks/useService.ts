import { ANNOUNCE, JDDevice } from "jacdac-ts"
import { useEventRaised } from "./useEventRaised"

export default function useService(device: JDDevice, serviceIndex: number) {
    return useEventRaised(ANNOUNCE, device, _ => _?.service(serviceIndex), [
        serviceIndex,
    ])
}
