const pluginsBaseArray = ['@typescript-eslint'];
const extendsBaseArray = [
  'eslint:recommended',
  'plugin:@typescript-eslint/recommended',
  'plugin:@typescript-eslint/recommended-requiring-type-checking',
  'plugin:react/recommended',
  'plugin:storybook/recommended',
];
const rulesBaseObject = {
  // https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint
  'react/jsx-uses-react': 'off',
  'react/react-in-jsx-scope': 'off',
};

module.exports = {
  root: true,
  plugins: [...pluginsBaseArray],
  env: {
    node: true,
    browser: true,
    es2022: true, // this sets the parserOptions.ecmaVersion option automagically
  },
  parser: '@typescript-eslint/parser',
  extends: [...extendsBaseArray, 'plugin:prettier/recommended'],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      // no need for jsx flag. See https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser#parseroptionsecmafeaturesjsx
    },
    project: ['./tsconfig.eslint.json'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: { ...rulesBaseObject },
  ignorePatterns: [
    'dist',
    'coverage',
    'docs',
    'storybook-static-build',
    'i18n/locales',
  ],
  overrides: [
    // test files
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      plugins: [...pluginsBaseArray, 'testing-library', 'jest'],
      extends: [
        ...extendsBaseArray,
        'plugin:jest/recommended',
        'plugin:testing-library/react',
        'plugin:prettier/recommended',
      ],
      env: {
        'jest/globals': true,
      },
      rules: { ...rulesBaseObject },
    },
  ],
};
