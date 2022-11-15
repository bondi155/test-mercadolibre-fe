module.exports = {
    env: {
        browser: true, // Browser global variables like `window` etc.
        commonjs: true, // CommonJS global variables and CommonJS scoping.Allows require, exports and module.
        es6: true, // Enable all ECMAScript 6 features except for modules.
        jest: true, // Jest global variables like `it` etc.
        node: true // Defines things like process.env when generating through node
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jest/recommended',
        'plugin:testing-library/react',
        'prettier'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        parser: '@babel/eslint-parser', // Uses babel-eslint transforms.// <== ADD THIS
        requireConfigFile: false, 
        sourceType: 'module' // Allows for the use of imports
    },
    plugins: [
        'import', // eslint-plugin-import plugin. https://www.npmjs.com/package/eslint-plugin-import
        'sort-keys',
        'prettier'
    ],
    root: true, // For configuration cascading.
    rules: {
        'import/order': [
            'warn',
            {
                alphabetize: {
                    caseInsensitive: true,
                    order: 'asc'
                },
                groups: [
                    'builtin',
                    'external',
                    'index',
                    'sibling',
                    'parent',
                    'internal'
                ]
            }
        ],
        'no-console': 'warn',
        'no-duplicate-imports': 'warn',
        'no-restricted-imports': [
            'error',
        ],
        'no-unused-vars': 'warn',
        quotes: [
            'warn',
            'single',
            {'allowTemplateLiterals': false, 'avoidEscape': true}
        ],
        'react/jsx-filename-extension': [
            'error',
            {
                extensions: [
                    '.js',
                    '.jsx',
                    '.ts',
                    '.tsx'
                ]
            }
        ],
        'react/prop-types': 'warn',

        'sort-imports': [
            'warn',
            {
                ignoreCase: false,
                ignoreDeclarationSort: true,
                ignoreMemberSort: false
            }
        ],
        'sort-keys': 0 , 
        'sort-keys/sort-keys-fix': 1,
    },
    settings: {
        react: {
            version: 'detect' // Detect react version
        }
    }
};