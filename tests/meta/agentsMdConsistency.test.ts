//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { access, readFile } from "fs/promises";
import { describe, expect, test } from "vitest";
import { getNodeVersionAsync } from "#/scripts/common/workflow";
import { parseDomainFromReadme } from "#/scripts/common/readme";

interface PackageJson {
    name: string;
    packageManager: string;
    scripts: Record<string, string>;
}

const AGENTS_PATH = "AGENTS.md";
const PACKAGE_JSON_PATH = "package.json";
const CI_WORKFLOW_PATH = ".github/workflows/CI_CD.yaml";
const VITE_CONFIG_PATH = "vite.config.ts";
const TSCONFIG_PATH = "tsconfig.json";
const README_DOC_PATH = "docs/README.md";

describe("AGENTS.md consistency", () => {
    test("references core project identity from package.json and docs", async () => {
        const [agentsMd, packageJsonRaw, docsReadme] = await Promise.all([
            readFile(AGENTS_PATH, "utf8"),
            readFile(PACKAGE_JSON_PATH, "utf8"),
            readFile(README_DOC_PATH, "utf8"),
        ]);
        const packageJson = JSON.parse(packageJsonRaw) as PackageJson;
        const domain = parseDomainFromReadme(docsReadme);

        expect(agentsMd).toContain(
            `Agent operating guide for \`${packageJson.name}\`.`,
        );
        expect(agentsMd).toContain(`\`${domain}\``);
        expect(packageJson.packageManager.startsWith("pnpm@")).toBe(true);
        expect(agentsMd).toContain("Package manager: `pnpm` only.");
    });

    test("pins Node runtime in AGENTS.md to CI workflow version", async () => {
        const agentsMd = await readFile(AGENTS_PATH, "utf8");
        const nodeVersion = await getNodeVersionAsync();

        expect(agentsMd).toContain(
            `Use Node.js \`24.x\` (CI uses \`${nodeVersion}\`).`,
        );
    });

    test("documents commands that exist in package.json scripts", async () => {
        const [agentsMd, packageJsonRaw] = await Promise.all([
            readFile(AGENTS_PATH, "utf8"),
            readFile(PACKAGE_JSON_PATH, "utf8"),
        ]);
        const packageJson = JSON.parse(packageJsonRaw) as PackageJson;

        const pnpmCommandsInAgents = Array.from(
            agentsMd.matchAll(/`pnpm\s+(?<scriptName>[^`\s]+)/gu),
        ).map((match) => match.groups?.["scriptName"] ?? "");

        for (const scriptName of pnpmCommandsInAgents) {
            expect(
                packageJson.scripts[scriptName],
                `Script "pnpm ${scriptName}" mentioned in AGENTS.md must exist in package.json`,
            ).toBeDefined();
        }
    });

    test("keeps CI and release references aligned with workflow and scripts", async () => {
        const [agentsMd, ciWorkflow] = await Promise.all([
            readFile(AGENTS_PATH, "utf8"),
            readFile(CI_WORKFLOW_PATH, "utf8"),
        ]);

        await Promise.all([
            access("scripts/createNewVersionTag.ts"),
            access("scripts/pushLatestTags.ts"),
        ]);

        expect(agentsMd).toContain(".github/workflows/CI_CD.yaml");
        expect(ciWorkflow).toContain("run: pnpm verify");
        expect(ciWorkflow).toContain("path: dist/");
        expect(agentsMd).toContain("`pnpm verify`");
        expect(agentsMd).toContain("`dist/`");
        expect(ciWorkflow).toContain("./scripts/createNewVersionTag.ts");
        expect(ciWorkflow).toContain("./scripts/pushLatestTags.ts");
        expect(agentsMd).toContain("`scripts/createNewVersionTag.ts`");
        expect(agentsMd).toContain("`scripts/pushLatestTags.ts`");
    });

    test("matches Vite host/port and path aliases", async () => {
        const [agentsMd, viteConfig, tsconfigRaw] = await Promise.all([
            readFile(AGENTS_PATH, "utf8"),
            readFile(VITE_CONFIG_PATH, "utf8"),
            readFile(TSCONFIG_PATH, "utf8"),
        ]);
        const tsconfig = JSON.parse(tsconfigRaw) as {
            compilerOptions: { paths: Record<string, string[]> };
        };

        expect(viteConfig).toContain('host: "0.0.0.0"');
        expect(viteConfig).toContain("port: 5000");
        expect(agentsMd).toContain("(host `0.0.0.0`, port `5000`)");
        expect(tsconfig.compilerOptions.paths["@/*"]).toBeDefined();
        expect(tsconfig.compilerOptions.paths["#/*"]).toBeDefined();
        expect(agentsMd).toContain("`@/` for `src/*`");
        expect(agentsMd).toContain("`#/` for repository root imports");
    });
});
