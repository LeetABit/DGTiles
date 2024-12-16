//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { describe, expect, test } from "vitest";
import App from "/src/App.tsx";
import { render } from "@testing-library/react";

describe("App Component", () => {
    test("should render without crashing", () => {
        render(<App />);
        expect(true);
    });
});
