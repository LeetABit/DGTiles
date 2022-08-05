# ADR-3 Client-only approach

## Status
Accepted

## Context
Storing and protecting user's data on backend servers is not what we want to do right now. In addition client-only application is far more transparent.

## Decision
DGTiles will follow client-only approach for now. Hosting environment will serve the application static content only without any additional communication
between browser and the server.

## Consequences
Workspace sharing will be available only as an encoded configuration string.
All previous ADRs that requires active communication to the server should be considered as postponed.

## Known Alternatives
None
