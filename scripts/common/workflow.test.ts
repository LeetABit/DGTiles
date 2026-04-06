//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { type Mock, beforeEach, describe, expect, test, vi } from "vitest";
import { getNodeVersionAsync } from "./workflow";
import { readFile } from "fs/promises";

vi.mock("fs/promises", () => ({
    readFile: vi.fn(),
}));

describe("workflow", () => {
    beforeEach(() => {
        (readFile as unknown as Mock).mockReset();
    });

    test("reads node-version from CI workflow file", async () => {
        (readFile as unknown as Mock).mockResolvedValueOnce(
            [
                "name: CI",
                "jobs:",
                "  check:",
                "    steps:",
                "      - uses: actions/setup-node@v4",
                "        with:",
                "          node-version: 24.8.0",
            ].join("\n"),
        );

        const result = await getNodeVersionAsync();

        expect(readFile).toHaveBeenCalledWith(
            ".github/workflows/CI_CD.yaml",
            "utf8",
        );
        expect(result).toBe("24.8.0");
    });

    test("throws when CI file does not declare node-version", async () => {
        (readFile as unknown as Mock).mockResolvedValueOnce(
            [
                "name: CI",
                "jobs:",
                "  check:",
                "    steps:",
                "      - run: pnpm verify",
            ].join("\n"),
        );

        await expect(async () => {
            await getNodeVersionAsync();
        }).rejects.toThrowError("node-version must exist in CI workflow");
    });
});
