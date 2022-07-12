//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react';
import Dock from '../../common/Dock';
import TermsOfUseLink from '../../specialized/TermsOfUseLink';
import VersionLabel from '../../specialized/VersionLabel';

const Footer : React.FC = () => {
    return (
        <footer>
            <Dock>
                <TermsOfUseLink dock-right />
                <VersionLabel dock-fill displayDate />
            </Dock>
        </footer>
    );
};

export default Footer;
