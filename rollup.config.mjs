import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';
import packageJson from './package.json' assert { type: 'json' };

const commonPlugins = [
  peerDepsExternal(),
  resolve(),
  commonjs(),
  typescript({ tsconfig: './tsconfig.json' }),
];

const commonConfig = {
  input: 'src/index.ts',
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
  // TypeScript declaration files
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];
