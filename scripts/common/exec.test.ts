//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { describe, expect, test, vi } from "vitest";
import { execCommandAsync } from "./exec";

const mockExecAsync = vi.hoisted(() => vi.fn());
vi.mock("util", () => ({
    default: { promisify: vi.fn().mockReturnValue(mockExecAsync) },
}));

describe("execCommandAsync", () => {
    test("should return stdout when executes successfully", async () => {
        // Arrange
        const command = "echo success";
        const executionResult = {
            stderr: "",
            stdout: "success",
        };
        mockExecAsync.mockReturnValue(executionResult);

        // Act
        const result = await execCommandAsync(command);

        // Assert
        expect(result).toBe("success");
        expect(mockExecAsync).toHaveBeenCalledWith(command);
    });

    test("should throw an error when produces stderr", async () => {
        // Arrange
        const command = "invalid command";
        const executionResult = {
            stderr: "error",
        };
        mockExecAsync.mockReturnValue(executionResult);

        // Act
        // Assert
        await expect(execCommandAsync(command)).rejects.toThrow("error");
        expect(mockExecAsync).toHaveBeenCalledWith(command);
    });

    test("should handle empty stdout and stderr gracefully", async () => {
        // Arrange
        const command = "echo empty";
        const executionResult = {
            stderr: "",
            stdout: "",
        };
        mockExecAsync.mockReturnValue(executionResult);

        // Act
        const result = await execCommandAsync(command);

        // Assert
        expect(result).toBe("");
        expect(mockExecAsync).toHaveBeenCalledWith(command);
    });

    test("should propagate errors thrown by execAsync", async () => {
        // Arrange
        const command = "failing command";
        const errorMessage = "execution failed";
        mockExecAsync.mockRejectedValue(new Error(errorMessage));

        // Act
        // Assert
        await expect(execCommandAsync(command)).rejects.toThrow(errorMessage);
        expect(mockExecAsync).toHaveBeenCalledWith(command);
    });
});
