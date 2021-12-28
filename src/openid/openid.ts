//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { base64url, createRemoteJWKSet, jwtVerify } from "jose";
import { Optional } from "../Types";
import * as openidConfiguration from './openid.config.json';

export interface IdentityProviderOptions {
    baseUrl: URL,
    clientId: string,
    identityProviderName: string,
    issuerUrl: URL,
}

export function getIdentityProviderOptions(): IdentityProviderOptions[] {
    return openidConfiguration.identityProviders.map(provider => ({
        baseUrl: new URL(openidConfiguration.baseUrl),
        clientId: openidConfiguration.clientId,
        identityProviderName: provider,
        issuerUrl: new URL(openidConfiguration.issuerUrl),
    }));
}

export function generateNonce(): string {
    var random : Uint8Array = new Uint8Array(16);
    window.crypto.getRandomValues(random);
    return base64url.encode(random);
}

export function getAuthorizationUrl(options: IdentityProviderOptions, nonce: string): URL {
    const endpointUrl = joinUrl(options.baseUrl, ["B2C_1A_" + options.identityProviderName.toUpperCase(), "oauth2/v2.0/authorize"]);
    const currentLocationWithoutHash = window.location.protocol
        + '//' + window.location.hostname
        + (window.location.port ? (':' + window.location.port) : '')
        + window.location.pathname
        + (window.location.search ? window.location.search : '')

    const queryParams = {
        "client_id": options.clientId,
        "nonce": nonce,
        "redirect_uri": joinUrl(new URL(currentLocationWithoutHash), ["signed-in", options.identityProviderName]).toString(),
        "scope": "openid",
        "response_mode": "fragment",
        "response_type": "id_token",
        "prompt": "login",
    };

    const query = Object.entries(queryParams).map(([key, value]) => encodeURIComponent(key) + "=" + encodeURIComponent(value)).join("&");
    endpointUrl.search = query;
    return endpointUrl;
}

export async function verifyIdToken(options: IdentityProviderOptions, nonce: string): Promise<Optional<string>> {
    const idToken = extractParam("id_token");

    if (idToken !== undefined) {
        const openidConfigurationUrl = joinUrl(options.baseUrl, ["B2C_1A_" + options.identityProviderName.toUpperCase(), "v2.0/.well-known/openid-configuration"]).toString();
        const response = await fetch(openidConfigurationUrl);
        const { jwks_uri } = await response.json();
        const jwksSet = createRemoteJWKSet(new URL(jwks_uri));
        const { payload } = await jwtVerify(idToken, jwksSet, {
            issuer: options.issuerUrl.toString(),
            audience: options.clientId,
        });

        const tokenNonce = payload["nonce"];
        if (tokenNonce !== nonce) {
            throw new Error("Expected nonce value has not been found in the URL fragment.");
        }
    }
    else {
        let error = extractParam("error_description");
        if (!!!error) {
            error = extractParam("error");
        }

        if (error != null) {
            throw new Error(error);
        }
    }

    return idToken;
}

function extractParam(paramName : string): Optional<string> {
    const pairs = window.location.hash.substring(1).split('&');
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=');
        const key = decodeURIComponent(pair[0].replace(/\+/g, '%20'));
        if (key === paramName) {
            return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
        }
    }

    return undefined;
}

function joinUrl(baseUrl: URL, nodes: string[]): URL {
    return nodes.reduce((previous, current, index) => new URL(current + ((index < nodes.length - 1) ? "/" : ""), previous), baseUrl);
}
