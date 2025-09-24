//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import type { CSSObject } from "@emotion/react";
import type { AriaAttributes } from "react";

interface Props extends AriaAttributes {
    style?: CSSObject;
}

const titleStyle: CSSObject = {
    display: "inline-block",
};

/**
 * @param root0
 * @param root0.style
 */
export default function Header({ style, ...ariaAttributes }: Props) {
    return (
        <header css={style} {...ariaAttributes}>
            <h1 css={titleStyle} role="heading" aria-level={1}>DGTiles</h1>
        </header>
    );
}
