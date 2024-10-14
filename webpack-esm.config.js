import path from 'path';
import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default (env, argv) => {
  const prod = (argv.mode === 'production');
  const folder = prod ? 'dist' : 'dev';
  const r = {
    mode: (prod ? 'production' : 'development'),
    entry: {
      index: {
        import: './src/index.ts',
      },
    },
    output: {
      libraryTarget: 'module',
      filename: 'ultraloot.mjs',
      library: {
        type: 'module'
      },
      globalObject: 'this',
      path: path.resolve(__dirname, 'dist'),
      chunkFormat: 'module'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
      ]
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({
        test: /\.min.js(\?.*)?$/i
      })]
    },
    experiments: {
      outputModule: true,
    },
    plugins: [
      new webpack.DefinePlugin({
        PRODUCTION: prod
      })
    ],
    target: 'node'
  };
  if (!prod) {
    r.devtool = 'inline-source-map';
  }
  return r;
};
