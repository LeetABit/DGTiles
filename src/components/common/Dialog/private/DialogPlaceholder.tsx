//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react';
import { DialogSetterContext } from './DialogSetterContext';

export default function DialogPlaceholder() {
    const setter = React.useContext(DialogSetterContext);
    return (
        <div css ref={setter} />
    );
}
