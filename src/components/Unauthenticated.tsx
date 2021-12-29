//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React, { useContext } from 'react';

import { AuthenticationContext } from '../App';

const Unauthenticated : React.FC<React.PropsWithChildren<{}>> = (props: React.PropsWithChildren<{}>) => {
    const isAuthenticated = useContext(AuthenticationContext);
    const { children } = props;

    return isAuthenticated.session !== undefined || !children
        ? null
        : <>{children}</>;
};

export default Unauthenticated;
