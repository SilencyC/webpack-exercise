// 生产环境配置 侧重于代码压缩和性能
// 主要处理内容
// 合并公用webpack配置
// 设置devtool方便追踪代码
// 每次打包钱先清空dist打包文件夹
// 处理less和css文件，为其添加样式前缀，并使其抽离样式为单独css文件

const utils = require('./utils');
const webpackMerge = require('webpack-merge');
const webpackBase = require('./webpack.base.conf');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = webpackMerge(webpackBase, {
  mode: 'production',
  devtool: 'eval',
  // 每次打包前都先清空dist打包文件夹
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: utils.staticPath('css/') + '[name].[hash:4].css',
    }),
  ],
  // 处理less和css文件，为其自动添加样式前缀，并使其以style的形式展示在页面中
  // less-loader处理less
  // postcss-loader处理自动添加样式前缀
  // autoprefixer处理自动添加样式前缀
  // css-loader处理css
  // mini-css-extract-plugin抽离样式为单独css文件
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../../' }, // 公用路径调试到外层，直到样式路径正确为止
          },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: (loader) => [
                require('autoprefixer')({
                  overrideBrowserslist: ['last 2 versions', '> 1%'],
                }),
              ],
            },
          },
          { loader: 'less-loader' },
        ],
      },
    ],
  },
});
