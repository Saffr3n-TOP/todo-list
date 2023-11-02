const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = ({ isDev }) => {
  return {
    mode: isDev ? 'development' : 'production',
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
      filename: `[name]${isDev ? '' : '.[contenthash]'}.js`,
      path: path.resolve(__dirname, 'dist'),
      clean: true
    },
    plugins: [
      new HtmlPlugin({
        template: path.resolve(__dirname, 'assets', 'template.html')
      }),
      !isDev && new CssExtractPlugin({
        filename: '[name].[contenthash].css'
      })
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [isDev ? 'style-loader' : CssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.ttf$/i,
          type: 'asset/resource'
        },
        {
          test: /\.svg$/i,
          type: 'asset/resource'
        }
      ]
    },
    optimization: {
      minimizer: ['...', new CssMinimizerPlugin()]
    },
    devServer: {
      static: path.resolve(__dirname, 'dist')
    }
  };
};
