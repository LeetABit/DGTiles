//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

/**
 * Checks if the provided value is a function.
 * @param {unknown} value The value to examine.
 * @returns {boolean} True if the value is a function, false otherwise.
 */
export function isFunction(value: unknown): value is Function {
    return typeof value === "function";
}

/**
 * Checks if the provided value is a string.
 * @param {unknown} value The value to examine.
 * @returns {boolean} True if the value is a string, false otherwise.
 */
export function isString(value: unknown): value is string {
    return typeof value === "string";
}

/**
 * Checks if the provided value is an object.
 * @param {unknown} value The value to examine.
 * @returns {boolean} True if the value is an object, false otherwise.
 */
export function isObject(value: unknown): value is object {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Checks if the provided value is an array.
 * @param {unknown} value The value to examine.
 * @returns {boolean} True if the value is an array, false otherwise.
 */
export function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
}

/**
 * Asserts that a given condition is true. If the condition is false, an error
 * is thrown with the provided message or a default message.
 * @param {boolean} value The condition to check.
 * @param {string} [message] Optional message to include in the error if the
 * assertion fails.
 * @throws {Error} If the assertion fails, an error is thrown with the provided
 * message or a default message.
 */
export function assert(value: boolean, message?: string): asserts value {
    if (!value) {
        throw new Error(message ?? "Assertion failed");
    }
}
