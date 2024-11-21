//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

// TODO: relative path

import { expect, test } from 'vitest';
import editorconfig, { ParseOptions } from 'editorconfig';
import { getRepositoryFilesAsync } from './utils.mts';

test("All files in repository are covered by '.editorconfig'.", async () => {
    const files = await getRepositoryFilesAsync();
    for (const file of files) {
        const options : ParseOptions = {
             files: [],
        };
        await editorconfig.parse(file, options);
        expect(options.files?.length, `File '${file}' is not included in .editorconfig file.`).toBeGreaterThan(0);
    }
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
