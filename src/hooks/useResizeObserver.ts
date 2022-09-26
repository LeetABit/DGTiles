//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React, { useCallback } from 'react';

export default function useResizeObserver<T extends Element>(elementRef: React.RefObject<T>, callback: (entry: ResizeObserverEntry, element: T | null) => void) {
    const observerCallback = useCallback((entries: ResizeObserverEntry[]) => {
        callback(entries[0], elementRef.current);
    }, [elementRef, callback]);

    const observer = React.useRef(
        new ResizeObserver(observerCallback),
    );

    React.useEffect(() => {
        if (elementRef.current) {
            observer.current.observe(elementRef.current);
        }

        return () => {
            observer.current.disconnect();
        };
    }, [elementRef, callback]);
}
