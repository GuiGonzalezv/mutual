module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint",
    ],
    env: {
        es2021: true,
        node: true
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module"
    },
    rules: {
        "no-unused-vars": "warn",
        indent: "warn",
        semi: ["warn", "never"],
        "semi-spacing": "warn",
        quotes: "warn",
        "no-var": "warn",
        "comma-spacing": "warn",
        "no-trailing-spaces": "warn",
        "brace-style": ["warn", "1tbs", {allowSingleLine: false}],
        "max-len": ["warn", {code: 140, comments: 140, tabWidth: 4}],
        curly: ["warn", "multi-line", "consistent"],
        "no-else-return": "warn",
        "func-call-spacing": ["error", "never"],
        "keyword-spacing": ["warn"],
        "block-spacing": ["warn", "always"],
        "key-spacing": ["warn", {mode: "strict"}],
        "object-curly-spacing": ["warn", "never"],
        "space-before-blocks": ["warn", "always"],
        "space-in-parens": ["warn", "never"],
        "space-before-function-paren": ["warn", "never"],
        "require-atomic-updates": "off"
    }
}