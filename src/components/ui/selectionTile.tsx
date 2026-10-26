import { useEffect, useRef } from "react";
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
  const selectionProgress = useRef(
    new Animated.Value(selected ? 1 : 0),
  ).current;

  useEffect(() => {
    Animated.timing(selectionProgress, {
      toValue: selected ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [selected, selectionProgress]);

  const animateScale = (toValue: number) => {
    Animated.spring(scale, {
      toValue,
      useNativeDriver: true,
      speed: 40,
      bounciness: 0,
    }).start();
  };

  const animatedBorderColor = selectionProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E7E9E2", "#153D2E"],
  });

  return (
    <Animated.View
      style={{
        transform: [{ scale }],
        borderRadius: 12,
        borderColor: animatedBorderColor,
        borderWidth: selected ? 1.5 : 1,
        backgroundColor: selected ? "#DDE9E0" : "#FFFFFF",
      }}
    >
      <Pressable
        accessibilityRole="radio"
        accessibilityState={{ selected }}
        onPress={onPress}
        onPressIn={() => animateScale(0.94)}
        onPressOut={() => animateScale(1)}
        className={`w-full items-center justify-center rounded-xl px-2 py-4 ${
          selected ? "bg-sage" : "bg-white"
        }`}
        style={{ borderWidth: 0 }}
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
