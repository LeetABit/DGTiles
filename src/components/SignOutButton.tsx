//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React, { useContext } from 'react';
import { AuthenticationContext } from '../App';

declare interface SignOutButtonProps {
    text: string,
}

const SignOutButton : React.FC<SignOutButtonProps> = ({ text } : SignOutButtonProps) => {
    const isAuthenticated = useContext(AuthenticationContext);

    function cleanSession() {
        isAuthenticated.setSession(undefined);
    }

    return <button type="button" onClick={cleanSession}>{text}</button>;
};

export default SignOutButton;
