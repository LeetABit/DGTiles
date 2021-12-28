//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from "react";
import { useContext } from "react";
import { AuthenticationContext } from "../App";

export interface AuthenticatedProps {
}

export const Authenticated : React.FC<React.PropsWithChildren<AuthenticatedProps>> = (props: React.PropsWithChildren<AuthenticatedProps>) => {
    const isAuthenticated = useContext(AuthenticationContext);

    return isAuthenticated.session !== undefined
        ? <>{props.children}</>
        : null;
}
