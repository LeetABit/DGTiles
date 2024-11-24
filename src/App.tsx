//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { CSSObject, Global, ThemeProvider } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";
import { theme } from "@/styles/themes.mts";

interface Props {
    readonly basename?: string;
}

const globalStyle: CSSObject = {
    'a[target="_blank"]': {
        "&:after": {
            background: `url(/images/ExternalLink.svg)`,
            backgroundRepeat: "no-repeat",
            content: '""',
            display: "inline-block",
            height: "1em",
            verticalAlign: "text-top",
            width: "1em",
        },
        whiteSpace: "nowrap",
    },
    body: {
        margin: "0px",
    },
    label: "MainView",
};

export default function App({ basename }: Props) {
    return (
        <>
            <Global styles={globalStyle} />

            <ThemeProvider theme={theme}>
                <BrowserRouter basename={basename} />
            </ThemeProvider>
        </>
    );
}
