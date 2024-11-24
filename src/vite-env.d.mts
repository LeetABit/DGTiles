//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

/// <reference types="vite/client" />
/// <reference types="node" />

declare module 'eslint-plugin-react-hooks' {
	import type { ESLint } from 'eslint';
	declare const plugin: Omit<ESLint.Plugin, 'configs'> & {
		configs: Record<string, ESLint.ConfigData>;
	};
	export default plugin;
}
