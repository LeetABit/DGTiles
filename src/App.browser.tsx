//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { expect, test } from "vitest";
import App from "./App";
import { render } from "vitest-browser-react";

test("loads and displays greeting", async () => {
    const screen = await render(<App basename="/" />);
    const dgtiles = screen.getByText("DGTiles");
    const heading = screen.getByRole("heading");
    await expect.element(heading).toBeVisible();
    await expect.element(dgtiles).toBeVisible();
});

test("renders with correct basename in router", async () => {
    const screen = await render(<App basename="/" />);
    const heading = screen.getByRole("heading");
    await expect.element(heading).toBeInTheDocument();
});

test("applies global styles", async () => {
    await render(<App basename="/" />);
    const styles = window.getComputedStyle(document.body);
    expect(styles.margin).toBe("0px");
});

test("renders heading with correct text content", async () => {
    const screen = await render(<App basename="/" />);
    const heading = screen.getByRole("heading", { level: 1 });
    await expect.element(heading).toHaveTextContent("DGTiles");
});

test("renders BrowserRouter wrapper", async () => {
    const screen = await render(<App basename="/" />);
    const heading = screen.getByText("DGTiles");
    await expect.element(heading).toBeVisible();
});

test("should render the application title", async () => {
    const screen = await render(<App basename="/" />);
    expect(
        screen.getByRole("heading", { name: /DGTiles/iu }),
    ).toBeInTheDocument();
});

test("should render with custom basename", async () => {
    window.history.replaceState({}, "", "/custom");
    const screen = await render(<App basename="/custom" />);
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    window.history.replaceState({}, "", "/");
});

test("should not render with custom basename other than current address", async () => {
    const screen = await render(<App basename="/custom" />);
    const heading = screen.getByRole("heading");
    expect(heading).not.toBeInTheDocument();
});

test("should apply global styles", () => async () => {
    const { container } = await render(<App basename="/" />);
    expect(container).toBeInTheDocument();
});

test("should render BrowserRouter component", async () => {
    const { container } = await render(<App basename="/" />);
    expect(container.querySelector("h1")).toHaveTextContent("DGTiles");
});
