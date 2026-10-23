import { Pressable, Text, View } from "react-native";
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
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      className={` w-full items-center justify-center rounded-xl border px-2 py-4 ${
        selected ? "border-forest bg-sage" : "border-border bg-white"
      }`}
    >
      <View className="mb-2 h-10 w-10 items-center justify-center rounded-full bg-[#E9F0E3]">
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
  );
}
