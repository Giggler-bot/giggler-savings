
import type { ReactNode } from "react";
import { View } from "react-native";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({
  children,
  className = "rounded-card border border-border bg-white p-4",
}: CardProps) {
  return <View className={className}>{children}</View>;
}
