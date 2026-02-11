//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { assert, isArray, isFunction, isObject, isString } from "./assert";
import { describe, expect, it } from "vitest";

describe("isFunction", () => {
    it("should return true for function", () => {
        expect(isFunction(() => {})).toBe(true);
        expect(isFunction(() => {})).toBe(true);
        expect(isFunction(async () => {})).toBe(true);
    });

    it("should return false for non-function values", () => {
        expect(isFunction("string")).toBe(false);
        expect(isFunction(123)).toBe(false);
        expect(isFunction({})).toBe(false);
        expect(isFunction([])).toBe(false);
        expect(isFunction(null)).toBe(false);
        expect(isFunction(undefined)).toBe(false);
    });
});

describe("isString", () => {
    it("should return true for string", () => {
        expect(isString("hello")).toBe(true);
        expect(isString("")).toBe(true);
    });

    it("should return false for non-string values", () => {
        expect(isString(123)).toBe(false);
        expect(isString({})).toBe(false);
        expect(isString([])).toBe(false);
        expect(isString(null)).toBe(false);
        expect(isString(undefined)).toBe(false);
        expect(isString(() => {})).toBe(false);
    });
});

describe("isObject", () => {
    it("should return true for object", () => {
        expect(isObject({})).toBe(true);
        expect(isObject({ key: "value" })).toBe(true);
    });

    it("should return false for non-object values", () => {
        expect(isObject([])).toBe(false);
        expect(isObject(null)).toBe(false);
        expect(isObject("string")).toBe(false);
        expect(isObject(123)).toBe(false);
        expect(isObject(undefined)).toBe(false);
        expect(isObject(() => {})).toBe(false);
    });
});

describe("isArray", () => {
    it("should return true for array", () => {
        expect(isArray([])).toBe(true);
        expect(isArray([1, 2, 3])).toBe(true);
    });

    it("should return false for non-array values", () => {
        expect(isArray({})).toBe(false);
        expect(isArray("string")).toBe(false);
        expect(isArray(123)).toBe(false);
        expect(isArray(null)).toBe(false);
        expect(isArray(undefined)).toBe(false);
        expect(isArray(() => {})).toBe(false);
    });
});

describe("assert", () => {
    it("should not throw when condition is true", () => {
        expect(() => {
            assert(true);
        }).not.toThrow();
    });

    it("should throw with default message when condition is false", () => {
        expect(() => {
            assert(false);
        }).toThrow("Assertion failed");
    });

    it("should throw with custom message when condition is false", () => {
        expect(() => {
            assert(false, "Custom error");
        }).toThrow("Custom error");
    });
});
