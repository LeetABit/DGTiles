//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import axe from '@axe-core/react';
import { Optional, Nullable } from './types';
import App from './App';

const baseElement: HTMLCollectionOf<HTMLBaseElement> = document.getElementsByTagName('base');
const baseUrl: Optional<string> = (baseElement.length > 0)
    ? (baseElement[0].getAttribute('href') ?? undefined)
    : undefined;
const rootElement: Nullable<HTMLElement> = document.getElementById('root');

if (rootElement == null) {
    throw Error('Could not find element with root ID for React App substitution.');
}

if (process.env.NODE_ENV !== 'production') {
    axe(React, ReactDOM, 1000);
}

const root = createRoot(rootElement);
root.render(<App basename={baseUrl} />);
