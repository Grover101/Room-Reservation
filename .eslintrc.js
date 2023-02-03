module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        node: true
    },
    extends: ['standard', 'prettier'],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest'
    }
}
