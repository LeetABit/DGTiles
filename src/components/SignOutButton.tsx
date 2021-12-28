//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React, { useContext } from "react";
import { AuthenticationContext } from "../App";

export interface SignOutButtonProps {
    text: string,
}

export const SignOutButton : React.FC<SignOutButtonProps> = (props: SignOutButtonProps) => {
    const isAuthenticated = useContext(AuthenticationContext);

    function cleanSession() {
        isAuthenticated.setSession(undefined);
    }

    return <button onClick={cleanSession}>{props.text}</button>
}
