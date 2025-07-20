// craco.config.js

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Remove CssMinimizerPlugin from optimization minimizer
      if (webpackConfig.optimization && Array.isArray(webpackConfig.optimization.minimizer)) {
        webpackConfig.optimization.minimizer = webpackConfig.optimization.minimizer.filter(
          (plugin) => plugin.constructor.name !== 'CssMinimizerPlugin'
        );
      }
      return webpackConfig;
    },
  },
};
