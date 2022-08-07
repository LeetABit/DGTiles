//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React, { useEffect } from 'react';
import { ModalDialogSetterContext } from './ModalDialogProvider';

export default ({ children }: React.PropsWithChildren) => {
    const modalDialogSetter = React.useContext(ModalDialogSetterContext);

    useEffect(() => {
        modalDialogSetter(children);
        return () => modalDialogSetter(null);
    })

    return null;
};
