//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React, { useContext } from "react";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { IdentityProviderOptions, verifyIdToken } from "../openid/openid";
import { AuthenticationContext } from "../App";

export interface IdentityProviderCallbackProps {
    options: IdentityProviderOptions
}

export const IdentityProviderCallback : React.FC<IdentityProviderCallbackProps> = (props: IdentityProviderCallbackProps) => {
    const isAuthenticated = useContext(AuthenticationContext);
    const navigate = useNavigate();
    const nonce = localStorage.getItem("nonce");

    useEffect(() => {
        async function verify() {
            try {
                if (nonce === null) {
                    throw new Error("Could not find authentication request nonce.");
                }

                const idToken = await verifyIdToken(props.options, nonce);
                if (idToken !== undefined) {
                    isAuthenticated.setSession(idToken);
                }
            }
            finally {
                navigate("/", {replace: true});
            }
        }

        verify();
    }, [nonce, props.options, isAuthenticated, navigate]);

    return null;
}
