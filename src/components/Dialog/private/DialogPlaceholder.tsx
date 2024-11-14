//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React, { ReactElement, useMemo } from 'react';
import { cloneElementWithEmotion } from 'src/types';
import { DialogSetterContext } from './DialogSetterContext';

interface Props {
    container?: ReactElement,
}

export default function DialogPlaceholder({ container = <div /> }: Props) {
    const setter = React.useContext(DialogSetterContext);
    return useMemo(() => cloneElementWithEmotion(container, undefined, { ref: setter }), [container]);
}
