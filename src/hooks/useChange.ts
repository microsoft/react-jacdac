import { DependencyList } from "react"
import { IEventSource, CHANGE } from "jacdac-ts"
import { useEventRaised } from "./useEventRaised"

/**
 * A hook that tracks the CHANGE event in a Jacdac component and reruns, caches the query.
 * The query is not part of the dependency checking.
 * @param node JDOM element
 * @param query query run whenever a change is signaled by the component
 * @param deps optional list of hooks dependencies
 * @returns
 */
export function useChange<TEventSource extends IEventSource, TValue>(
    node: TEventSource | undefined,
    query?: (n: TEventSource) => TValue,
    deps?: DependencyList,
    isEqual?: (a: TValue, b: TValue) => boolean
): TValue {
    return useEventRaised<TEventSource, TValue>(
        CHANGE,
        node,
        query,
        deps,
        isEqual
    )
}
