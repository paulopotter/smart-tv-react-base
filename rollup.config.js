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
const copy = require('rollup-plugin-copy');

const {
  project: { title: projectTitle, lang: projectLang },
  version: pkgVersion,
} = require('./package.json');

const isProduction = process.env.NODE_ENV === 'production';
const projectRootDir = path.resolve(__dirname);
const buildDate = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

const EXTENSIONS = ['.ts', '.tsx', '.jsx', 'js'];

const buildFolder = 'build';

const options = {
  input: 'src/main.tsx',
  output: {
    dir: buildFolder,
    format: 'iife',
    compact: true,
    sourcemap: true,
    entryFileNames: isProduction ? '[name].[hash].js' : 'main.js',
    chunkFileNames: 'chunk.[hash].js',
    globals: {
      'cross-fetch': 'fetch',
    },
  },
  external: ['cross-fetch', 'cross-fetch/polyfill'],
  moduleContext: {
    [require.resolve('cross-fetch')]: 'window',
  },
  plugins: [
    isProduction && progress(),
    isProduction &&
      del({
        targets: `${buildFolder}/*`,
      }),
    json(),
    replace({
      preventAssignment: false,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      ['__BUILD_TIME__']: buildDate,
      __BUILD_VERSION__: `${pkgVersion}`,
      ['__PROJECT_NAME__']: JSON.stringify(projectTitle),
      ['__TV_HOST__']: JSON.stringify('https://umdevqualquer.com.br/'),
      ['__API_HOST__']: JSON.stringify('https://api.umdevqualquer.com.br/'),
      ['__STATIC_HOST__']: JSON.stringify('https://cdn.umdevqualquer.com.br'),
    }),
    nodeResolve({
      preferBuiltins: true,
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
      babelHelpers: 'runtime',
      exclude: [/\/core-js\//, /\/cross-fetch\//],
      extensions: EXTENSIONS,
      plugins: ['@babel/plugin-transform-runtime'],
      presets: [
        [
          '@babel/preset-env',
          {
            bugfixes: true,
            modules: false,
            useBuiltIns: 'usage',
            corejs: '3',
            targets: 'chrome 36',
          },
        ],
        ['@babel/preset-react', { runtime: 'automatic' }],
      ],
    }),
    !isProduction &&
      serve({
        open: false,
        verbose: true,
        historyApiFallback: true,
        historyApiFallback: '/',
        contentBase: buildFolder,
        host: '0.0.0.0',
        port: process.env?.PORT ?? 3000,
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
        return `
            <!DOCTYPE html>
            <html lang="pt-BR">
              <head>
                ${metas.join('\n')}
                <title>${title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta charset="UTF-8">
                <meta name="build-date" content="${buildDate}" />
                <style>@import url(//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,700italic,300,400,700);</style>
                <script type="application/javascript">
                  window.onSmartAppStart = function () {
                    ${scripts.join('\n')}
                    const userAgent = window.navigator.userAgent;
                    if (/Tizen/i.test(userAgent)) {
                      window.SmartTvSo = "tizen"
                        var webApisScript = document.createElement('script');
                        webApisScript.type = "application/javascript";
                        webApisScript.src = "$WEBAPIS/webapis/webapis.js";
                        document.body.appendChild(webApisScript);
                    }
                    if (/web(o|0)s/i.test(userAgent)) {
                      window.SmartTvSo = "webos"
                        var webApisScript = document.createElement('script');
                        webApisScript.type = "application/javascript";
                        webApisScript.src = "./js/webos.js";
                        document.body.appendChild(webApisScript);
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
              <body onload="onSmartAppLoad()" onunload="onSmartAppUnload()"><div id="root"></div></body>
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
    copy({
      targets: [
        {
          src: './public/*',
          dest: './build/',
        },
      ],
    }),
    filesize(),
  ],
};

module.exports = options;
