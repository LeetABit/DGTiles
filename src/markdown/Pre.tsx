//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import { ComponentPropsWithoutRef, ReactMarkdownProps } from 'react-markdown/lib/ast-to-react';

const style: CSSObject = {
    whiteSpace: 'pre-wrap',
    marginLeft: '2em',
}

export default function Pre({ node, children, ...rest }: ComponentPropsWithoutRef<'pre'> & ReactMarkdownProps) {
    return (
        <pre css={style} {...rest}>
            {children}
        </pre>
    );
}
