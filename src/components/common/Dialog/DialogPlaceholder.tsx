//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React from 'react';
import { DialogSetterContext } from './DialogProvider';

export default () => {
    const setter = React.useContext(DialogSetterContext);
    const style: CSSObject = {
        label: 'ModalDialogPlaceholder',
    }

    return (
        <div css={style} ref={setter} />
    );
};
