import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // Without `eslint-plugin-react`, JSX usage like `<motion.div>` or `<Icon />`
      // doesn't count as "using" the imported/destructured name. Allow:
      //   - vars starting with capital letter or underscore  (React components, constants)
      //   - vars literally named `motion` (framer-motion JSX namespace)
      //   - args starting with `_` (intentionally unused) or capital letter (destructured Icons)
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^(motion|[A-Z_])',
          argsIgnorePattern: '^(_|[A-Z])',
        },
      ],
    },
  },
])
