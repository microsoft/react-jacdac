import { IEventSource, packedValuesIsEqual } from "jacdac-ts"
import { useMemo, DependencyList } from "react"
import { useSyncExternalStoreWithSelector } from "use-sync-external-store/with-selector.js"

/**
 * A hook to track event and update a state snapshot
 */
export function useEventRaised<TEventSource extends IEventSource, TValue>(
    eventName: string | string[],
    node: TEventSource,
    query: (n: TEventSource) => TValue,
    deps?: DependencyList,
    isEqual?: (a: TValue, b: TValue) => boolean
): TValue {
    const subscription = useMemo(
        () => ({
            getSnapshot: () => query?.(node),
            selector: (_: TValue) => _,
            subscribe: (onStoreChanged: () => void) => {
                const unsubscribe = node?.subscribe(eventName, onStoreChanged)
                return () => unsubscribe?.()
            },
            isEqual: isEqual || packedValuesIsEqual,
        }),
        [node, ...(deps || [])]
    )
    return useSyncExternalStoreWithSelector(
        subscription.subscribe,
        subscription.getSnapshot,
        undefined,
        subscription.selector,
        subscription.isEqual
    )
}
