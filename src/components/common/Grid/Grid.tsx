//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React, { useMemo } from 'react';
import GridTemplates from './GridTemplates';

interface Props {
    templates: GridTemplates,
}

export default function Grid({ templates: { rows, columns }, children }: React.PropsWithChildren<Props>) {
    const style = useMemo((): CSSObject => ({
        label: 'Grid',
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateRows: rows,
        gridTemplateColumns: columns,
    }), [rows, columns]);

    return (
        <div css={style}>
            {children}
        </div>
    );
}
