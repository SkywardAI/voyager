import globals from "globals/index.js";
import pluginJs from "@eslint/js";
import * as babelParser from "@babel/eslint-parser"


export default [
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