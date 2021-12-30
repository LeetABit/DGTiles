# ADR-1 Workspace Identification

## Status
Accepted

## Context
Website should have an option to customize set of tools to better suite the needs of the users. The user shall be able to share the setup
with other users to let them use it, modify it without modifying original setup or to merge it with their's original setup.

## Decision
Each setup is represented by an object which describes the state of the tools selected by the user. This object may be serialized to JSON which
later may be compressed to a compact form. This compact form will be called "Setup ID" (SID). Anyone with an access to such SID may use it to
reconstruct the Setup in the website. The SID may be shared with other users to make the Setup available to them. The website shall be able to
consume the SID to merge the Setup with the current Setup using additional settings that are outside of this document scope. Definition of the
SID implies that any modification to the tools Setup produces different SID.

## Consequences
Implementation of this identification is given almost for free as the serialized state has to be handled by the front-end anyway.
The drawback is that the SID ma get arbitrary large with the increasing size of the tools used in the workspace.
Also when the setup will include initial data specified by the original user, the SID may also include the data. Consequently any data that the user
might not want to share.

## Known Alternatives
would be to assign a SID to a Setup on demand (share button) and associate the State to the SID in database.
