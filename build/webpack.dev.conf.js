// 开发环境配置，侧重于调试效率
// 主要处理内容
// 合并公用webpack配置
// 设置devtool方便开发调试
// 处理less和css文件，为其自动添加样式前缀，并使其以style的形式展示在页面中
// 配置devServer，修改webpack-dev-server的默认配置

// webpack-merge 用于合并webpack配置

const webpackMerge = require('webpack-merge');
const webpackBase = require('./webpack.base.conf');

module.exports = webpackMerge(webpackBase, {
  mode: 'development',
  // 启动开发环境webpack
  devServer: {
    port: 9000,
  },
  // 设置devtool方便开发调试
  devtool: 'inline-source-map',
  // 处理less和css文件，为其自动添加样式前缀，并使其以style的形式展示在页面中
  // less-loader处理less
  // postcss-loader处理自动添加样式前缀
  // autoprefixer处理自动添加样式前缀
  // css-loader处理css
  // style-loader处理style
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugin: (loader) => [
                require('autoprefixer')({
                  overrideBrowserslist: ['last 2 versions', '>1%'],
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
