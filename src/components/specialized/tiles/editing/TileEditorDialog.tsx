//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import { AriaAttributes } from 'react';
import Dialog from 'src/components/common/Dialog';
import { TileDefinition } from 'src/store/tiles';
import { Entity } from 'src/types';
import TileNameEditor from './TileNameEditor';

interface Props extends AriaAttributes{
    definition: Entity<TileDefinition>,
    style?: CSSObject,
    onClose: () => void,
}

export default function TileEditorDialog({ definition, style, onClose, ...ariaAttributes }: Props) {
    return (
        <Dialog mode="absolute-modal" titleBar={<TileNameEditor definition={definition} />} style={style} {...ariaAttributes} onClose={onClose} />
    );
}
