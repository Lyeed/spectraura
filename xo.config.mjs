/** @type {import('xo').FlatXoConfig} */
const config = [
    {
        prettier: "compat",
        react: true,
        settings: {
            "import-x/extensions": [".js", ".jsx", ".ts", ".tsx"],
        },
        rules: {
            "@typescript-eslint/array-type": "off",
            "@typescript-eslint/triple-slash-reference": "off",
            "@typescript-eslint/naming-convention": "off",
            "@typescript-eslint/no-restricted-types": "off",
            "@typescript-eslint/consistent-type-definitions": [
                "error",
                "interface",
            ],
            "react/function-component-definition": [
                "error",
                {
                    namedComponents: "arrow-function",
                    unnamedComponents: "arrow-function",
                },
            ],
            "react/react-in-jsx-scope": "off",
            "unicorn/prefer-global-this": "off",
            "unicorn/filename-case": "off",
            "unicorn/prefer-query-selector": "off",
            "unicorn/prefer-string-replace-all": "off",
            "promise/prefer-await-to-then": "off",
            "import-x/extensions": "off",
        },
    },
];

export default config;
