import { View, useColorScheme } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function TabScreenBackground() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  return (
    <>
      {/* Dynamic gradient */}
      <LinearGradient
        colors={
          isDark
            ? ["#020617", "#052e1f", "#020617"] // 🌙 dark mode
            : ["#f8fafc", "#eef2ff", "#e0f2fe"] // ☀️ light mode
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0"
      />

      {/* Top glow */}
      <View
        pointerEvents="none"
        className={`absolute -top-40 -left-32 h-[400px] w-[400px] rounded-full ${
          isDark ? "bg-green-400 opacity-10" : "bg-blue-300 opacity-20"
        }`}
      />

      {/* Right glow */}
      <View
        pointerEvents="none"
        className={`absolute top-20 -right-32 h-[350px] w-[350px] rounded-full ${
          isDark ? "bg-emerald-300 opacity-10" : "bg-purple-300 opacity-20"
        }`}
      />

      {/* Bottom glow */}
      <View
        pointerEvents="none"
        className={`absolute -bottom-40 left-10 h-[300px] w-[300px] rounded-full ${
          isDark ? "bg-teal-300 opacity-10" : "bg-cyan-300 opacity-15"
        }`}
      />
    </>
  );
}