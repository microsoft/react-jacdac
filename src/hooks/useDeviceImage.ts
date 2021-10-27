import { DOCS_ROOT, identifierToUrlPath } from "jacdac-ts"
import { DependencyList, useMemo } from "react"

export function useDeviceImage(
    specification: jdspec.DeviceSpec | undefined,
    size?: "avatar" | "lazy" | "catalog" | "preview" | "full" | "list",
    deps?: DependencyList
) {
    const sz = size || "full"
    return useMemo(
        () =>
            specification &&
            `${DOCS_ROOT}images/devices/${identifierToUrlPath(
                specification.id
            )}.${sz}.jpg`,
        [specification, size, ...(deps || [])]
    )
}
