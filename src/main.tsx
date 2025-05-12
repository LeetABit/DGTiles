//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import React, { StrictMode } from "react";
import App from "@/App.tsx";
import ReactDOM from "react-dom";
import axe from "@axe-core/react";
import { createRoot } from "react-dom/client";
import { serviceWorkerFilePath } from "virtual:service-worker";

const ONE_SECOND_IN_MILLISECONDS = 1000;

const baseUrl = document.getElementsByTagName("base")[0]?.getAttribute("href");
if (baseUrl === undefined || baseUrl === null) {
    throw Error("Could not find base element for React App substitution.");
}

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

if ("serviceWorker" in navigator && import.meta.env.PROD) {
    navigator.serviceWorker
        .register(serviceWorkerFilePath, {
            type: "module",
        })
        .catch((error: unknown) => {
            throw error;
        });
}
