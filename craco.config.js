// craco.config.js

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // ✅ Remove CssMinimizerPlugin from optimization
      if (
        webpackConfig.optimization &&
        Array.isArray(webpackConfig.optimization.minimizer)
      ) {
        webpackConfig.optimization.minimizer = webpackConfig.optimization.minimizer.filter(
          (plugin) => plugin.constructor.name !== 'CssMinimizerPlugin'
        );
      }

      // ✅ Optional: disable source maps for production builds (smaller files)
      webpackConfig.devtool = false;

      return webpackConfig;
    },
  },

  // ✅ Optional future config
  // babel: {
  //   plugins: [],
  // },
  // style: {
  //   postcss: {
  //     plugins: [],
  //   },
  // },
};
