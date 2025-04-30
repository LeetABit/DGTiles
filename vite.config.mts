//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    resolve: {
        alias: {
            "#/": `${resolve(__dirname)}/`,
            "@/": `${resolve(__dirname, "src")}/`,
        },
    },
});
