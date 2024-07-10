'use strict';


Object.defineProperty(exports, '__esModule', { value: true });

var resolve = require('@rollup/plugin-node-resolve');
var commonjs = require('@rollup/plugin-commonjs');
var typescript = require('@rollup/plugin-typescript');
var postcss = require('rollup-plugin-postcss');
var replace = require('@rollup/plugin-replace');
var rollupPluginDts = require('rollup-plugin-dts');
var livereload = require('rollup-plugin-livereload');

const pkg = require("./package.json");
const isDev = process.env.NODE_ENV === 'development';
var rollup_config = [{
    input: "src/index.ts",
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap:true
        },
        {
            file: pkg.module,
            format: 'esm',
            sourcemap:true
        },
    ],
    plugins:[
        isDev && livereload({
            watch: 'dist',
        }),
        postcss({
            config: {
              path: './postcss.config.js',
            },
            extensions: ['.css'],
            minimize: true,
            inject: {
              insertAt: 'top',
            },
          }),
        resolve(),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json', sourceMap: true }),
        replace({
            preventAssignment: true,
            values: {
                'use client': '// use client'  // Comentando a diretiva durante o build
            },
            delimiters: ['"', '"']
        })
    ],
    external: ['react','react-dom'], // 
    },
    {
        input: "dist/esm/types/index.d.ts",
        output: [{file: "dist/index.d.ts",format: "esm"}],
        plugins:[rollupPluginDts.dts()],
        external: [/\.css$/] 
    }
];

exports.default = rollup_config;
