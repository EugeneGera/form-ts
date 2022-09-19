module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['import', '@typescript-eslint', '@typescript-eslint/tslint', 'react'],
    extends: ['plugin:@typescript-eslint/recommended', 'react-app', 'plugin:prettier/recommended'],
    root: true,
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/interface-name-prefix': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-explicit-any': "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        '@typescript-eslint/tslint/config': [
            'error',
            {
                rules: {
                    'ordered-imports': [
                        true,
                        {
                            'module-source-path': 'full',
                            'grouped-imports': true,
                            'import-sources-order': 'lowercase-first',
                            groups: [
                                {
                                    match: '^core-js/stable',
                                    order: 1,
                                },
                                {
                                    match: '^react',
                                    order: 2,
                                },
                                {
                                    name: 'Root',
                                    match: '^@src/',
                                    order: 20,
                                },
                                {
                                    name: 'Assets',
                                    match: '^@assets/',
                                    order: 60,
                                },
                                {
                                    name: 'Parent directory',
                                    match: '^[.][.]',
                                    order: 80,
                                },
                                {
                                    name: 'Current directory',
                                    match: '^[.]',
                                    order: 90,
                                },
                                {
                                    name: 'Vendors & Packages',
                                    match: '^[^\\.]',
                                    order: 10,
                                },
                            ],
                        },
                    ],
                },
            },
        ],
        'import/no-default-export': 'warn',
        'react/self-closing-comp': 'warn',
        'jsx-a11y/anchor-is-valid': 0,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
