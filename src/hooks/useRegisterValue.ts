import { ellipse, JDRegister, PackedValues, REPORT_UPDATE } from "jacdac-ts"
import { DependencyList, useEffect, useState } from "react"

export interface RegisterOptions {
    /**
     * Allows to disable update, for example when the UI element is offscreen.
     */
    disabled?: boolean
    /**
     * Error tracking for internal exception while querying registers
     */
    trackError?: (error: Error, register: JDRegister) => void
}

function readRegisterValue<T>(
    register: JDRegister,
    reader: (reg: JDRegister) => T,
    defaultValue: T,
    trackError?: (error: Error, register: JDRegister) => void
): T {
    try {
        const value = reader(register)
        return value
    } catch (e) {
        trackError?.(e, register)
        return defaultValue
    }
}

export interface HumanRegisterOptions extends RegisterOptions {
    maxLength?: number
}

/**
 * A hook that reads and update the human friendly value of a register
 * @param register register to listen for changes
 * @param options
 * @returns human friendly value of the register. "???" if missing.
 */
export function useRegisterHumanValue(
    register: JDRegister,
    options?: HumanRegisterOptions,
    deps?: DependencyList
): string {
    const { disabled, maxLength, trackError } = options || {}
    const [value, setValue] = useState<string>(
        ellipse(register?.humanValue, maxLength)
    )

    // update value
    useEffect(() => {
        const readValue = () =>
            readRegisterValue(
                register,
                _ => ellipse(_?.humanValue, maxLength),
                "???",
                trackError
            )
        setValue(readValue)
        return (
            !disabled &&
            register?.subscribe(REPORT_UPDATE, () => setValue(readValue))
        )
    }, [register, disabled, maxLength, ...(deps || [])])
    return value
}

/**
 * A hook that reads and update the unpacked value of a register
 * @param register register to listen for changes
 * @param options
 * @returns unpacked value of the register. Empty array if missing.
 */
export function useRegisterUnpackedValue<T extends PackedValues>(
    register: JDRegister,
    options?: RegisterOptions,
    deps?: DependencyList
): T {
    const { disabled, trackError } = options || {}
    const [value, setValue] = useState<T>(register?.unpackedValue as T)

    useEffect(() => {
        const readValue = () =>
            readRegisterValue<T>(
                register,
                _ => _?.unpackedValue as T,
                undefined,
                trackError
            )
        setValue(readValue)
        return (
            !disabled &&
            register?.subscribe(REPORT_UPDATE, () => {
                setValue(readValue)
            })
        )
    }, [register, disabled, ...(deps || [])])
    return value || ([] as T)
}

/**
 * A hook that reads and update the value of a boolean register
 * @param register register to listen for changes
 * @param options
 * @returns value of the register. undefined if missing
 */
export function useRegisterBoolValue(
    register: JDRegister | undefined,
    options?: RegisterOptions,
    deps?: DependencyList
): boolean {
    const { disabled } = options || {}
    const [value, setValue] = useState<boolean>(register?.boolValue)
    // update value
    useEffect(() => {
        setValue(register?.boolValue)
        return (
            !disabled &&
            register?.subscribe(REPORT_UPDATE, () => {
                setValue(register?.boolValue)
            })
        )
    }, [register, disabled, ...(deps || [])])
    return value
}
