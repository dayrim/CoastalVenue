// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: ['./src/scripts/index.js'],
  output: {
    path: path.resolve('./public'),
    filename: 'scripts/bundle.js',
    publicPath: ''
  },
  stats: {
    assets: false,
    modules: false,
    cached: false,
    children: false,
    chunks: false,
    hash: false,
    colors: true
  },
  devServer: {
    contentBase: path.join('public'),
    stats: 'errors-only'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
      // new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: false,
      template: './src/template.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: {
          loader: 'eslint-loader',
          options: {
            fix: true
          }
        }
      },
      {
        exclude: [/node_modules\/(?!(swiper|dom7)\/).*/, /\.test\.js?$/],
        test: /\.js?$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '/fonts/[name].[ext]'
          }
        }
      },
      {
        test: /\.(html)$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              interpolate: true
              // minimize: true
            }
          }
        ]
      },
      {
        test: /\.(png|jps|svg|gif)$/,

        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/images/[name].[ext]'
            }
          },

          {
            loader: 'image-webpack-loader',
            options: {
              disable: true,
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  }
};
