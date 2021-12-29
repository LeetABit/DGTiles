//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react';
import { IdentityProviderOptions, generateNonce, getAuthorizationUrl } from '../openid/openid';

declare interface IdentityProviderButtonProps {
    options: IdentityProviderOptions,
}

const IdentityProviderButton : React.FC<IdentityProviderButtonProps> = ({ options } : IdentityProviderButtonProps) => {
    const nonce = generateNonce();
    const url = getAuthorizationUrl(options, nonce);

    function storeNonceAndRedirectToProvider() {
        localStorage.setItem('nonce', nonce);
        window.location.assign(url.toString());
    }

    return <button type="button" onClick={storeNonceAndRedirectToProvider}>{options.identityProviderName}</button>;
};

export default IdentityProviderButton;
