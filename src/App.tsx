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
