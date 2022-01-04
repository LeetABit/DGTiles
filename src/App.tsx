//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Viewport from './components/Viewport';
import Dock from './components/Dock';
import TermsOfUse from './components/TermsOfUse';
import Footer from './components/Footer';

declare interface AppProps {
    basename?: string,
}

const defaultProps : AppProps = {
    basename: undefined,
};

const App : React.FC<AppProps> = ({ basename } : AppProps) => (
    <BrowserRouter basename={basename}>
        <Viewport>
            <Dock location="top" content={<h1>DGTiles</h1>}>
                <Dock location="bottom" content={<Footer />}>
                    <Routes>
                        <Route path="/termsOfUse" element={<TermsOfUse />} />
                    </Routes>
                </Dock>
            </Dock>
        </Viewport>
    </BrowserRouter>
);

App.defaultProps = defaultProps;

export default App;
