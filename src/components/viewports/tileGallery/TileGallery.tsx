//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React from 'react';
import { Fill } from '../../../styles/layout';
import { mergeStyles } from '../../../styles/mergeStyles';
import { GalleryColor } from '../../../styles/themes';

const style: CSSObject = mergeStyles(Fill, {
    backgroundColor: GalleryColor,
});

const TileGallery : React.FC = () => {
    return (
        <div css={style} />
    );
}

export default TileGallery;
