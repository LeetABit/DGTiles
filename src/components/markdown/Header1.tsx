//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { HeadingProps } from 'react-markdown/lib/ast-to-react';

const Header1 : React.FC<HeadingProps> = ({ node: _, children, ...rest } : HeadingProps) => (
    <h1 id="h1" {...rest}>
        {children}
    </h1>
);

export default Header1;
