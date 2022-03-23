//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React, { PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Popup from './Popup';

const RoutedPopup : React.FC<PropsWithChildren<unknown>> = ({ children } : PropsWithChildren<unknown>) => {
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
        <Popup onClose={navigateBack}>
            {children}
        </Popup>
    );
};

export default RoutedPopup;
