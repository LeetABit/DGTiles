//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { useCallback } from 'react';
import { useAppDispatch } from '../../hooks/stateHooks';
import { addFunction } from '../../states/tiles';

interface Props {
    functionName: string,
    functionIndex: number,
}

export default function AddFunctionButton({ functionName, functionIndex }: Props) {
    const dispatch = useAppDispatch();
    const clickHandler = useCallback(() => {
        dispatch(addFunction(functionIndex));
    }, [functionIndex]);

    return (
        <button type="button" onClick={clickHandler}>
            {functionName}
        </button>
    );
}
