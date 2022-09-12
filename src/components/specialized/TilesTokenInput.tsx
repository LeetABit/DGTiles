//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import { serialize, deserialize } from 'bson';
import { compress, Compressed, decompress } from 'compress-json';
import { useCallback, useMemo, useId } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/stateHooks';
import { TileDefinition, setTiles, stripTileIdentity } from '../../states/tiles';

const textareaStyle: CSSObject = {
    resize: 'none',
    width: '100%',
}

const divStyle: CSSObject = {
    display: 'inline-block',
    float: 'right',
    width: '50%',
    padding: '0em 1em',
}

const labelStyle: CSSObject = {
    display: 'block',
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

const calculateToken = (items: TileDefinition[]) => {
    const stripped = items.map(item => stripTileIdentity(item));
    const cson = compress(stripped);
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

export default function TilesTokenInput() {
    const id = useId();
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.tiles.tiles);
    const token = useMemo(() => calculateToken(items), [items]);
    const tokenChanged = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        try {
            const newItems = consumeToken(event.currentTarget.value);
            if (newItems !== undefined) {
                dispatch(setTiles(newItems));
            } else {
                event.preventDefault();
            }
        } catch {
            event.preventDefault();
        }
    }, []);

    return (
        <div css={divStyle}>
            <label css={labelStyle} htmlFor={id}>
                <span>Workspace Token:</span>
                <textarea id={id} css={textareaStyle} value={token} rows={3} aria-multiline onChange={tokenChanged} />
            </label>
        </div>
    );
}
