# AGENTS.md

Agent operating guide for `leetabit.dgtiles`.

## Project Overview

- Browser-only React + TypeScript application built with Vite.
- Purpose: power the `dgtiles.com` website as a customizable online toolset.
- Deployment target: GitHub Pages (CI workflow in
  `.github/workflows/CI_CD.yaml`).
- Package manager: `pnpm` only.

## Environment Setup

- Use Node.js `24.x` (CI uses `24.8.0`).
- Install dependencies with:

```bash
pnpm install --frozen-lockfile
```

- Install Playwright browsers before running E2E tests:

```bash
pnpm exec playwright install
```

- Execute shell commands using PowerShell

## High-Signal Commands

- Start development server: `pnpm dev` (host `0.0.0.0`, port `5000`).
- Preview production build: `pnpm preview` (host `0.0.0.0`, port `5000`).
- Build: `pnpm build`.
- Full CI-equivalent verification: `pnpm verify`.
- Auto-fix workflow (format/lint + checks): `pnpm fix`.

## Testing Instructions

- Test files should not contain helper functions to not clutter test files.
- Helper functions should be generalized and put in `scripts` folder with theirs
  own tests.
- Unit/integration/browser tests (Vitest):

```bash
pnpm test
```

- E2E tests (Playwright):

```bash
pnpm e2e:break
```

- Performance checks (Lighthouse CI):

```bash
pnpm perf
```

- Focus a specific test name when iterating:

```bash
pnpm vitest run -t "<test name>"
```

- Run CI-level gate before finalizing any non-trivial change:

```bash
pnpm verify
```

## Code Style And Conventions

- Never use comments for silencing warnings.
- Language: TypeScript (strict checks enabled via project `tsconfig`
  references).
- Formatting and linting are mandatory:
  - Typecheck: `pnpm type:break`
  - Format check: `pnpm style:break`
  - Lint check: `pnpm lint:break`
  - Spelling check: `pnpm spell:break`
- Respect `.editorconfig`:
  - Markdown/JSON/YAML/HTML: 2 spaces.
  - TypeScript/TSX: 4 spaces.
  - Line endings: LF.
- Use path aliases consistently:
  - `@/` for `src/*`
  - `#/` for repository root imports

## Repository Structure (For Agents)

- App source: `src/`
- Shared UI/components: `src/components/`
- Styles: `src/styles/`
- Service worker source: `src/sw/`
- Script utilities and script tests: `scripts/`
- Browser/meta/playwright tests: `tests/`
- Documentation and architecture decisions: `docs/`, `docs/adr/`
- Generated artifacts and reports: `results/` (do not treat as source of truth)

## Change Rules

- Keep changes minimal and targeted to the user request.
- Do not perform unrelated refactors.
- Update or add tests when behavior changes.
- If you modify build/test/lint behavior, ensure related docs and scripts stay
  consistent.
- Preserve license headers in files that already include them.
- Project is using strict code style rules for all files, even TS configuration
  files and test files. If you change any source file make sure that it follows
  coding standards.

## CI And Release Awareness

- Main branch CI runs `pnpm verify` and deploys from `dist/`.
- CI also runs project tagging scripts from `scripts/createNewVersionTag.ts` and
  `scripts/pushLatestTags.ts` on push events.
- Avoid introducing changes that depend on unpinned dependency versions.

## Security And Responsible Handling

- Never commit secrets, credentials, or private keys.
- Treat all external input as untrusted; prefer explicit validation and safe
  defaults.

## Pull Request Guidance

- You may not create PRs. All changes are expected to be done locally
  and committed by the user.

## Agent Precedence Notes

- This root `AGENTS.md` applies repository-wide.
- If nested `AGENTS.md` files are introduced later, the nearest one to the
  edited file should take precedence.
