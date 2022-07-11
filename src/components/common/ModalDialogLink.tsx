//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React, { PropsWithChildren, ReactNode } from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import RoutedModalDialog from './RoutedModalDialog';

declare interface ModalDialogLinkProps {
    content: ReactNode,
    to: string,
}

const ModalDialogLink : React.FC<PropsWithChildren<ModalDialogLinkProps>> = ({ content, to, children } : PropsWithChildren<ModalDialogLinkProps>) => {
    const dialog = <RoutedModalDialog>{content}</RoutedModalDialog>;

    return (
        <>
            <Link to={to} state>{children}</Link>
            <Routes>
                <Route index element={<Outlet />} />
                <Route path={to} element={dialog} />
            </Routes>
        </>
    );
};

export default ModalDialogLink;
