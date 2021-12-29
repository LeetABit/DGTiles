//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React, { useContext } from 'react';

import { AuthenticationContext } from '../App';

const Authenticated : React.FC<React.PropsWithChildren<{}>> = ({ children }: React.PropsWithChildren<{}>) => {
    const isAuthenticated = useContext(AuthenticationContext);

    return isAuthenticated.session !== undefined
        ? <>{children}</>
        : null;
};

export default Authenticated;
