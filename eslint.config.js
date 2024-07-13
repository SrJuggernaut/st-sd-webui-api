import eslintJs from '@eslint/js'
import stylisticEslint from '@stylistic/eslint-plugin'
import globals from 'globals'

export default [
  eslintJs.configs.recommended,
  stylisticEslint.configs.customize({
    indent: 2,
    braceStyle: '1tbs',
    commaDangle: 'never',
    arrowParens: 'allways'
  }),
  {
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  }
]
