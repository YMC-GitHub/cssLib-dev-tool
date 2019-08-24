/* eslint-disable max-len */
module.exports = function (api) {
  api.cache(true);
  const presets = [
    [
      '@babel/preset-env',
      {
        // uses .browserslistrc
        /*
        targets: {
          browsers: ['ie >= 10', 'Chrome >=4', 'ChromeAndroid >=50','UCAndroid >=9','ios_saf >=4'.'Firefox >=3']
        },
        */
        modules: false,
        debug: false,
        include: [],
        exclude: [],
        useBuiltIns: false,
        forceAllTransforms: false,
        ignoreBrowserslistConfig: false,
        shippedProposals: false
      }
    ]
  ];
  const plugins = [
    ['@babel/plugin-transform-runtime', {
      absoluteRuntime: false,
      corejs: false,
      helpers: true,
      regenerator: true,
      useESModules: false
    }
    ]
  ];

  return {
    presets,
    plugins
  };
};
