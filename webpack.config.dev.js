const path = require("path");
const htmlwebpackplugin = require("html-webpack-plugin");

const devConfig = {
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name]_[hash:6].js"
    },
    mode:"development",
    devtool: "cheap-module-eval-source-map",
    module: {
        rules: [
            {
                test: /\.less$/,
                include: path.resolve(__dirname, "./src"),
                use: ["style-loader", "css-loader", "postcss-loader", "less-loader"]
              }
        ]
    },
    devServer: {
        contentBase: "./dist",
        open: true,
        port: 8081,
        proxy: {
            "/api": {
              target: "http://localhost:9092"
            }
          }
    },
    watchOptions : {
        ignored : '/node_modules/'
    },
    plugins: [
        new htmlwebpackplugin({
            title: "首页",
            template: "./src/index.html",
            filename: "index.html"
          }),
    ]
}


module.exports = devConfig;