
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type OptionCardProps = {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  selected: boolean;
  onPress: () => void;
  variant?: "forest" | "sage";
};

export function OptionCard({
  title,
  description,
  icon,
  selected,
  onPress,
  variant = "sage",
}: OptionCardProps) {
  const isForest = variant === "forest";

  const backgroundColor = isForest ? "#153D2E" : "#DDE9E0";
  const titleColor = isForest ? "#FFFFFF" : "#153D2E";
  const descriptionColor = isForest ? "#DDE9E0" : "#52675A";
  const iconBackground = isForest ? "#285441" : "#FFFFFF";
  const iconColor = isForest ? "#C4F06A" : "#153D2E";

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={{
       width: "100%",
        minHeight: 170,
        padding: 14,
        borderRadius: 20,
        backgroundColor,
        borderWidth: selected ? 2 : 1,
        borderColor: selected
          ? isForest
            ? "#C4F06A"
            : "#153D2E"
          : isForest
            ? "#153D2E"
            : "#DDE9E0",
      }}
    >
      {/* Icon and selection indicator */}
      <View className="mb-3 flex-row items-start justify-between">
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            backgroundColor: iconBackground,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name={icon} size={23} color={iconColor} />
        </View>

        <Ionicons
          name={selected ? "checkmark-circle" : "ellipse-outline"}
          size={22}
          color={selected ? (isForest ? "#C4F06A" : "#153D2E") : descriptionColor}
        />
      </View>

      {/* Card content */}
      <Text
        style={{
          fontFamily: "Manrope-Bold",
          fontSize: 14,
          lineHeight: 20,
          color: titleColor,
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          marginTop: 6,
          fontFamily: "Manrope-Regular",
          fontSize: 11,
          lineHeight: 16,
          color: descriptionColor,
        }}
      >
        {description}
      </Text>
    </Pressable>
  );
}
