module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
          "navigation/*": ["navigation/*"],
          "screens/*": ["screens/*"],
          "components/*": ["./components/*"],
          "utils/*": ["utils/*"],
          "const/*": ["const/*"],
          "assets/*": ["assets/*"],
        },
      },
    ],
  ],
};
