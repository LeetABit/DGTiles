//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import { serialize, deserialize } from 'bson';
import { compress, Compressed, decompress } from 'compress-json';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useRootSelector } from 'src/hooks/useRootSelector';
import { isTileDefinition, selectAllTiles, setTiles, TileDefinition } from 'src/store/tiles';
import { PropsWithAria } from 'src/types';

interface Props {
    id?: string;
    rows?: number;
}

const textareaStyle: CSSObject = {
    resize: 'none',
    width: '100%',
}

const decode = (base64: string): ArrayBuffer => {
    const asciString = window.atob(base64);
    const len = asciString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; ++i) {
        bytes[i] = asciString.charCodeAt(i);
    }

    return bytes.buffer;
}

const encode = (cson: Compressed): Buffer => {
    return serialize(cson);
}

const calculateToken = (entities: {}) => {
    const cson = compress(entities);
    const buffer = encode(cson);
    return buffer.toString('base64');
}

const consumeToken = (token: string) => {
    const buffer = decode(token);
    const cson = deserialize(buffer) as Compressed;
    const stripped = decompress([cson[0], cson[1]]);
    if (Array.isArray(stripped)) {
        return stripped;
    }

    return undefined;
}

export default function TilesTokenInput({ id, rows, ...aria }: PropsWithAria<Props>) {
    const dispatch = useDispatch();
    const items = useRootSelector(state => selectAllTiles(state.tiles)).map(entity => entity.entity);
    const token = useMemo(() => calculateToken(items), [items]);
    const tokenChanged = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        try {
            const newItems = consumeToken(event.currentTarget.value);
            if (newItems !== undefined) {
                const newTileDefinitions = newItems.filter(newItem => isTileDefinition(newItem)) as TileDefinition[];
                dispatch(setTiles(newTileDefinitions));
            } else {
                event.preventDefault();
            }
        } catch {
            event.preventDefault();
        }
    }, []);

    return <textarea id={id} css={textareaStyle} value={token} rows={3} {...aria} onChange={tokenChanged} />;
}
