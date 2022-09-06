//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Dialog, { DialogMode } from './Dialog';

interface Props {
    mode?: DialogMode,
    labeledBy?: string,
}
export default function RoutedDialog({ mode, labeledBy, children }: React.PropsWithChildren<Props>) {
    const navigate = useNavigate();
    const location = useLocation();
    const navigateBack = () => {
        if (document.referrer.split('/')[2] === window.location.host || location.state) {
            navigate(-1);
        } else {
            navigate('/');
        }
    }

    return (
        <Dialog mode={mode} labeledBy={labeledBy} onClose={navigateBack}>
            {children}
        </Dialog>
    );
}
