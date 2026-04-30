const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { getSentryExpoConfig } = require("@sentry/react-native/metro");

const config = getDefaultConfig(__dirname);

// 👉 apply NativeWind FIRST
const nativeWindConfig = withNativeWind(config, {
  input: "./global.css",
});

// 👉 then merge Sentry config correctly
module.exports = getSentryExpoConfig(__dirname, nativeWindConfig);