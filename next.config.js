const path = require('path');

module.exports = {
  env: {
    API_ENDPOINT: 'http://localhost:3000/api',
  },
  webpack: (config, { dev }) => {
    config.resolve.alias['@'] = path.resolve(__dirname);

    if (dev) {
      config.devtool = 'cheap-module-source-map';
      config.output.crossOriginLoading = 'anonymous';
    } else {
      config.devtool = 'none';
    }

    return config;
  },
};
