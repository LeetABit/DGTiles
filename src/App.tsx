//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Optional } from './Types';
import VersionLabel from './components/VersionLabel';
import IdentityProviderButton from './components/IdentityProviderButton';
import IdentityProviderCallback from './components/IdentityProviderCallback';
import { getIdentityProviderOptions, IdentityProviderOptions } from './openid/openid';
import Unauthenticated from './components/Unauthenticated';
import Authenticated from './components/Authenticated';
import SignOutButton from './components/SignOutButton';
import SessionLabel from './components/SessionLabel';

declare interface AppProps {
    basename: Optional<string>
}

declare interface AppState {
    session: Optional<string>,
    setSession: React.Dispatch<string | undefined>
}

export const AuthenticationContext = React.createContext({
    session: Cookies.get('session'),
    setSession: (null as unknown as React.Dispatch<string | undefined>),
});

const identityProviders : IdentityProviderOptions[] = getIdentityProviderOptions();

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.setSession = this.setSession.bind(this);

        this.state = {
            session: Cookies.get('session'),
            // This state value is used by AuthenticationContext.Provider
            // eslint-disable-next-line react/no-unused-state
            setSession: this.setSession,
        };
    }

    componentDidUpdate() {
        const { session } = this.state;

        if (session !== undefined) {
            Cookies.set('session', session, { expires: 7, secure: true });
        } else {
            Cookies.remove('session');
        }
    }

    setSession(session: Optional<string>) {
        this.setState({ session });
    }

    render() {
        const { basename } = this.props;

        return (
            <BrowserRouter basename={basename}>
                <AuthenticationContext.Provider value={this.state}>
                    <Routes>
                        {identityProviders.map((identityProvider) => (
                            <Route
                                key={identityProvider.identityProviderName}
                                path={`/signed-in/${identityProvider.identityProviderName}`}
                                element={<IdentityProviderCallback options={identityProvider} />}
                            />
                        ))}
                    </Routes>
                    <VersionLabel displayDate />
                    <Unauthenticated>
                        <div>
                            {identityProviders.map((identityProvider) => (
                                <IdentityProviderButton
                                    key={identityProvider.identityProviderName}
                                    options={identityProvider}
                                />
                            ))}
                        </div>
                    </Unauthenticated>
                    <Authenticated>
                        <SessionLabel />
                        <SignOutButton text="Sign Out" />
                    </Authenticated>
                </AuthenticationContext.Provider>
            </BrowserRouter>
        );
    }
}

export default App;
