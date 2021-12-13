import { IEventSource } from "jacdac-ts"
import { useMemo, DependencyList } from "react"
import { Subscription, useSubscription } from "use-subscription"

export function useEventRaised<TEventSource extends IEventSource, TValue>(
    eventName: string | string[],
    node: TEventSource,
    query?: (n: TEventSource) => TValue,
    deps?: DependencyList
): TValue {
    const subscription = useMemo(
        () =>
            <Subscription<TValue>>{
                getCurrentValue: query
                    ? () => query(node)
                    : () => <TValue>undefined,
                subscribe: callback => {
                    const unsubscribe = node?.subscribe(eventName, callback)
                    return () => unsubscribe?.()
                },
            },
        [node, ...(deps || [])]
    )
    return useSubscription(subscription)
}
