// off or 0: 关闭(禁用)规则
// warn or 1: 将规则视为一个警告
// error or 2: 将规则视为一个错误
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // Disallow use of Object.prototypes builtins directly
    "no-prototype-builtins": 0,
    // Require or disallow a space before function parenthesis
    'space-before-function-paren': [2, 'never'],
    'no-console': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
