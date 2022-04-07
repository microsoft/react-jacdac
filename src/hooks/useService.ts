import { ANNOUNCE, JDDevice } from "jacdac-ts"
import { useEffect, useState } from "react"

export default function useService(device: JDDevice, serviceIndex: number) {
    const [service, setService] = useState(device?.service(serviceIndex))

    useEffect(() => {
        const unsub = device?.subscribe(ANNOUNCE, () => {
            setService(device.service(serviceIndex))
        })
        setService(device?.service(serviceIndex))
        return unsub
    }, [device, serviceIndex])

    return service
}
