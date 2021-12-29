//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React, { useContext } from 'react';
import { AuthenticationContext } from '../App';

const SessionLabel : React.FC = () => {
    const isAuthenticated = useContext(AuthenticationContext);

    return (
        <p>
          Session (you can copy this value to
            <a href="https://jwt.io">https://jwt.io</a>
            {' '}
          to check what data has been gathered from your social login):
            {isAuthenticated.session !== undefined ? isAuthenticated.session : ''}
        </p>
    );
};

export default SessionLabel;
