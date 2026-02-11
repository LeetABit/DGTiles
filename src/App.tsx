//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { type CSSObject, Global } from "@emotion/react";
import { BrowserRouter } from "react-router";
import React from "react";
import { theme } from "./styles/themes";

interface Props {
    basename: string;
}

const backgroundColor = theme.background.color;
const majorGridColor = theme.background.grid.majorColor;
const minorGridColor = theme.background.grid.minorColor;

const globalStyle: CSSObject = {
    body: {
        background: backgroundColor,
        backgroundImage:
            `linear-gradient(` +
            `${minorGridColor} 0.07rem, transparent 0),` +
            `linear-gradient(` +
            `90deg, ${minorGridColor} 0.07rem, transparent 0),` +
            `linear-gradient(` +
            `${majorGridColor} 0.05rem, transparent 0),` +
            `linear-gradient(` +
            `90deg, ${majorGridColor} 0.05rem, transparent 0)`,
        backgroundSize: "2cm 2cm, 2cm 2cm, 0.5cm 0.5cm, 0.5cm 0.5cm",
        margin: "0px",
        position: "absolute",
        height: "100%",
        width: "100%",
    },
    main: {
        height: "100%",
        width: "100%",
    },
};

/**
 * The main application component.
 * @param {Props} root0 The component props.
 * @param {string} root0.basename The base URL for the router.
 * @returns {React.JSX.Element} The rendered component.
 */
export default function App({ basename }: Props): React.JSX.Element {
    return (
        <>
            <Global styles={globalStyle} />
            <BrowserRouter basename={basename}>
                <h1>DGTiles</h1>
            </BrowserRouter>
        </>
    );
}
