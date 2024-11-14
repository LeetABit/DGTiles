//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React, { AriaAttributes, forwardRef, useMemo } from 'react';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { cloneElementWithEmotion } from 'src/types';

interface Props extends AriaAttributes {
    container: ReactElement,
    style?: CSSObject,
}

export default forwardRef<HTMLElement, React.PropsWithChildren<Props>>(
    (
        { children, style, container }: React.PropsWithChildren<Props>,
        ref: React.Ref<HTMLElement>,
    ) => {
        return useMemo(
            () => {
                return (
                    React.isValidElement(children)
                    && children.type !== React.Fragment
                    && (
                        typeof children.type === 'string'
                        || (
                            '$$typeof' in children
                            && (children as {$$typeof: symbol})?.$$typeof === Symbol.for('react.forward_ref')
                        )
                    )
                )
                    ? cloneElementWithEmotion(children, style, { ref })
                    : cloneElementWithEmotion(container, style, { ref }, children);
            },
            [children, style, container, ref],
        );
    },
);
