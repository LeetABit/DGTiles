//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { render } from "@testing-library/react";
import { Grid } from "#/src/components/Grid";

describe("Grid", () => {
    it("renders a div by default", () => {
        const { container } = render(
            <Grid rows={["1fr"]} columns={["1fr"]}>
                <span>Child</span>
            </Grid>
        );
        expect(container.querySelector("div")).toBeTruthy();
        expect(container.textContent).toContain("Child");
    });

    it("applies grid templates for rows and columns", () => {
        const { container } = render(
            <Grid rows={["100px", "auto"]} columns={["1fr", "2fr"]}>
                <span>Test</span>
            </Grid>
        );
        const gridDiv = container.querySelector("div");
        expect(gridDiv).toHaveStyle("display: grid");
        expect(gridDiv).toHaveStyle("grid-template-columns: 1fr 2fr");
        expect(gridDiv).toHaveStyle("grid-template-rows: 100px auto");
    });

    it("renders custom container element", () => {
        const { container } = render(
            <Grid
                rows={["1fr"]}
                columns={["1fr"]}
                container={<section data-testid="custom-container" />}
            >
                <span>Custom</span>
            </Grid>
        );
        expect(container.querySelector("section")).toBeTruthy();
        expect(container.querySelector("[data-testid='custom-container']")).toBeTruthy();
    });

    it("merges custom styles", () => {
        const { container } = render(
            <Grid
                rows={["1fr"]}
                columns={["1fr"]}
                style={{ backgroundColor: "rgb(255, 0, 0)" }}
            >
                <span>Styled</span>
            </Grid>
        );
        const gridDiv = container.querySelector("div");
        expect(gridDiv).toHaveStyle("grid-template-columns: 1fr");
        expect(gridDiv).toHaveStyle("grid-template-rows: 1fr");
        expect(gridDiv).toHaveStyle("background-color: rgb(255, 0, 0)");
    });

    it("renders children correctly", () => {
        const { getByText } = render(
            <Grid rows={["1fr"]} columns={["1fr"]}>
                <span>Child 1</span>
                <span>Child 2</span>
            </Grid>
        );
        expect(getByText("Child 1")).toBeInTheDocument();
        expect(getByText("Child 2")).toBeInTheDocument();
    });
});
