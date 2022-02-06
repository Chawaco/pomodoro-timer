import path from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const nonce = require("./create-nonce")(); // added for Material-UI
const isDev = process.env.NODE_ENV === 'development';

// Common Settings
const common: Configuration = {
  mode: isDev ? 'development' : 'production',
  node: {
    /**
     * To prevent webpack from converting __dirname and __filename.
     */
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', 'css', 'scss'],
  },
  /**
   * Dealing with build failure on macOS.
   * https://github.com/yan-foto/electron-reload/issues/71
   */
  externals: ['fsevents'],
  output: {
    // The output destination of the bundle file.
    path: path.resolve(__dirname, 'dist'),
    // Required setting on webpack@5 + electron.
    publicPath: './',
    filename: '[name].js',
    assetModuleFilename: 'assets/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
						loader: MiniCssExtractPlugin.loader,
					},
          {
            loader: "css-loader",
            options: {
              sourceMap: isDev,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDev,
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
              },
            },
          },
        ]
      },
      {
        // assets
        test: /\.(mp3|ico|png|jpe?g|svg|eot|woff?2?)$/,
        type: 'assets/resources',
      },
    ],
  },

  watch: isDev,
  stats: 'errors-only',
  performance: { hints: false },
  /**
   * Note: In the renderer process during development,
   * 'Uncaught EvalError' is displayed in the developer console of electron
   * if the source map is not available.
   */
  devtool: isDev ? 'inline-source-map' : undefined,
};

// Main process settings
const main: Configuration = {
  ...common,
  target: 'electron-main',
  entry: {
    main: './src/main.ts',
  },
};

// Preload settings
const preload: Configuration = {
  ...common,
  target: 'electron-preload',
  entry: {
    preload: './src/preload.ts',
  },
};

// Renderer process settings
const renderer: Configuration = {
  ...common,
  // target: 'electron-renderer'
  target: 'web',
  entry: {
    renderer: './src/assets/renderer.tsx',
  },
  plugins: [
    // This plugin extracts CSS into separate files.
    new MiniCssExtractPlugin(),
    /**
     * This plugin will generate an HTML5 file that includes all the webpack bundles in the body using script tags.
     */
    new HtmlWebpackPlugin({
      minify: !isDev,
      inject: 'body',
      filename: 'index.html',
      template: './src/index.html',
      nonce: nonce  // added a new property for Material-UI
    }),
  ],
};

// In development, dealing with only renderer process. (main: tsc)
const config = isDev ? [renderer] : [main, preload, renderer];
export default config;