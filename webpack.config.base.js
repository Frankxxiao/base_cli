
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HappyPack = require("happypack");
const os = require("os");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
    entry: "./src/index.js",
    
    resolve: {
        modules: [path.resolve(__dirname, "./node_modules")],
        alias: {
            "vue": path.resolve(
              __dirname,
              "./node_modules/vue/dist/vue.esm.js"
            ),
            react: path.resolve(
                __dirname,
                "./node_modules/react/umd/react.production.min.js"
              ),
              "react-dom": path.resolve(
                __dirname,
                "./node_modules/react-dom/umd/react-dom.production.min.js"
              )
        },
        extensions:['.js']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["happypack/loader?id=css"]
            },
            {
                test:/\.(png|jpe?g|gif)$/,
                use: ["happypack/loader?id=pic"]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: ["happypack/loader?id=ttf"]
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "./src"),
                use: ["happypack/loader?id=babel"]
              }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HardSourceWebpackPlugin(),
        new HappyPack({
            id: "css",
            loaders: ["style-loader", "css-loader"],
            threadPool: happyThreadPool
          }),
          new HappyPack({
            id: "pic",
            loaders: [
              {
                loader: "file-loader",
                options: {
                  name: "[name]_[hash:6].[ext]",
                  outputPath: "images/"
                }
              }
            ],
            threadPool: happyThreadPool
          }),
          new HappyPack({
            id: "ttf",
            loaders: [
              {
                loader: "file-loader",
                options: {
                  name: "[name].[ext]",
                }
              }
            ],
            threadPool: happyThreadPool
          }),
          new HappyPack({
            id: "babel",
            loaders: [
              {
                loader: "babel-loader"
              }
            ],
            threadPool: happyThreadPool
          }),
    ]

}