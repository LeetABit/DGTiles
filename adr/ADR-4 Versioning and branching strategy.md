# ADR-4 Versioning and branching strategy

## Status
Accepted

## Context
Automatic version bump simplifies version management and build system considerably. Aligned with a fitting branching strategy makes a very useful development tool.

## Decision
Project should follow fast-to-production approach with very limited and incremental changes. Because of that the **main** branch should reflect version that is deployed
or is about to be deployed to production environment. A small portion of changes may be committed directly to **main** branch after necessary QA. Larger changes should be
handled by Pull Request mechanism that make use of additional environments offered by Azure Static Web App resource. As each commit on a **main** branch is being deployed
to the production the version assigned to this commit should be incremented. This will be handled by calculate-version node script that will increment the version based on
the commit messages. If the commit contains **Breaking** prefix the version is being bumped on major number. **Feature** prefix bumps minor version number. All other messages
bump patch number.

## Consequences
There is no active development branch. Default branch for the repository contains production-ready version of the website. Any pushes to this branch triggers production
deployment. Any larger changes that involve more than single developer shall be handled by short-lived branch create for the changes. Each commit on a **main** branch is
being decorated by the git tag that remarks the version calculated and assigned to this commit. This approach produces very large number of commit tags in git. Each build
requires full repository clone to calculate version correctly.

## Known Alternatives
Git flow, GitHub flow. Calculate version without extensive version tags.
