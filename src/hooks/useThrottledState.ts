//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react';

export default <S>(initialState: S | (() => S), timeout: number | ((value: S) => number)): [S, React.Dispatch<React.SetStateAction<S>>] => {
    const [value, setValue] = React.useState(initialState);
    const timeoutForCurrentState = React.useMemo(() => ((typeof timeout === 'function') ? timeout(value) : timeout), [value]);
    const timeoutId = React.useRef<NodeJS.Timeout>();

    const setValueThrottled: React.Dispatch<React.SetStateAction<S>> = (action: React.SetStateAction<S>) => {
        clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(() => {
            setValue(action);
        }, timeoutForCurrentState);
    }

    return [value, setValueThrottled];
};
