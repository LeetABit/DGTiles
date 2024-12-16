# ADR-5 Changelog generation

## Status

Accepted

## Context

Automatic version bump based on commit messages also simplifies changelog generation.

## Decision

After a new version is calculated all the contributing changes are already reviewed. This information may be included in the tag message.
During production build git command `git tag -n9` may be used to quickly retrieve entire history of the version increments to generate changelog page.
If a single commit is used as a release source commit message will be used automatically by `git tag -n9` command.

## Consequences

Version history will be stored only in one place - commit message. When a more complex changelog entry shall be used a tag message may be used.

## Known Alternatives

Manual changelog modifications. Additional commit for version bump and changelog modification.
