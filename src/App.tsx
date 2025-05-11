//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { type CSSObject, Global } from "@emotion/react";
import React from "react";

const globalStyle: CSSObject = {
    body: {
        margin: "0px",
    },
    label: "MainView",
};

/**
 * The main application component.
 * @returns {React.JSX.Element} The rendered component.
 */
export default function App(): React.JSX.Element {
    return (
        <>
            <Global styles={globalStyle} />
            <h1>DGTiles</h1>
        </>
    );
}
