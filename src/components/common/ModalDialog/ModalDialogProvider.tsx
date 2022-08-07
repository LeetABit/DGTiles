//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React, { useCallback } from 'react';

export const ModalDialogSetterContext = React.createContext<(dialog: HTMLDivElement) => void>((_) => {});
export const ModalDialogGetterContext = React.createContext<HTMLDivElement | null>(null);

export default ({ children }: React.PropsWithChildren) => {
    const [dialog, setDialog] = React.useState<HTMLDivElement | null>(null);
    const setModalDialog = useCallback((newDialog: HTMLDivElement) => {
        setDialog(newDialog);
    }, [setDialog]);

    return (
        <ModalDialogSetterContext.Provider value={setModalDialog}>
            <ModalDialogGetterContext.Provider value={dialog}>
                {children}
            </ModalDialogGetterContext.Provider>
        </ModalDialogSetterContext.Provider>
    );
};
