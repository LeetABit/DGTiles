//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import raw from 'raw.macro';
import { Optional } from './Types';
import VersionLabel from './components/VersionLabel';

declare interface AppProps {
    basename: Optional<string>
}

const privacyPolicy = raw('../docs/PrivacyPolicy.md');

const App : React.FC<AppProps> = ({ basename } : AppProps) => (
    <BrowserRouter basename={basename}>
        <VersionLabel displayDate />
        <ReactMarkdown>
            {privacyPolicy}
        </ReactMarkdown>
    </BrowserRouter>
);

export default App;
