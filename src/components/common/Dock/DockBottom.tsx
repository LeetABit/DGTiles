//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { PropsWithChildren } from 'react';
import DockItem, { DockProps } from './DockItem';

export default ({ children, ...rest }: PropsWithChildren<DockProps>) => (
    <DockItem direction="Bottom" {...rest}>{children}</DockItem>
);
