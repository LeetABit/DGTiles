//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React, { useCallback } from 'react';

export const ModalDialogSetterContext = React.createContext<(dialog: React.ReactNode) => void>((_) => {});
export const ModalDialogGetterContext = React.createContext<React.ReactNode>(null);

export default ({ children }: React.PropsWithChildren) => {
    const [dialog, setDialog] = React.useState<React.ReactNode>(null);
    const setModalDialog = useCallback((newDialog: React.ReactNode) => {
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
