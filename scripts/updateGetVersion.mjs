#!/usr/bin/env node

import * as util from 'util';
import * as fs from 'fs';
import getGitVersion from './calculateGitVersion.mjs'

const writeFileAsync = util.promisify(fs.writeFile);

const path = fs.existsSync('./src') ? './src/gitVersion.json' : './gitVersion.json';
const version = await getGitVersion();
writeFileAsync(path, JSON.stringify(version, null, 2));
