//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from "react";
import { useContext } from "react";
import { AuthenticationContext } from "../App";

export interface UnauthenticatedProps {
}

export const Unauthenticated : React.FC<React.PropsWithChildren<UnauthenticatedProps>> = (props: React.PropsWithChildren<UnauthenticatedProps>) => {
    const isAuthenticated = useContext(AuthenticationContext);

    return isAuthenticated.session !== undefined
        ? null
        : <>{props.children}</>;
}
