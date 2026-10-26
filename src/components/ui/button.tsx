
import { useRef } from "react";
import {
  Animated,
  Pressable,
  Text,
} from "react-native";

type ButtonVariant = "primary" | "secondary" | "accent";

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
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
  className = "",
}: ButtonProps) {
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
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <Pressable
        onPress={onPress}
        onPressIn={() => {
          if (!disabled) animateScale(0.93);
        }}
        onPressOut={() => animateScale(1)}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityState={{ disabled }}
        className={`items-center justify-center rounded-xl px-6 py-4 ${
          variantStyles[variant]
        } ${className}`}
      >
        <Text
          className={`text-base font-bold ${variantTextStyles[variant]}`}
          style={{ fontFamily: "Manrope-Bold" }}
        >
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
