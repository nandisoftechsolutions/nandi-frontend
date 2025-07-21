const path = require('path');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      // 👇 Keep your original JS file name configuration
      webpackConfig.output.filename = 'static/js/[name].js';
      webpackConfig.output.chunkFilename = 'static/js/[name].chunk.js';

      // ✅ Enable source maps for production
      webpackConfig.devtool = 'source-map';

      // ✅ TEMPORARILY disable CSS minification to locate the error
      if (webpackConfig.optimization && webpackConfig.optimization.minimizer) {
        webpackConfig.optimization.minimizer = webpackConfig.optimization.minimizer.filter(
          (plugin) => !(plugin instanceof CssMinimizerPlugin)
        );
      }

      return webpackConfig;
    },
  },
};
