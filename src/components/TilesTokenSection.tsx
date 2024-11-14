//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import { useId, ReactElement, useMemo } from 'react';
import { cloneElementWithEmotion } from 'src/types';
import TilesTokenInput from './TilesTokenInput';

interface Props {
    container?: ReactElement,
}

const divStyle: CSSObject = {
    display: 'inline-block',
    float: 'right',
    width: '50%',
    padding: '0em 1em',
}

const labelStyle: CSSObject = {
    display: 'block',
}

export default function TilesTokenSection({ container = <div /> }: Props) {
    const id = useId();

    return useMemo(() => cloneElementWithEmotion(
        container,
        divStyle,
        undefined,
        /* eslint-disable jsx-a11y/label-has-associated-control */
        /* id passed to custom component */
        <label css={labelStyle} htmlFor={id}>
            <span>Workspace Token:</span>
            <TilesTokenInput id={id} rows={3} aria-multiline />
        </label>,
    ), [container, id]);
}
