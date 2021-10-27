import { ControlReg, JDDevice, JD_SERVICE_INDEX_CTRL } from "jacdac-ts"
import { DependencyList } from "react"
import { useRegister } from "./useRegister"
import { useRegisterUnpackedValue } from "./useRegisterValue"

/**
 * A hook that queries and updates the device product identifier.
 * @param device
 * @returns product indentifier or undefined if missing
 */
export function useDeviceProductIdentifier(
    device: JDDevice | undefined,
    deps?: DependencyList
) {
    const reg = useRegister(
        device?.service(JD_SERVICE_INDEX_CTRL),
        ControlReg.ProductIdentifier,
        deps
    )
    const [id] = useRegisterUnpackedValue<[number]>(reg, undefined, deps)
    return id
}
