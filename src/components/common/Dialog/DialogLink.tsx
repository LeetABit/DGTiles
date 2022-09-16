//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import { DialogMode } from './Dialog';
import DialogItem from './DialogItem';
import RoutedDialog from './RoutedDialog';

interface Props {
    mode?: DialogMode,
    content: React.ReactNode,
    titleBarContent?: React.ReactNode,
    to: string,
}

export default function DialogLink({ mode, content, to, titleBarContent, children }: React.PropsWithChildren<Props>) {
    const element = (
        <DialogItem>
            <RoutedDialog mode={mode} titleBarContent={titleBarContent}>
                {content}
            </RoutedDialog>
        </DialogItem>
    );

    return (
        <>
            <Link to={to} state>{children}</Link>
            <Routes>
                <Route index element={<Outlet />} />
                <Route path={to} element={element} />
            </Routes>
        </>
    );
}
