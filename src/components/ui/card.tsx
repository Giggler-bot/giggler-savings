import type { ReactNode } from "react";
import { View } from "react-native";

type Cardprops = {
  children: ReactNode;
  className: string;
};

export function Card({ children, className = "" }: Cardprops) {
  return (
    <View className={`rounded-card border border-border bg-white p-4`}>
      {children}
    </View>
  );
}
