//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React, { AriaAttributes } from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import { DialogMode } from './types';
import DialogItem from './private/DialogItem';
import RoutedDialog from './RoutedDialog';

interface Props extends AriaAttributes{
    to: string,
    dialogMode?: DialogMode,
    dialogContent: React.ReactNode,
    titleBar?: React.ReactNode,
}

export default function DialogLink({ to, dialogMode, dialogContent, titleBar, children, ...ariaAttributes }: React.PropsWithChildren<Props>) {
    const element = (
        <DialogItem>
            <RoutedDialog mode={dialogMode} titleBar={titleBar} {...ariaAttributes}>
                {dialogContent}
            </RoutedDialog>
        </DialogItem>
    );

    return (
        <>
            <Link to={to} state>{children}</Link>
            <Routes>
                <Route path={to} element={element} />
                <Route path="*" element={<Outlet />} />
            </Routes>
        </>
    );
}
