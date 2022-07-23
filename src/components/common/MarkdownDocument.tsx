//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header1 from '../markdown/Header1';

export interface MarkdownDocumentProps {
    content: string
}

const style : CSSObject = {
    label: 'MarkdownDocument-Main',
    wordBreak: 'break-word',
};

export default ({ content }: MarkdownDocumentProps) => (
    <div css={style}>
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{ h1: Header1 }}
        >
            {content}
        </ReactMarkdown>
    </div>
);
