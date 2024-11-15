// import type {Config} from 'jest';

// const config: Config = {
//     verbose: true,
//     preset: 'ts-jest/presets/js-with-ts',
//     transform: { '^.+\\.tsx?$': 'ts-jest' },
//     clearMocks: true,
//     collectCoverage: true,
//     coverageDirectory: "coverage",
//     moduleFileExtensions: [
//         "ts",
//         "tsx",
//         "js",
//         "jsx",
//         "json",
//         "node"
//     ],
//     transformIgnorePatterns : []
//   };

// export default config;


export default {

    preset: 'ts-jest/presets/js-with-ts',
    transform: { '^.+\\.tsx?$': 'ts-jest' },
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    moduleDirectories: ['node_modules', '<rootDir>'],
    moduleNameMapper: {
        '^raw.macro$': '<rootDir>/node_modules/raw.macro/dist/raw.macro.js',
        '\\.macro$': '<rootDir>/node_modules/babel-plugin-macros/dist/index.js',
      },
      globals: {
        'ts-jest': {
          babelConfig: '.babelrc',
        },
      },
    // alias: {
    //     'raw.macro': require.resolve('./index.js'),
    //   },
    transformIgnorePatterns : [],
  }

