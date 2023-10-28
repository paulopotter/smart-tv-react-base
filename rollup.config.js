const serve = require("rollup-plugin-serve");
const livereload = require("rollup-plugin-livereload");
const { babel } = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('rollup-plugin-typescript2');
const resolve = require('@rollup/plugin-node-resolve');
const { terser } = require("rollup-plugin-terser");
const external = require('rollup-plugin-peer-deps-external');
const progress = require("rollup-plugin-progress");
const html = require("@rollup/plugin-html");
const json = require("rollup-plugin-json");
const filesize = require("rollup-plugin-filesize");
const path = require("node:path");
const process = require("node:process");
const { default: replace } = require("@rollup/plugin-replace");

const { project: {
  title: projectTitle,
  lang: projectLang
} } = require('./package.json');

const isProduction = process.env.NODE_ENV === 'production'

const EXTENSIONS = [".ts", ".tsx", ".jsx", "js"];

const options = {
  input: 'src/main.tsx',
  output: {
    dir: 'build',
    format: 'umd'
  },
  plugins: [
    isProduction && progress(),
    external(),
    resolve(),
    json(),
    commonjs({
       include: [
        'node_modules/**',
      ],
    }),
    typescript({tsconfig: './tsconfig.json'}),
    babel({
        babelHelpers: 'runtime',
        extensions: EXTENSIONS,
        include: EXTENSIONS.map(ext => `src/**/*${ext}`),
        plugins: [
          "@babel/plugin-transform-runtime"
        ],
        presets: [
          "@babel/preset-env",
          "@babel/preset-typescript",
          "@babel/preset-react"
        ]
    }),
    terser(),
    replace({
      preventAssignment: true,
      values:{
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      },
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    !isProduction && serve({
      open: true,
      verbose: true,
      historyApiFallback: true,
      contentBase: ["", "build"],
      host: "0.0.0.0",
      port: 3000,
    }),
    !isProduction && livereload({ watch: "build" }),
     html({
      minify: true,
      rootDir: path.join(process.cwd(), 'build'),
      template: () => (`<!DOCTYPE html><html lang="${projectLang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${projectTitle}</title></head><body><div id="root"></div><script src="main.js"></script></body></html>`),
    }),
    filesize(),
  ]
};

module.exports = options
