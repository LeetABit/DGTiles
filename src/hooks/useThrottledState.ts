//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { Dispatch, SetStateAction, useMemo, useRef, useState } from 'react';

export default <S>(initialState: S | (() => S), timeout: number | ((value: S) => number)): [S, Dispatch<SetStateAction<S>>] => {
    const [value, setValue] = useState(initialState);
    const timeoutForCurrentState = useMemo(() => ((typeof timeout === 'function') ? timeout(value) : timeout), [value]);
    const timeoutId = useRef<NodeJS.Timeout>();

    const setValueThrottled: Dispatch<SetStateAction<S>> = (action: SetStateAction<S>) => {
        clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(() => {
            setValue(action);
        }, timeoutForCurrentState);
    }

    return [value, setValueThrottled];
};
