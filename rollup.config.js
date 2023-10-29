const serve = require('rollup-plugin-serve');
const livereload = require('rollup-plugin-livereload');
const { babel } = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('rollup-plugin-typescript2');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const external = require('rollup-plugin-peer-deps-external');
const progress = require('rollup-plugin-progress');
const html = require('@rollup/plugin-html');
const json = require('rollup-plugin-json');
const filesize = require('rollup-plugin-filesize');
const path = require('node:path');
const process = require('node:process');
const { default: replace } = require('@rollup/plugin-replace');
const del = require('rollup-plugin-delete');

const {
  project: { title: projectTitle, lang: projectLang },
} = require('./package.json');

const isProduction = process.env.NODE_ENV === 'production';
const projectRootDir = path.resolve(__dirname);

const EXTENSIONS = ['.ts', '.tsx', '.jsx', 'js'];

const buildFolder = 'build';

const options = {
  input: 'src/main.tsx',
  output: {
    dir: buildFolder,
    format: 'iife',
    compact: true,
    sourcemap: true,
    entryFileNames: '[name].[hash].js',
    chunkFileNames: 'chunk.[hash].js',
  },
  plugins: [
    isProduction && progress(),
    isProduction &&
      del({
        targets: `${buildFolder}/*`,
      }),
    json(),
    nodeResolve({
      preferBuiltins: true,
      // extensions: EXTENSIONS,
      browser: true,
      exportConditions: ['browser', 'import', 'require', 'default'],
    }),
    commonjs({
      include: ['node_modules/**'],
      transformMixedEsModules: true,
      ignoreDynamicRequires: true,
    }),
    typescript({
      outputToFilesystem: true,
      tsconfig: './tsconfig.build.json',
      cacheDir: 'node_modules/.cache/rollup-typescript',
      compilerOptions: {
        incremental: true,
        tsBuildInfoFile: 'node_modules/.cache/typescript/.tsbuildinfo',
      },
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: [/\/core-js\//],
      extensions: EXTENSIONS,
      presets: [
        [
          '@babel/preset-env',
          {
            bugfixes: true,
            useBuiltIns: 'usage',
            corejs: '3',
            // targets: babelTargets,
            targets: 'chrome 36',
          },
        ],
        ['@babel/preset-react', { runtime: 'automatic' }],
      ],
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    !isProduction &&
      serve({
        open: false,
        verbose: true,
        historyApiFallback: true,
        contentBase: ['', buildFolder],
        host: '0.0.0.0',
        port: 3000,
      }),
    !isProduction && livereload({ watch: buildFolder }),
    html({
      rootDir: path.join(process.cwd(), buildFolder),
      title: projectTitle,
      template: (options) => {
        const { attributes, files, meta, publicPath, title } = options;
        const scripts = [];
        const metas = [];

        for (const script of files.js) {
          scripts.push(
            `var ${script.name} = document.createElement('script');
            ${script.name}.type = "application/javascript";
            ${script.name}.src = "${publicPath}${script.fileName}";
            void document.body.appendChild(${script.name});`,
          );
        }
        // return (`<!DOCTYPE html><html lang="${projectLang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${projectTitle}</title></head><body><div id="root"></div><script src="./main.js"></script><script src="https://tv-globoplay-remote.globo.com/target/target-script-min.js#wput6z"></script></body></html>`)},
        return `
            <!DOCTYPE html>
            <html >
              <head>
                ${metas.join('\n')}
                <title>${title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script type="application/javascript">
                  window.onSmartAppStart = function () {
                    ${scripts.join('\n')}
                    const userAgent = window.navigator.userAgent;
                    if (/Tizen/i.test(userAgent)) {
                      window.SmartTvSo = "tizen"
                        var webApisScript = document.createElement('script');
                        webApisScript.type = "application/javascript";
                        webApisScript.src = "$WEBAPIS/webapis/webapis.js";
                        void document.body.appendChild(webApisScript);
                    }
                    if (/webos/i.test(userAgent)) {
                      window.SmartTvSo = "webos"
                        var webApisScript = document.createElement('script');
                        webApisScript.type = "application/javascript";
                        webApisScript.src = "";
                        void document.body.appendChild(webApisScript);
                    }


                    console.log('[Smart Tv App] scripts injected!');
                  };

                  window.onSmartAppLoad = function () {
                    console.log('[Smart Tv App] onSmartAppLoad');

                    window.onSmartAppStart();
                  };

                  window.onSmartAppUnload = function () {
                    console.log('[Smart Tv App] onSmartAppUnload');
                  };

                </script>
              </head>
              <body onload="onSmartAppLoad()" onunload="onSmartAppUnload()">
              <div id="root"></div>
              </body>
            </html>
          `;
      },
    }),
    isProduction &&
      terser({
        ecma: 5,
        toplevel: true,
        mangle: true,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        keep_classnames: true,
        compress: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          pure_funcs: ['console.log', 'console.debug', 'console.assert'],
          arrows: false,
          passes: 10,
        },
      }),
    filesize(),
  ],
};

module.exports = options;
