module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:promise/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: { react: { version: 'detect' } },
  plugins: ['react-refresh', 'react', 'promise'],
  overrides: [
    {
      files: ['**/*.jsx'],
      rules: {
        'prettier/prettier': 'error',
        'react/prop-types': 'off'
      }
    }
  ],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'promise/always-return': ['warn'],
    'promise/catch-or-return': ['warn'],
    'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],
    'react/display-name': 'off',
    'react/jsx-curly-spacing': ['off'],
    'promise/no-promise-in-callback': 'off',
    'max-len': [
      'warn',
      {
        code: 120,
        ignoreTemplateLiterals: true,
        ignoreStrings: true
      }
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ]
  }
}
