//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ModalDialog from './ModalDialog';

export default ({ children }: PropsWithChildren<unknown>) => {
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
        <ModalDialog onClose={navigateBack}>
            {children}
        </ModalDialog>
    );
};
