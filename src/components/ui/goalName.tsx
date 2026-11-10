import { Text } from "react-native";

type GoalNameProps = {
  name: string;
  className?: string;
};

export function GoalName({
  name,
  className = "",
}: GoalNameProps) {
  return (
    <Text
      numberOfLines={1}
      ellipsizeMode="tail"
      className={`text-[15px] text-ink ${className}`}
      style={{
        fontFamily: "Manrope-Bold",
        flexShrink: 1,
      }}
    >
      {name}
    </Text>
  );
}