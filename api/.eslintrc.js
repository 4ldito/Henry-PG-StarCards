module.exports = {
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 2017
  },
  extends: [
    './node_modules/ts-standard/eslintrc.json'
  ],
  rules: {
    '@typescript-eslint/no-var-requires': 0
  }
  // ...
}
