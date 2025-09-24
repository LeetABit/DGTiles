//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { type CSSObject, Global } from "@emotion/react";
import { BrowserRouter } from "react-router";
import React from "react";

interface Props {
    basename: string;
}

const globalStyle: CSSObject = {
    body: {
        background: "#eee",
        backgroundImage:
            "linear-gradient(#ccc 0.07rem, transparent 0)," +
            "linear-gradient(90deg, #ccc 0.07rem, transparent 0), " +
            "linear-gradient(#ddd 0.05rem, transparent 0)," +
            "linear-gradient(90deg, #ddd 0.05rem, transparent 0)",
        backgroundSize: "2cm 2cm, 2cm 2cm, 0.5cm 0.5cm, 0.5cm 0.5cm",
        margin: "0px",
    },
    label: "MainView",
};

/**
 * The main application component.
 * @param {Props} props The component props.
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
