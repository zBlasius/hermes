module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        "babel-preset-expo",
        {
          jsxImportSource: "nativewind",
          jsxRuntime: "automatic",
          // If you need metro options, include them here
          // useTransformReactJSXExperimental: true,
        },
      ],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./",
            "tailwind.config": "./tailwind.config.js",
          },
        },
      ],
      // Must be last
      "react-native-reanimated/plugin",
    ],
  };
};
