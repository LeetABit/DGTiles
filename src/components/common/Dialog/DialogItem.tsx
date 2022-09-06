//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react';
import ReactDOM from 'react-dom';
import { DialogGetterContext } from './DialogProvider';

export default function DialogItem({ children }: React.PropsWithChildren) {
    const modalDialog = React.useContext(DialogGetterContext);
    return modalDialog ? ReactDOM.createPortal(children, modalDialog) : null;
}
