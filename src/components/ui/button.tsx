import { Pressable, Text } from "react-native";

type ButtonVariant = "primary" | "secondary" | "accent";

type Buttonprops = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-forest",
  secondary: "bg-sage",
  accent: "bg-lime",
};

const variantTextStyles: Record<ButtonVariant, string> = {
  primary: "text-white",
  secondary: "text-ink",
  accent: "text-ink",
};

export function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
}: Buttonprops) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`items-center justify-center rounded-xl px-6 py-4 ${variantStyles[variant]}
      ${disabled ? "opacity-50" : "opacity-100"}
      `}
    >
      <Text className={`text-base font-bold ${variantTextStyles[variant]}`}>
        {title}
      </Text>
    </Pressable>
  );
}
