//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { type Mock, describe, expect, it, vi } from "vitest";
import { execCommandAsync } from "#/scripts/common/exec.mjs";
import util from "util";

vi.mock("util", () => ({
    default: { promisify: vi.fn() },
}));

vi.mock("child_process", () => ({
    exec: vi.fn(),
}));

describe("execCommandAsync", () => {
    it("should return stdout when executes successfully", async () => {
        const mockExec = vi.fn().mockResolvedValue({
            stderr: "",
            stdout: "success",
        });

        (util.promisify as unknown as Mock).mockReturnValue(mockExec);

        const result = await execCommandAsync("echo success");

        expect(result).toBe("success");
        expect(mockExec).toHaveBeenCalledWith("echo success");
    });

    it("should throw an error when produces stderr", async () => {
        const mockExec = vi.fn().mockResolvedValue({
            stderr: "error",
            stdout: "",
        });
        (util.promisify as unknown as Mock).mockReturnValue(mockExec);

        await expect(execCommandAsync("invalid command")).rejects.toThrow(
            "error",
        );
        expect(mockExec).toHaveBeenCalledWith("invalid command");
    });

    it("should handle empty stdout and stderr gracefully", async () => {
        const mockExec = vi.fn().mockResolvedValue({
            stderr: "",
            stdout: "",
        });
        (util.promisify as unknown as Mock).mockReturnValue(mockExec);

        const result = await execCommandAsync("echo empty");

        expect(result).toBe("");
        expect(mockExec).toHaveBeenCalledWith("echo empty");
    });

    it("should propagate errors thrown by execAsync", async () => {
        const mockExec = vi
            .fn()
            .mockRejectedValue(new Error("execution failed"));

        (util.promisify as unknown as Mock).mockReturnValue(mockExec);

        await expect(execCommandAsync("failing command")).rejects.toThrow(
            "execution failed",
        );
        expect(mockExec).toHaveBeenCalledWith("failing command");
    });
});
