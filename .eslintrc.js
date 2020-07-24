// The base ESLint configuration for all Quin TypeScript projects
//
// *NOTE* For the best developer experience please configure your VSCode
// to automatically use ESLint fix feature on file save:
//
// "eslint.autoFixOnSave":  true,
// "eslint.validate":  [
//   "javascript",
//   "javascriptreact",
//   {"language":  "typescript",  "autoFix":  true  },
//   {"language":  "typescriptreact",  "autoFix":  true  }
// ],

module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],
  plugins: ['eslint-plugin-simple-import-sort'],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true
    }
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        // And as mentioned here this rule will freak out on .js files as well
        // https://github.com/typescript-eslint/typescript-eslint/issues/906
        //
        // So we disable it for .js files using overrides
        '@typescript-eslint/explicit-function-return-type': 0,

        // And the same goes for member accessibility
        //
        // See https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-member-accessibility.md
        '@typescript-eslint/explicit-member-accessibility': 0,

        // And last but not least require() calls are enabled in js files
        '@typescript-eslint/no-var-requires': 0
      }
    }
  ],
  rules: {
    // Place to put our Quin-specific rules

    // Prevent forgotten console.* statements

    'react/prop-types': 0,

    'simple-import-sort/sort': 'error',

    '@typescript-eslint/no-use-before-define': [2, { variables: false }],

    '@typescript-eslint/explicit-function-return-type': 0
  },
  settings: {
    react: {
      version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
      }
    }
  }
};
