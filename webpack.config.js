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
        filename: folder + '/ultraloot.js',
        library: {
          name: 'UltraLoot',
          type: 'umd',
          export: 'default'
        }
      },
      'ultraloot.min': {
        import: './src/index.ts',
        filename: folder + '/ultraloot.min.js',
        library: {
          name: 'UltraLoot',
          type: 'umd',
          export: 'default'
        }
      },
      "ultraloot.cjs": {
        import: './src/index.ts',
        filename: folder + '/ultraloot.cjs',
        library: {
          name: 'UltraLoot',
          type: 'umd',
          export: 'default'
        }
      }
    },
    output: {
      path: path.resolve(__dirname),
      filename: folder + '/[name].js',
      globalObject: 'this',
      umdNamedDefine: true,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({
        test: /\.min.js(\?.*)?$/i
      })]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.html$/i,
          loader: 'html-loader'
        },
      ]
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
