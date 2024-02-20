module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  plugins: ["react-refresh"],
  settings: {
    react: {
      // Tells eslint-plugin-react to automatically detect the version of React to use.
      version: 'detect',
    },
    // Tells eslint how to resolve imports
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-unused-vars": "off",
    "react/react-in-jsx-scope": "off",
    "no-undef": "off",
    "import/no-unresolved": 0,
    "linebreak-style": ["error", "windows"],
    "indent": "off",
    "object-curly-spacing": "off",
    "no-tabs": 0,
    "max-len": 0,
    "no-empty": [0, "allow-empty-functions", "allow-empty-catch"],
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/naming-convention": ["off"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-var-requires": "off",
    "no-mixed-spaces-and-tabs": 0,
    "camelcase": 0,
    "linebreak-style": "off"
  },
};
