// 公用环境配置文件
// 主要处理内容
// 文件入口、出口
// html自动生成
// 文件免后缀配置
// 路径快捷方式配置
// js文件ES6转ES5
// Vue文件处理
// 图片文件处理
// 文字文件处理
const utils = require('./utils');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  // 入口文件
  entry: utils.resolvePath('../src/main.js'),
  // 出口配置
  output: {
    path: utils.resolvePath('../dist'), // 出口路径
    // [hash:n]是为了解决文件缓存问题，会生成带n位哈希值字符的文件
    filename: utils.staticPath('js/') + '[name].[hash:4].js', // 出口主文件路径和文件名
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/, // 排除该路径文件，避免花费大量时间在这里
      },
      // vue 文件处理
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      // 图片处理
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 10,
              name: utils.staticPath('image/') + '[name]-[hash:4].[ext]', // 图片的路径和名称
            },
          },
        ],
      },
      // 文件处理
      {
        test: /\.(woff2?|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1,
              name: utils.staticPath('fonts/') + '[name]-[hash:4].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: utils.resolvePath('../index.html'), //html 模板
      filename: 'index.html', // 生成html文件名
      // inject: 'body' // 生成入口文件引入代码位置： head、body，默认body
    }),
    // vue 文件处理
    new VueLoaderPlugin(),
  ],
  resolve: {
    // 文件免后缀配置
    extensions: ['.js', '.json', '.vue'],
    // 路径快捷方式配置
    // 例如：
    // import '@/assets/images/01.jpg'
    // import '@/assets/css/base.css'
    alias: {
      '@': utils.resolvePath('../src'),
    },
  },
};
