//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { type Mock, describe, expect, test, vi } from "vitest";
import { evaluateFileContentAsync, extractFileContentAsync } from "./files";
import { createReadStream } from "fs";
import stream from "stream";

vi.mock("fs", () => ({
    createReadStream: vi.fn(),
}));

describe("evaluateFileContentAsync", () => {
    test("returns true when condition is met", async () => {
        const readable = new stream.Readable();
        (createReadStream as unknown as Mock).mockReturnValue(readable);

        const mockCondition = (line: string) => line.includes("dependency");
        const promise = evaluateFileContentAsync("path/to/file", mockCondition);

        readable.push("import { something } from 'dependency';\n");
        readable.push(null);
        const result = await promise;
        expect(result).toBe(true);
    });

    test("returns true when condition is met", async () => {
        const readable = new stream.Readable();
        (createReadStream as unknown as Mock).mockReturnValue(readable);

        const mockCondition = () => {
            throw new Error("Test error");
        };
        const promise = evaluateFileContentAsync("path/to/file", mockCondition);

        readable.push("import { something } from 'dependency';\n");
        readable.push(null);
        const result = await promise;
        expect(result).toBe(false);
    });

    test("returns false when condition is not met", async () => {
        const readable = new stream.Readable();
        (createReadStream as unknown as Mock).mockReturnValue(readable);

        const mockCondition = (line: string) => line.includes("dependency");

        const promise = evaluateFileContentAsync("path/to/file", mockCondition);

        readable.push("const someVariable = 42;\n");
        readable.push(null);
        const result = await promise;
        expect(result).toBe(false);
    });

    test("handles empty file content", async () => {
        const readable = new stream.Readable();
        (createReadStream as unknown as Mock).mockReturnValue(readable);

        const mockCondition = (line: string) => line.includes("dependency");

        const promise = evaluateFileContentAsync("path/to/file", mockCondition);

        readable.push(null);
        const result = await promise;
        expect(result).toBe(false);
    });

    test("handles condition that always returns false", async () => {
        const readable = new stream.Readable();
        (createReadStream as unknown as Mock).mockReturnValue(readable);
        const mockCondition = () => false;

        const promise = evaluateFileContentAsync("path/to/file", mockCondition);

        readable.push("import { something } from 'dependency';\n");
        readable.push(null);
        const result = await promise;
        expect(result).toBe(false);
    });

    test("handles file with content on second line", async () => {
        const readable = new stream.Readable();
        (createReadStream as unknown as Mock).mockReturnValue(readable);
        let calledCount = 0;
        const mockCondition = (line: string) => {
            calledCount += 1;
            return line.includes("dependency");
        };

        const promise = evaluateFileContentAsync("path/to/file", mockCondition);

        readable.push(
            "const someVariable = 42;\n" +
                "import { something } from 'dependency';\n",
        );
        readable.push(null);
        const result = await promise;
        expect(result).toBe(true);
        expect(calledCount).toBe(2);
    });
});

describe("extractFileContentAsync", () => {
    test("extracts content from matching lines", async () => {
        const readable = new stream.Readable();
        (createReadStream as unknown as Mock).mockReturnValue(readable);

        const mockExtractor = (line: string) =>
            line.includes("import") ? line.trim() : undefined;
        const promise = extractFileContentAsync("path/to/file", mockExtractor);

        readable.push("import { something } from 'dependency';\n");
        readable.push("const someVariable = 42;\n");
        readable.push("import { other } from 'module';\n");
        readable.push(null);
        const result = await promise;
        expect(result).toEqual([
            "import { something } from 'dependency';",
            "import { other } from 'module';",
        ]);
    });

    test("returns empty array when no lines match", async () => {
        const readable = new stream.Readable();
        (createReadStream as unknown as Mock).mockReturnValue(readable);

        const mockExtractor = (line: string) =>
            line.includes("export") ? line.trim() : undefined;
        const promise = extractFileContentAsync("path/to/file", mockExtractor);

        readable.push("import { something } from 'dependency';\n");
        readable.push("const someVariable = 42;\n");
        readable.push(null);
        const result = await promise;
        expect(result).toEqual([]);
    });

    test("handles empty file", async () => {
        const readable = new stream.Readable();
        (createReadStream as unknown as Mock).mockReturnValue(readable);

        const mockExtractor = (line: string) => line.trim();
        const promise = extractFileContentAsync("path/to/file", mockExtractor);

        readable.push(null);
        const result = await promise;
        expect(result).toEqual([]);
    });

    test("extracts content from all lines when extractor always returns value", async () => {
        const readable = new stream.Readable();
        (createReadStream as unknown as Mock).mockReturnValue(readable);

        const mockExtractor = (line: string) => line.trim();
        const promise = extractFileContentAsync("path/to/file", mockExtractor);

        readable.push("line1\n");
        readable.push("line2\n");
        readable.push("line3\n");
        readable.push(null);
        const result = await promise;
        expect(result).toEqual(["line1", "line2", "line3"]);
    });

    test("passes correct line number to extractor", async () => {
        const readable = new stream.Readable();
        (createReadStream as unknown as Mock).mockReturnValue(readable);

        const lineNumbers: number[] = [];
        const mockExtractor = (line: string, lineNumber: number) => {
            lineNumbers.push(lineNumber);
            return line;
        };
        const promise = extractFileContentAsync("path/to/file", mockExtractor);

        readable.push("line1\n");
        readable.push("line2\n");
        readable.push("line3\n");
        readable.push(null);
        await promise;
        expect(lineNumbers).toEqual([1, 2, 3]);
    });
});
