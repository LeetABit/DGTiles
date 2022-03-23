//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainViewport from './components/viewports/main/MainViewport';

declare interface AppProps {
    basename?: string,
}

const defaultProps : AppProps = {
    basename: undefined,
};

const App : React.FC<AppProps> = ({ basename } : AppProps) => {
    return (
        <BrowserRouter basename={basename}>
            <MainViewport />
        </BrowserRouter>
    );
}

App.defaultProps = defaultProps;

export default App;
