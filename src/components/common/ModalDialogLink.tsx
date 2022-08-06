//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import RoutedModalDialog from './RoutedModalDialog';

interface Props {
    content: React.ReactNode,
    to: string,
}

export default ({ content, to, children }: React.PropsWithChildren<Props>) => {
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
