module.exports = {
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 2015
  },
  extends: [
    './node_modules/ts-standard/eslintrc.json'
  ],
  rules: {
    '@typescript-eslint/no-var-requires': 0
  }
  // ...
}
