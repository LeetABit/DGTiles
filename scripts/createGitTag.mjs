import extractGitVersion from './extractGitVersion.mjs';

export default async function createGitTag(github, context) {
    const gitVersion = await extractGitVersion();

    const tag = `tags/v${gitVersion.major}.${gitVersion.minor}.${gitVersion.patch}`;
    const tagRef = `refs/${tag}`;

    const existingTag = await github.rest.git.getRef({
        owner: context.repo.owner,
        repo: context.repo.repo,
        ref: tag,
    });

    if (existingTag.status === 200) {
        await github.rest.git.createRef({
            owner: context.repo.owner,
            repo: context.repo.repo,
            ref: tagRef,
            sha: context.sha,
        });
    }
}
