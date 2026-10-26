
import type { ReactNode } from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import type { LinearGradientProps } from "expo-linear-gradient";

type GradientCardProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  colors?: readonly [string, string, ...string[]];
  start?: LinearGradientProps["start"];
  end?: LinearGradientProps["end"];
};

export function GradientCard({
  children,
  className = "rounded-card",
  contentClassName = "p-4",
  colors = ["#153D2E", "#245A40", "#153D2E"],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
}: GradientCardProps) {
  return (
    <View
      className={`w-full self-stretch overflow-hidden ${className}`}
      style={{
        width: "100%",
        borderRadius: 24,
      }}
    >
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
        style={{
          width: "100%",
        }}
      >
        <View className={contentClassName}>
          {children}
        </View>
      </LinearGradient>
    </View>
  );
}
