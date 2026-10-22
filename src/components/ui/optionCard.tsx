
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type OptionCardProps = {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  selected: boolean;
  onPress: () => void;
};

export function OptionCard({
  title,
  description,
  icon,
  selected,
  onPress,
}: OptionCardProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      className={`flex-row items-center rounded-2xl border p-4 ${
        selected
          ? "border-forest bg-sage"
          : "border-border bg-white"
      }`}
    >
      <View className="mr-3 h-11 w-11 items-center justify-center rounded-xl bg-[#E9F0E3]">
        <Ionicons
          name={icon}
          size={23}
          color="#153D2E"
        />
      </View>

      <View className="flex-1">
        <Text
          className="text-[14px] text-ink"
          style={{ fontFamily: "Manrope-Bold" }}
        >
          {title}
        </Text>

        <Text
          className="mt-1 text-[12px] text-muted"
          style={{ fontFamily: "Manrope-Regular" }}
        >
          {description}
        </Text>
      </View>

      <Ionicons
        name={selected ? "checkmark-circle" : "ellipse-outline"}
        size={22}
        color={selected ? "#153D2E" : "#64746A"}
      />
    </Pressable>
  );
}
