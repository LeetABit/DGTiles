//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react';

export const DialogSetterContext = React.createContext<(dialog: HTMLDivElement) => void>((_) => {});
