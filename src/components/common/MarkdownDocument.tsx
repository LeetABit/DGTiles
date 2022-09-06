//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Anchor from '../markdown/Anchor';
import Header1 from '../markdown/Header1';

interface Props {
    content: string
}

const style : CSSObject = {
    label: 'MarkdownDocument',
    wordBreak: 'break-word',
};

export default function MarkdownDocument({ content }: Props) {
    return (
        <div css={style}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{ h1: Header1, a: Anchor }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
