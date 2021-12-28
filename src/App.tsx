//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react';
import { useState } from "react";
import { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Cookies from 'js-cookie';
import { Optional } from './Types';
import { VersionLabel } from './components/VersionLabel';
import { IdentityProviderButton } from './components/IdentityProviderButton';
import { IdentityProviderCallback } from './components/IdentityProviderCallback';
import { getIdentityProviderOptions } from './openid/openid'
import { Unauthenticated } from './components/Unauthenticated';
import { Authenticated } from './components/Authenticated';
import { SignOutButton } from './components/SignOutButton';
import { SessionLabel } from './components/SessionLabel';

export interface AppProps {
    basename: Optional<string>
}

export const AuthenticationContext = React.createContext({
    session: Cookies.get("session"),
    setSession: (session: Optional<string>) => {}
});

export const App : React.FC<AppProps> = (props: AppProps) => {
    const [session, setSession] = useState(Cookies.get("session"));
    const value = { session, setSession };
    const identityProviders = getIdentityProviderOptions();

    useEffect(() => {
        if (session !== undefined) {
            Cookies.set("session", session, {expires: 7, secure: true});
        }
        else {
            Cookies.remove("session");
        }
    });

    return (
        <BrowserRouter>
            <AuthenticationContext.Provider value={value}>
                <Routes>
                    {identityProviders.map(identityProvider => <Route key={identityProvider.identityProviderName} path={"/signed-in/" + identityProvider.identityProviderName} element={<IdentityProviderCallback options={identityProvider} />}/>)}
                </Routes>
                <VersionLabel displayDate={true} />
                <Unauthenticated>
                <div>
                    {identityProviders.map(identityProvider => <IdentityProviderButton key={identityProvider.identityProviderName} options={identityProvider} />)}
                </div>
                </Unauthenticated>
                <Authenticated>
                    <SessionLabel/>
                    <SignOutButton text='Sign Out'/>
                </Authenticated>
            </AuthenticationContext.Provider>
        </BrowserRouter>
    );
}
