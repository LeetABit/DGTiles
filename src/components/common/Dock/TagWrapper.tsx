//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React, { PropsWithChildren } from 'react';

const TagWrapper : React.FC<PropsWithChildren<unknown>> = ({ children } : PropsWithChildren<unknown>) => (
    <>{children}</>
);

export default TagWrapper;
