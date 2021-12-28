//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from "react";
import { IdentityProviderOptions, generateNonce, getAuthorizationUrl } from "../openid/openid";

export interface IdentityProviderButtonProps {
    options: IdentityProviderOptions,
}

export const IdentityProviderButton : React.FC<IdentityProviderButtonProps> = (props: IdentityProviderButtonProps) => {
    const nonce = generateNonce();
    const url = getAuthorizationUrl(props.options, nonce);

    function storeNonceAndRedirectToProvider() {
        localStorage.setItem('nonce', nonce);
        window.location.assign(url.toString());
    }

    return <button onClick={storeNonceAndRedirectToProvider}>{props.options.identityProviderName}</button>
}
