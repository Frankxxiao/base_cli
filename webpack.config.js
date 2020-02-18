const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base.js");
const prodConfig = require("./webpack.config.prod.js");
const devConfig = require("./webpack.config.dev.js");

module.exports = env => {
  if (env && env.production) {
    return merge(baseConfig, prodConfig);
  } else {
    return merge(baseConfig, devConfig);
  }
};