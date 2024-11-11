//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import Dock from 'src/components/Dock/Dock';
import LinksSection from 'src/components/LinksSection';
import VersionLabel from 'src/components/VersionLabel';

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
