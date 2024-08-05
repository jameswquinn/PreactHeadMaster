import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import packageJson from './package.json' assert { type: 'json' };

const commonPlugins = [
  peerDepsExternal(),
  resolve(),
  commonjs(),
  babel({
    babelHelpers: 'bundled',
    presets: ['@babel/preset-env', '@babel/preset-react'],
    extensions: ['.js', '.jsx'],
    exclude: 'node_modules/**'
  }),
];

const commonConfig = {
  input: 'src/index.js',
  external: ['preact', 'preact/hooks'],
};

export default [
  // ESM build
  {
    ...commonConfig,
    output: [
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [...commonPlugins],
  },
  // CommonJS build
  {
    ...commonConfig,
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [...commonPlugins],
  },
  // UMD build
  {
    ...commonConfig,
    output: [
      {
        file: packageJson.browser,
        format: 'umd',
        name: 'PreactHeadMaster',
        globals: {
          preact: 'preact',
          'preact/hooks': 'preactHooks',
        },
        sourcemap: true,
      },
    ],
    plugins: [...commonPlugins, terser()],
  },
];
