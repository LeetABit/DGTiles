# ADR-2 SID-less Workspace Identification

## Status
Accepted

## Context
Workspace identification using SID delegates storage of the SID to the end-user. When the user lost access to the SID the access to the tools setup is also lost.

## Decision
Instead of creating a new token (SID) to manage website Setup we can use existing identification which comes from OpenID Connect (OIDC). Using Azure B2C Tenant
the website may deliver unified gateway to various social Identity Providers (Google, Facebook). To get rid of any personal information the gateway will
create a new OIDC Subject - a hash created from Identity Provider's name and its Subject value that the provider has assigned to the user. Then Azure B2C Gateway
will use this Subject in a newly emitted ID Token. That way we can use the ID Token in a communication with the back-end server as a session ID. Back-end server
then may verify whether the ID Token is valid and use its Subject as a key for accessing website Setup stored in database.

## Consequences
Using this method enables to use external Social Identity Providers without storing user's personal information and allows them to uniquely and safely identify
their identity used to access their's workspace setup.
The usage of ID Token as a Session ID makes use of it even after the token has expired. It means that stolen session ID may be reused even after ID Token expiration.
A better approach would be to force user to re-login with theirs Social Identity Provider after token expiration.

## Known Alternatives
There is a possibility to allow end-user to create its account using randomly generated ID and a password which he can manage using password manager.
The approach described above is far better as it does not require additional credential to be managed by the end-user and makes possible to use
advanced authentication features to be used by the identity providers which are specialized in that mater.
