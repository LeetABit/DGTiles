//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import type { HeadingProps } from 'react-markdown/lib/ast-to-react';

export default ({ node: _, children, ...rest }: HeadingProps) => (
    <h1 id="h1" {...rest}>
        {children}
    </h1>
);