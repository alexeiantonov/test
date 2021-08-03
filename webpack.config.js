import { VueLoaderPlugin } from 'vue-loader';
import htmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin, {
  loader as _loader
} from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import autoprefixer from 'autoprefixer';
import { resolve as _resolve } from 'path';

export const entry = {
  main: './src/main.js'
};
export const output = {
  filename: '[name].[contenthash:8].js',
  path: _resolve(__dirname, 'dist'),
  chunkFilename: '[name].[contenthash:8].js'
};
export const module = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
      loader: 'file-loader',
      options: {
        name: '[name][contenthash:8].[ext]'
      }
    },
    {
      test: /\.(png|jpe?g|gif|webm|mp4|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name][contenthash:8].[ext]',
        outputPath: 'assets/img',
        esModule: false
      }
    },
    {
      test: /\.s?css$/,
      use: [
        'style-loader',
        _loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer()]
          }
        },
        'sass-loader'
      ]
    }
  ]
};
export const plugins = [
  new VueLoaderPlugin(),
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash:8].css',
    chunkFilename: '[name].[contenthash:8].css'
  }),
  new htmlWebpackPlugin({
    template: _resolve(__dirname, 'public', 'index.html'),
    favicon: './public/favicon.ico'
  })
];
export const resolve = {
  alias: {
    vue$: 'vue/dist/vue.runtime.esm.js'
  },
  extensions: ['*', '.js', '.vue', '.json']
};
export const optimization = {
  moduleIds: 'hashed',
  runtimeChunk: 'single',
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        priority: -10,
        chunks: 'all'
      }
    }
  }
};
export const devServer = {
  historyApiFallback: true
};
