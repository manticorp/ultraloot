const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const folder = process.env.production ? 'dist' : 'dev';

module.exports = {
  entry: {
    demo: {
      import: './other/demo.ts',
      filename: 'examples/ts/[name].js'
    },
    index: {
      import: './src/index.ts',
      filename: folder + '/index.js',
      library: {
        name: 'UltraLoot',
        type: 'umd',
      }
    },
    ultraloot: {
      import: './src/index.ts',
      library: {
        name: 'UltraLoot',
        type: 'umd',
        export: 'default'
      }
    },
    'ultraloot.min': {
      import: './src/index.ts',
      library: {
        name: 'UltraLoot',
        type: 'umd',
        export: 'default'
      }
    }
  },
  mode: 'development',
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
  target: 'node'
};
