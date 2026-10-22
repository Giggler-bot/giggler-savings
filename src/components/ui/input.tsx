import { Text, TextInput, View } from "react-native";

type InputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "decimal-pad";
  error?: string;
};

export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  error,
}: InputProps) {
  return (
    <View className="gap-2">
      <Text
        className="text-[13px] text-ink"
        style={{ fontFamily: "Manrope-semiBold" }}
      >
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#64746A"
        keyboardType={keyboardType}
        accessibilityLabel={label}
        className={`h-[52px] rounded-xl border bg-white px-4 text-[14px] text-ink ${error ? "border-error" : "border-border"}`}
        style={{ fontFamily: "Manrope-Regular" }}
      />

      {error ? (
        <Text
          className="text-[12px] text-error"
          style={{ fontFamily: "Manrope-Regular" }}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}
