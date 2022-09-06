//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import Dock from '../../common/Dock/Dock';
import LinksSection from '../../specialized/LinksSection';
import VersionLabel from '../../specialized/VersionLabel';

export default function Footer() {
    return (
        <footer>
            <Dock>
                <VersionLabel dock-direction="fill" displayDate />
                <LinksSection dock-direction="right" />
            </Dock>
        </footer>
    );
}
