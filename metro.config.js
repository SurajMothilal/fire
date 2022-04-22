const { getDefaultConfig } = require("metro-config");
const { resolver: defaultResolver } = getDefaultConfig.getDefaultValues();

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  // Had to do this resolver stuff so that apollo client 3.5.x can work well with metro bundler
  resolver: {
    ...defaultResolver,
    sourceExts: [
      ...defaultResolver.sourceExts,
      "cjs",
    ],
  }
};
