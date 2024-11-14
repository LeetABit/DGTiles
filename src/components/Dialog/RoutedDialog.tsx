//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';
import React, { AriaAttributes, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Dialog from './Dialog';
import { DialogMode } from './types';

interface Props extends AriaAttributes {
    mode?: DialogMode,
    titleBar?: React.ReactNode,
    style?: CSSObject,
}
export default function RoutedDialog({ mode, titleBar, style, children, ...ariaAttributes }: React.PropsWithChildren<Props>) {
    const navigate = useNavigate();
    const location = useLocation();
    const navigateBack = useCallback(() => {
        if (document.referrer.split('/')[2] === window.location.host || location.state) {
            navigate(-1);
        } else {
            navigate('/');
        }
    }, []);

    return (
        <Dialog mode={mode} titleBar={titleBar} style={style} {...ariaAttributes} onClose={navigateBack}>
            {children}
        </Dialog>
    );
}
