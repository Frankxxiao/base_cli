const path = require("path");
const htmlwebpackplugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");
const glob = require("glob-all");

const prodConfig = {
    output: {
        path: path.resolve(__dirname, "./prod"),
        filename: "[name]_[hash:6].js"
    },
    mode:"production",
    module: {
        rules: [
          {
            test: /\.less$/,
            include: path.resolve(__dirname, "./src"),
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              "less-loader"
            ]
          }
        ]
      },
    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: "all",
            automaticNameDelimiter: "-",
            cacheGroups: {
            //缓存组
            lodash: {
                test: /lodash/,
                name: "lodash",
                minChunks: 1
            },
            react: {
                test: /react|react-dom/,
                name: "react",
                minChunks: 1
            },
            vue: {
                test: /vue/,
                name: "vue",
                minChunks: 1
            }
            }
        }
    },
    plugins : [
        new htmlwebpackplugin({
            title: "首页",
            template: "./src/index.html",
            filename: "index.html",
            minify: {
              removeComments: true, // 移除HTML中的注释
              collapseWhitespace: true, // 删除空白符与换行符
              minifyCSS: true // 压缩内联css
            }
        }),
        // 抽离css为独立文件输出
        new MiniCssExtractPlugin({
            filename: "css/[name]_[contenthash:6].css"
        }),
        new OptimizeCSSAssetsPlugin({
            cssProcessor: require("cssnano"), //引入cssnano配置压缩选项
            cssProcessorOptions: {
            discardComments: { removeAll: true }
            }
        }),
        new PurifyCSSPlugin({
            paths: glob.sync([// 要做 CSS Tree Shaking 的路径文件
              path.resolve(__dirname, "./src/*.html"),
              // 请注意，我们同样需要对 js 文件进行 tree shaking
              // 因为 JS 能够执行 CSSOM 操作与 DOM 操作
              path.resolve(__dirname, "./src/*.js")
            ])
          })
    ]

}

module.exports = prodConfig;