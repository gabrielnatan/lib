import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from 'rollup-plugin-postcss';
import replace from "@rollup/plugin-replace";
import { dts } from "rollup-plugin-dts"
import livereload from "rollup-plugin-livereload";
const pkg = require("./package.json")

const isDev = process.env.NODE_ENV === 'development';

export default [{
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
        plugins:[dts()],
        external: [/\.css$/] 
    }
]