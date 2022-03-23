//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

declare interface MarkdownDocumentProps {
    content: string
}

const style : CSSObject = {
    label: 'MarkdownDocument-Main',
    wordBreak: 'break-word',
};

const MarkdownDocument : React.FC<MarkdownDocumentProps> = ({ content } : MarkdownDocumentProps) => (
    <div css={style}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
        </ReactMarkdown>
    </div>
);

export default MarkdownDocument;
