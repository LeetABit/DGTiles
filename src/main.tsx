//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import React, { StrictMode } from "react";
import App from "@/App";
import ReactDOM from "react-dom";
import axe from "@axe-core/react";
import { createRoot } from "react-dom/client";

const ONE_SECOND_IN_MILLISECONDS = 1000;

const baseElement: HTMLCollectionOf<HTMLBaseElement> =
    document.getElementsByTagName("base");
const baseUrl: string | undefined =
    baseElement.length > 0
        ? (baseElement[0].getAttribute("href") ?? undefined)
        : undefined;
const rootElement: HTMLElement | null = document.getElementById("root");

if (!rootElement) {
    throw Error(
        "Could not find element with root ID for React App substitution.",
    );
}

if (import.meta.env.DEV) {
    await axe(React, ReactDOM, ONE_SECOND_IN_MILLISECONDS);
}

const root = createRoot(rootElement);
root.render(
    <StrictMode>
        <App basename={baseUrl} />
    </StrictMode>,
);
