//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { type Mock, describe, expect, it, vi } from "vitest";
import { createReadStream } from "fs";
import { evaluateFileContentAsync } from "#/scripts/common/files.mts";
import stream from "stream";

vi.mock("fs", () => ({
    createReadStream: vi.fn(),
}));

describe("evaluateFileContentAsync", () => {
    it("returns true when condition is met", async () => {
        const readable = new stream.Readable();
        (createReadStream as unknown as Mock).mockReturnValue(readable);

        const mockCondition = (line: string) => line.includes("dependency");
        const promise = evaluateFileContentAsync("path/to/file", mockCondition);

        readable.push("import { something } from 'dependency';\n");
        readable.push(null);
        const result = await promise;
        expect(result).toBe(true);
    });

    it("returns false when condition is not met", async () => {
        const readable = new stream.Readable();
        (createReadStream as unknown as Mock).mockReturnValue(readable);

        const mockCondition = (line: string) => line.includes("dependency");

        const promise = evaluateFileContentAsync("path/to/file", mockCondition);

        readable.push("const someVariable = 42;\n");
        readable.push(null);
        const result = await promise;
        expect(result).toBe(false);
    });

    it("handles empty file content", async () => {
        const readable = new stream.Readable();
        (createReadStream as unknown as Mock).mockReturnValue(readable);

        const mockCondition = (line: string) => line.includes("dependency");

        const promise = evaluateFileContentAsync("path/to/file", mockCondition);

        readable.push(null);
        const result = await promise;
        expect(result).toBe(false);
    });

    it("handles condition that always returns false", async () => {
        const readable = new stream.Readable();
        (createReadStream as unknown as Mock).mockReturnValue(readable);
        const mockCondition = () => false;

        const promise = evaluateFileContentAsync("path/to/file", mockCondition);

        readable.push("import { something } from 'dependency';\n");
        readable.push(null);
        const result = await promise;
        expect(result).toBe(false);
    });

    it("handles file with content on second line", async () => {
        const readable = new stream.Readable();
        (createReadStream as unknown as Mock).mockReturnValue(readable);
        let calledCount = 0;
        const mockCondition = (line: string) => {
            calledCount += 1;
            return line.includes("dependency");
        };

        const promise = evaluateFileContentAsync("path/to/file", mockCondition);

        readable.push(
            "const someVariable = 42;\n"
            + "import { something } from 'dependency';\n",
        );
        readable.push(null);
        const result = await promise;
        expect(result).toBe(true);
        expect(calledCount).toBe(2);
    });
});
