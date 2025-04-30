# Publishing

This document describes the steps and processes for publishing changes to the
project. It covers the pull request workflow, the commit verification process
before merging, the logic for calculating the new product version, and how it
impacts git tags.

## Pull Requests

Contributors should create a pull request (PR) from their feature or bugfix
branch to the main branch. The PR should include a clear description of the
changes, the purpose of the PR, and any relevant issue references. Contributors
are encouraged to use the **Pull Request Template** provided in the repository
to ensure all necessary details are included.

## Build verification

Before merging, the pull request must pass all automated checks, including:

- Linting
- Unit and integration tests
- Build verification

## Code Review

The pull request must be reviewed by at least one other contributor. Reviewers
will check the code for correctness, adherence to coding standards, and
potential issues.

## Merge

Once approved and verified, the pull request will be **rebased and merged**.
This ensures that all commits in the pull request are combined into a single
commit, maintaining a **linear history** in the main branch and avoiding merge
commits. After merging, the main branch will automatically trigger workflows
such as version bumping, tag creation, and deployment.

## Version bump

The version bump process is handled automatically in the CI/CD pipeline. The
logic for calculating the new version is following:

1. The next version is determined based on commit message prefixes (e.g.,
   `Major:`, `Minor:`).
2. A local Git tag is created (e.g., `v0.6.24`) using the calculated version.
3. The tag is pushed to the repository.

## Deployment

The deployment process is triggered as a last step. It consist of the following
tasks:

1. The production build is created using `yarn build` with information about
   incremented version.
2. The build artifacts are uploaded using the `actions/upload-pages-artifact`
   action.
3. The `actions/deploy-pages` action is used to deploy the application to GitHub
   Pages.
