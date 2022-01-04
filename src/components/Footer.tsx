//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react';
import Dock from './Dock';
import VersionLabel from './VersionLabel';

const Footer : React.FC = () => (
    <Dock location="right" content={<a href="/termsOfUse">Terms of Use</a>}>
        <VersionLabel displayDate />
    </Dock>
);

export default Footer;
