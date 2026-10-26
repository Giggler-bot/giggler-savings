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
  return (
    <View
      className={className}
      style={{
        shadowColor: "#153D2E",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      {children}
    </View>
  );
}
