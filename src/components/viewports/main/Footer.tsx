//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import Dock from '../../common/Dock';
import RoutedPopup from '../../common/RoutedPopup';
import TermsOfUse from '../../documents/TermsOfUse';
import VersionLabel from './VersionLabel';

const Footer : React.FC = () => {
    const link = <Link to="/termsOfUse" state>Terms of Use</Link>
    const popup = <RoutedPopup><TermsOfUse /></RoutedPopup>

    return (
        <>
            <footer>
                <Dock location="right" content={link}>
                    <VersionLabel displayDate />
                </Dock>
            </footer>
            <Routes>
                <Route index element={<Outlet />} />
                <Route path="/termsOfUse" element={popup} />
            </Routes>
        </>
    );
};

export default Footer;
