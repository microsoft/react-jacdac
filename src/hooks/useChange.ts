import { useState, useEffect, useMemo } from "react"
import { IEventSource, CHANGE, assert } from "jacdac-ts"

/**
 * A hook that tracks the CHANGE event in a Jacdac component and reruns, caches the query.
 * The query is not part of the dependency checking.
 * @param node JDOM element
 * @param query query run whenever a change is signaled by the component
 * @param deps optional list of hooks dependencies
 * @returns
 */
export function useChange<TNode extends IEventSource, TValue>(
    node: TNode,
    query?: (n: TNode) => TValue,
    deps?: React.DependencyList
): TValue {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    assert((node as any) !== false)
    const [version, setVersion] = useState(node?.changeId || 0)
    const value = useMemo(
        () => (query ? query(node) : undefined),
        [node, version, ...(deps || [])]
    )

    useEffect(() => {
        setVersion(node?.changeId || 0)
        return node?.subscribe(CHANGE, () => {
            setVersion(node.changeId)
        })
    }, [node, ...(deps || [])])

    return value
}

export default useChange
