//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { expect, test } from "vitest";

test("entire document should be accessible", () => {
    expect(document.documentElement).not.toBeNull();
});

test("document should have a title", () => {
    expect(document.title).toBeTruthy();
});

test("document should have a body element", () => {
    expect(document.body).not.toBeNull();
    expect(document.body.tagName).toBe("BODY");
});

test("document should have a head element", () => {
    expect(document.head).not.toBeNull();
    expect(document.head.tagName).toBe("HEAD");
});

test("window object should be defined", () => {
    expect(window).toBeDefined();
});

test("viewport should have dimensions", () => {
    expect(window.innerWidth).toBeGreaterThan(0);
    expect(window.innerHeight).toBeGreaterThan(0);
});

test("document should be in ready state", () => {
    expect(["loading", "interactive", "complete"]).toContain(
        document.readyState,
    );
});

test("localStorage should be accessible", () => {
    expect(() => localStorage.getItem("test")).not.toThrow();
});

test("sessionStorage should be accessible", () => {
    expect(() => sessionStorage.getItem("test")).not.toThrow();
});

test("console methods should be available", () => {
    expect(console.log).toBeDefined();
    expect(console.error).toBeDefined();
    expect(console.warn).toBeDefined();
});
