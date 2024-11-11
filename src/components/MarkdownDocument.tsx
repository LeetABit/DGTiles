//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Anchor from '../markdown/Anchor';
import Pre from '../markdown/Pre';

interface Props {
    content: string
}

export default function MarkdownDocument({ content }: Props) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{ a: Anchor, pre: Pre }}
        >
            {content}
        </ReactMarkdown>
    );
}
