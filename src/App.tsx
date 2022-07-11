//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainView from './components/views/main/MainView';

declare interface AppProps {
    basename?: string,
}

const defaultProps : AppProps = {
    basename: undefined,
};

const App : React.FC<AppProps> = ({ basename } : AppProps) => {
    return (
        <BrowserRouter basename={basename}>
            <MainView />
        </BrowserRouter>
    );
}

App.defaultProps = defaultProps;

export default App;
