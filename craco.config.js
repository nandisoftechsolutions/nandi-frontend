// craco.config.js
const path = require('path');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      // Output file naming
      webpackConfig.output.filename = 'static/js/[name].js';
      webpackConfig.output.chunkFilename = 'static/js/[name].chunk.js';

      // Optional: Enable source maps
      webpackConfig.devtool = 'source-map';

      // Optional: Disable CSS minimization to fix MIME errors from Netlify
      if (webpackConfig.optimization && Array.isArray(webpackConfig.optimization.minimizer)) {
        webpackConfig.optimization.minimizer = webpackConfig.optimization.minimizer.filter(
          (plugin) => !(plugin instanceof CssMinimizerPlugin)
        );
      }

      return webpackConfig;
    },
  },
};
