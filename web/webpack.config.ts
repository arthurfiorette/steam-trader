import path from 'path';
import { Configuration } from 'webpack';
import _webpackDevServer from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
const production = process.env.NODE_ENV === 'production';

const resolve = (...segment: string[]) => path.resolve(__dirname, ...segment);

const config: Configuration = {
  mode: production ? 'production' : 'development',
  entry: resolve('src', 'index.tsx'),
  output: {
    path: resolve('dist'),
    filename: 'bundle.[contenthash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devtool: production ? 'eval' : false,
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|svg)$/i,
        loader: 'file-loader',
        exclude: resolve('public')
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'styles.[contenthash].css' }),
    new HtmlWebpackPlugin({
      template: resolve('public', 'index.html'),
      favicon: resolve('public/favicon.ico'),
      minify: true
    })
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: resolve(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 1227
  },
  externals: {
    bootstrap: 'bootstrap',
    react: 'React',
    'react-dom': 'ReactDOM',
    'socket.io-client': 'io',
    axios: 'axios'
  }
};

export default config;
