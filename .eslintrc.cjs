module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'react-hooks', 'tailwindcss', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'react/no-unescaped-entities': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/enforces-shorthand': 'off'
  },
  settings: {
    react: {
      version: '18.3'
    },
    next: {
      rootDir: '.'
    }
  },
  ignorePatterns: ['node_modules/', '.next/', 'out/', 'sanity/']
};