module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'react-native-reanimated/plugin',
        {
          aliases: {
            crypto: 'crypto-browserify',
          },
        },
      ],
      'babel-plugin-rewrite-require',
    ],
  };
};
