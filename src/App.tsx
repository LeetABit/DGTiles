//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore from './store/configureStore';
import { createBrowserHistory } from 'history';
import { Optional } from './Types';
import * as gitVersion from './gitVersion.json';

type AppProps = {
    basename: Optional<string>
}

export default class App extends Component<AppProps> {
    render() {
        const history = createBrowserHistory({ basename: this.props.basename });
        const store = configureStore(history);
        
        let appVersion = gitVersion.version;

        if (gitVersion.commitCount > 0) {
            appVersion += `-beta.${gitVersion.commitCount}`
        }

        if (gitVersion.isDirty) {
            appVersion += '-local'
        }

        appVersion += `+Branch.${gitVersion.branch}`
        appVersion += `+Sha.${gitVersion.sha}`
        appVersion += `+Timestamp.${gitVersion.buildSafeTime}`

        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div>Version: {appVersion}</div>
                    <div>Date: {gitVersion.buildTime}</div>
                </ConnectedRouter>
            </Provider>
        );
    }
}