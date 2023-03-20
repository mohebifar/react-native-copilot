module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["@babel/preset-flow", "module:metro-react-native-babel-preset"],
  };
};
