import { ellipse, JDRegister, PackedValues, REPORT_UPDATE } from "jacdac-ts"
import { DependencyList } from "react"
import { useEventRaised } from "./useEventRaised"

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
    deps: DependencyList = []
): string {
    const { disabled, maxLength, trackError } = options || {}

    return useEventRaised(
        REPORT_UPDATE,
        register,
        _ =>
            readRegisterValue(
                _,
                __ => ellipse(__?.humanValue, maxLength),
                "?",
                trackError
            ),
        [disabled, maxLength, ...deps]
    )
}

/**
 * A hook that reads and update the unpacked value of a register
 * @param register register to listen for changes
 * @param options
 * @returns unpacked value of the register. Empty array if missing.
 */
export function useRegisterValue<T extends PackedValues>(
    register: JDRegister,
    options?: RegisterOptions,
    deps: DependencyList = []
): T {
    const { disabled, trackError } = options || {}

    return useEventRaised(
        REPORT_UPDATE,
        register,
        _ =>
            readRegisterValue<T>(
                _,
                __ => (__?.unpackedValue || []) as T,
                [] as T,
                trackError
            ),
        [disabled, ...deps]
    )
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
    deps: DependencyList = []
): boolean {
    const { disabled } = options || {}

    return useEventRaised(REPORT_UPDATE, register, _ => _?.boolValue, [
        disabled,
        ...deps,
    ])
}
