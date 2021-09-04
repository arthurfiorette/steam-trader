import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { Configuration } from 'webpack';
import type DevServer from 'webpack-dev-server';

const production = process.env['NODE_ENV'] === 'production';
const resolve = (...segment: string[]) => path.resolve(__dirname, ...segment);

const config: Configuration = {
  mode: production ? 'production' : 'development',
  entry: resolve('src', 'index.tsx'),

  output: {
    path: resolve('dist'),
    filename: production ? '[contenthash].js' : '[name].js',
    publicPath: '/'
  },

  devServer: {
    historyApiFallback: true,
    contentBase: resolve(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 1227
  } as DevServer.Configuration,

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },

  devtool: 'eval-source-map',
  cache: true,

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        include: resolve('src'),
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(svg|txt|json|png|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)/,
        type: 'asset',
        generator: {
          filename: 'static/[name][ext][query]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 2kb
          }
        }
      }
    ]
  },

  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: (module: any) => {
            return `npm.${module.context
              .match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              .replace('@', '')}`;
          }
        }
      }
    },
    minimize: true,
    minimizer: [new TerserPlugin()]
  } as any,

  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: resolve('public', 'index.html'),
      favicon: resolve('public', 'favicon.ico'),
      minify: true
    }),

    new MiniCssExtractPlugin({
      filename: production ? '[contenthash].css' : '[name].css'
    })
  ]
};

export default config;
