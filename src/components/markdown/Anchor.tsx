//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { ComponentPropsWithoutRef, ReactMarkdownProps } from 'react-markdown/lib/ast-to-react';

export default ({ node, children, href, ...rest }: ComponentPropsWithoutRef<'a'> & ReactMarkdownProps) => {
    return (
        <a target="_blank" rel="noreferrer noopener" href={href} {...rest}>
            {children}
        </a>
    );
};
