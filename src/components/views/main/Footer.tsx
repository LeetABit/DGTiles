//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import Dock from '../../common/Dock';
import TermsOfUseLink from '../../specialized/TermsOfUseLink';
import VersionLabel from '../../specialized/VersionLabel';

export default () => (
    <footer>
        <Dock>
            <TermsOfUseLink dock-direction="right" />
            <VersionLabel displayDate />
        </Dock>
    </footer>
);
