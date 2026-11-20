
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type DateFieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  onPress: () => void;
};

export function DateField({
  label,
  value,
  placeholder = "Choose a date",
  onPress,
}: DateFieldProps) {
  const hasValue = value.trim().length > 0;

  return (
    <View className="gap-2">
      <Text
        className="text-[13px] text-ink"
        style={{ fontFamily: "Manrope-SemiBold" }}
      >
        {label}
      </Text>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${hasValue ? value : placeholder}`}
        onPress={onPress}
        className="h-[52px] flex-row items-center justify-between rounded-xl border border-border bg-white px-4"
      >
        <Text
          className={`text-[14px] ${
            hasValue ? "text-ink" : "text-muted"
          }`}
          style={{ fontFamily: "Manrope-Regular" }}
        >
          {hasValue ? value : placeholder}
        </Text>

        <Ionicons
          name="calendar-outline"
          size={20}
          color="#64746A"
        />
      </Pressable>
    </View>
  );
}
