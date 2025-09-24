//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import type { ReactElement } from "react";
import { useMemo } from "react";
import type { CSSObject } from "@emotion/react";
import { Dock } from "#/src/components/Dock/index.js";
import { cloneElementWithEmotion } from "#/src/lib/cloneElementWithEmotion.js";
import Header from "#/src/layout/Header";
import Workspace from "#/src/layout/Workspace";

interface Props {
    container?: ReactElement;
}

const style: CSSObject = {
    wordBreak: "break-all",
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
};

/**
 * @param root0
 * @param root0.container
 */
export default function MainView({ container = <div /> }: Props) {
    const content = useMemo(
        () => cloneElementWithEmotion(container, style),
        [container],
    );
    return (
        <Dock>
            <div dock-direction='bottom' style={{ backgroundColor: 'green', minWidth: '100px', minHeight: '100px' }}/>
            <Dock dock-direction='fill'>
                <div dock-direction='right' style={{ backgroundColor: 'pink', minWidth: '100px', minHeight: '100px' }}/>
                <div dock-direction='fill' style={{ backgroundColor: 'yellow', minWidth: '100px', minHeight: '100px' }}>

                </div>
                <div dock-direction='left' style={{ backgroundColor: 'magenta', minWidth: '100px', minHeight: '100px' }}/>
            </Dock>
            <div dock-direction='top' style={{ backgroundColor: 'blue', minWidth: '100px', minHeight: '100px' }}/>
        </Dock>
        // <Dock container={content}>
        //     <Header dock-direction="bottom" />
        //     <Workspace dock-direction="fill" dock-accept-style />
        // </Dock>
    );
}
