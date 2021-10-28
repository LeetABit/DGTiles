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
import { VersionLabel } from './components/VersionLabel';

type AppProps = {
    basename: Optional<string>
}

export default class App extends Component<AppProps> {
    render() {
        const history = createBrowserHistory({ basename: this.props.basename });
        const store = configureStore(history);
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <VersionLabel displayDate={true} />
                </ConnectedRouter>
            </Provider>
        );
    }
}
