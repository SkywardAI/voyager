import globals from "globals/index.js";
import pluginJs from "@eslint/js";
import * as babelParser from "@babel/eslint-parser"
import babelImportAttributesPlugin from '@babel/plugin-syntax-import-attributes'


export default [
    {ignores: ["volumes/*", ".github/*", ".vscode/*", "example/*"]},
    {languageOptions: { globals: globals.browser }},
    pluginJs.configs.recommended,
    { 
        languageOptions: {
            parser: babelParser,
            parserOptions: {
                requireConfigFile: false,
                babelOptions: {
                    babelrc: false,
                    configFile: false,
                    plugins: [
                        babelImportAttributesPlugin
                    ]
                }
            }
        }
    },
    {
        rules: {
            'no-undef': 'off'
        }
    }
];