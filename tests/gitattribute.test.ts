import { expect, test } from 'vitest'
import { execSync } from 'child_process';
import editorconfig, { ParseOptions } from 'editorconfig';
import * as fs from 'fs/promises';

// TODO: tests
test('all files in repository are covered by .editorconfig', async () => {
    const options : ParseOptions = {
        // config?: string;
        // version?: string;
        // root?: string;
         files: [],
        // cache?: Cache;
        // unset?: boolean;
    };
    //const config = await editorconfig.parse('.editorconfig', options);
    const config = await editorconfig.parse('a.png', options);
    const data = await fs.readFile('./.editorconfig');
    const matcher = editorconfig.matcher(options, data);
    const match = matcher('.editorconfig');
    console.log(match);
});

// test('adds 1 + 2 to equal 3', () => {
//     const getFileExtensions = () => {
//         const output = execSync('git ls-files').toString();
//         const files = output.split('\n').filter(file => file);
//         const extensions = new Set(files.map(file => file.split('.').pop()).filter(ext => ext !== file));
//         return Array.from(extensions);
//     };

//     const getEditorConfigExtensions = () => {
//         const output = execSync('cat .editorconfig').toString();
//         const lines = output.split('\n').filter(line => line.trim().startsWith('[') && line.includes('.'));
//         const extensions = new Set(lines.map(line => line.match(/\.\w+/)?.[0]?.substring(1)).filter(Boolean));
//         return Array.from(extensions);
//     };

//     const getGitAttributesExtensions = () => {
//         const output = execSync('cat .gitattributes').toString();
//         const lines = output.split('\n').filter(line => line.trim() && !line.startsWith('#'));
//         const extensions = new Set(lines.map(line => line.split(' ')[0].split('.').pop()).filter(ext => ext && ext !== '*'));
//         return Array.from(extensions);
//     };

//     const gitAttributesExtensions = getGitAttributesExtensions();
//     console.log(gitAttributesExtensions);

//     const editorConfigExtensions = getEditorConfigExtensions();
//     console.log(editorConfigExtensions);

//     const sum = (a: number, b: number) => a + b;

//     const extensions = getFileExtensions();
//     console.log(extensions);
//     expect(sum(1, 2)).toBe(3)
// })
