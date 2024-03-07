module.exports = {
  root: true,
  env: {
    browser: true,
  },
  parser: 'vue-eslint-parser',
  /* 继承已有的规则 */
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    '@vue/prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'vue/multi-word-component-names': 'off',
    eqeqeq: ['off'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // Vue: Add extra rules
    'vue/custom-event-name-casing': [2, 'camelCase'],
    'vue/no-v-text': 1,
    'vue/padding-line-between-blocks': 1,
    'vue/require-direct-export': 1,
  },
}
