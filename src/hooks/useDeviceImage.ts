import { DOCS_ROOT, identifierToUrlPath } from "jacdac-ts"

export function useDeviceImage(
    specification: jdspec.DeviceSpec | undefined,
    size?: "avatar" | "lazy" | "catalog" | "preview" | "full" | "list"
) {
    const sz = size || "full"
    return (
        specification &&
        `${DOCS_ROOT}images/devices/${identifierToUrlPath(
            specification.id
        )}.${sz}.jpg`
    )
}
