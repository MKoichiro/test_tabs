// @ts-check

import eslint from '@eslint/js';
import globals from 'globals';
// typescript
import tsEslint from 'typescript-eslint';
// react
import react from 'eslint-plugin-react';
// eslintとprettierの競合を解消するためのConfig
import eslintConfigPrettier from 'eslint-config-prettier'; // https://github.com/prettier/eslint-config-prettier?tab=readme-ov-file#installation

// エラーを誤報するため、eslint-disableを使用しています。
/* eslint-disable no-unused-vars */
import { Linter } from 'eslint';
// import { FlatConfig } from "./node_modules/@typescript-eslint/utils/dist/ts-eslint/Config"; // とか書ける気がするが、エラーが出るのでコメントアウト
/* eslint-enable no-unused-vars */

// 共通設定
/** @type { Linter.FlatConfig } */
const ignoreConfig = {
    ignores: ['test_code/*.js', 'test_code/*.jsx', 'test_code/*.ts', 'test_code/*.tsx'],
};
/** @type { Linter.FlatConfig } */
const commonConfig = {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: {
            ...globals.browser,
            ...globals.node,
        },
        parserOptions: {
            ecmaVersion: 'latest',
            // sourceType: "module",
        },
    },
    rules: {
        'no-console': ['warn', { allow: ['warn', 'error'] }], // console.error()は許可
        'no-unused-vars': 'warn',
        'no-undef': 'warn',
    },
};

// tsファイル固有の設定
/** @type { import("@typescript-eslint/utils/dist/ts-eslint/Config").FlatConfig.ConfigArray } */
const tsConfig = tsEslint.config(
    {
        // [automatic settings]
        // files: ['**/*.ts', '**/*.tsx'],
        // extends: [
        //   eslint.configs.recommended,      // 素のeslintのrecommended設定を追加
        //   ...tsEslint.configs.recommended, // typescript-eslintのrecommended設定を追加
        // ],
        // rules: {
        //   some rules here
        // }

        // [manual settings]
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            '@typescript-eslint': tsEslint.plugin,
        },
        languageOptions: {
            parser: tsEslint.parser,
            parserOptions: {
                project: './tsconfig.json', // trueはrootから近いtsconfig.jsonを参照。tsconfig.jsonが複数ある場合には、明示的に指定しておく。
            },
        },
        rules: {
            'no-console': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
        },
    },

    // disable type-aware linting on JS files
    {
        files: ['**/*.js'],
        ...tsEslint.configs.disableTypeChecked,
    }
);

/** @type { Linter.FlatConfig } */
const reactConfig = {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
        react,
    },
    languageOptions: {
        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
        globals: {
            ...globals.browser,
        },
    },
    rules: {
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'react/no-unused-state': 'warn',
    },
    // ... others are omitted for brevity
};

export default [
    eslint.configs.recommended,
    commonConfig,
    reactConfig,
    ...tsConfig,
    eslintConfigPrettier, // overrideしたいので必ず最後に書く
    ignoreConfig,
];
