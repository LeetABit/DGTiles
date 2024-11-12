//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import FlowContainer from 'src/components/common/FlowContainer';

const containerStyle: CSSObject = {
    backgroundColor: 'grey',
}

const container = (
    <div css={containerStyle} />
);

export default function TileGallery() {
    return (
        <FlowContainer container={container} />
    );
}
