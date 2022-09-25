//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React, { useCallback } from 'react';
import { DialogGetterContext } from './private/DialogGetterContext';
import DialogPlaceholder from './private/DialogPlaceholder';
import { DialogSetterContext } from './private/DialogSetterContext';

export default function DialogProvider({ children }: React.PropsWithChildren) {
    const [dialog, setDialog] = React.useState<HTMLDivElement | null>(null);
    const setDialogCallback = useCallback((newDialog: HTMLDivElement) => {
        setDialog(newDialog);
    }, []);

    return (
        <DialogSetterContext.Provider value={setDialogCallback}>
            <DialogGetterContext.Provider value={dialog}>
                {children}
                <DialogPlaceholder />
            </DialogGetterContext.Provider>
        </DialogSetterContext.Provider>
    );
}
