//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { ReactElement, useMemo } from 'react';
import { CSSObject } from '@emotion/react';
import Dock from 'src/components/Dock';
import { cloneElementWithEmotion } from 'src/types';
import Footer from './Footer';
import Header from './Header';
import Toolbox from './Toolbox';
import Workspace from './Workspace';

interface Props {
    container?: ReactElement,
}

const style : CSSObject = {
    wordBreak: 'break-all',
    position: 'absolute',
    width: '100%',
    height: '100%',
};

export default function MainView({ container = <div /> }: Props) {
    const content = useMemo(() => cloneElementWithEmotion(container, style), [container]);
    return (
        <Dock container={content}>
            <Header dock-direction="top" />
            <Dock dock-direction="fill">
                <Toolbox dock-direction="left" />
                <Workspace />
            </Dock>
            <Footer dock-direction="bottom" />
        </Dock>
    );
}
