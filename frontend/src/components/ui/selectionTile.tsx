
import { useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type SelectionTileProps = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  selected: boolean;
  onPress: () => void;
};

export function SelectionTile({
  title,
  icon,
  selected,
  onPress,
}: SelectionTileProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateScale = (toValue: number) => {
    Animated.spring(scale, {
      toValue,
      useNativeDriver: true,
      speed: 40,
      bounciness: 0,
    }).start();
  };

  return (
    <Animated.View
      style={{
        transform: [{ scale }],
      }}
    >
      <Pressable
        accessibilityRole="radio"
        accessibilityState={{ selected }}
        onPress={onPress}
        onPressIn={() => animateScale(0.94)}
        onPressOut={() => animateScale(1)}
        className={`w-full items-center justify-center rounded-xl border px-2 py-4 ${
          selected
            ? "border-forest bg-sage"
            : "border-border bg-white"
        }`}
      >
        <View className="mb-2 h-10 w-10 items-center justify-center rounded-full bg-sage">
          <Ionicons name={icon} size={22} color="#153D2E" />
        </View>

        <Text
          className={`text-center text-[12px] ${
            selected ? "text-forest" : "text-ink"
          }`}
          style={{
            fontFamily: selected ? "Manrope-SemiBold" : "Manrope-Medium",
          }}
        >
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
