//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { useTheme } from '@emotion/react';
import { Fill } from '../../../styles/layout';
import { mergeStyles } from '../../../styles/mergeStyles';

export default () => {
    const theme = useTheme();

    const style = mergeStyles(Fill, { ...theme.workspace });

    return (
        <div css={style}>
            WIP
        </div>
    );
}
