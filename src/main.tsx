//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import App from "@/App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { serviceWorkerFilePath } from "virtual:service-worker";

const rootElement: HTMLElement | null = document.getElementById("root");

if (!rootElement) {
    throw Error(
        "Could not find element with root ID for React App substitution.",
    );
}

const root = createRoot(rootElement);
root.render(
    <StrictMode>
        <App />
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
