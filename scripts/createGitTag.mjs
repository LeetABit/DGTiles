import extractGitVersion from './extractGitVersion.mjs';

export default async function createGitTag(github, context) {
    const gitVersion = await extractGitVersion();

    const tagRef = `refs/tags/v${gitVersion.major}.${gitVersion.minor}.${gitVersion.patch}`;
    await github.rest.git.createRef({
        owner: context.repo.owner,
        repo: context.repo.repo,
        ref: tagRef,
        sha: context.sha,
    });
}
