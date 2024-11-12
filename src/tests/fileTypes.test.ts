import { getCommittedFiles } from 'src/../scripts/common/git.mjs';
import GitAttributes from 'git-attributes';
import { Minimatch } from 'minimatch';
import * as editorconfig from 'editorconfig';

const options = { dot: true };

const gitAttributes = new GitAttributes();
gitAttributes.parseAttributesForRepo('.');
const gitAttributeRules = gitAttributes.rules.map(rule => new Minimatch(rule.pattern.startsWith('/') ? rule.pattern : `**/${rule.pattern}`, options));
const files: string[] = getCommittedFiles();
const cache = new Map<string, editorconfig.ProcessedFileConfig>();

describe('.gitattributes file', () => {
    files.forEach(file => {
        it(`should handle '${file}'`, () => {
            const attributeMatches = gitAttributeRules.filter(rule => rule.match(file)).length;
            expect(attributeMatches).toBeGreaterThan(1);
        });
    });
});

describe('.editorconfig file', () => {
    files.forEach(file => {
        it(`should handle '${file}'`, async () => {
            const editorMatches: editorconfig.Visited[] = []
            await editorconfig.parse(file, { files: editorMatches, cache });
            expect(editorMatches.length).toBeGreaterThan(0);
        });
    });
});
