
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type Goal = {
  id: string;
  name: string;
  type: "Target savings" | "Flexible savings";
  saved: number;
  target: number;
  progress: number;
  status: "in-progress" | "completed";
  detail: string;
  icon: keyof typeof Ionicons.glyphMap;
};

type GoalCardProps = {
  goal: Goal;
  onPress: () => void;
};

const formatMoney = (amount: number) =>
  `GH₵${amount.toLocaleString("en-GH")}`;

export function GoalCard({ goal, onPress }: GoalCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${goal.name}, ${goal.progress}% complete`}
      onPress={onPress}
      className="mb-3"
    >
      <View
        className="h-[166px] rounded-[16px] bg-white p-3.5"
        style={{
          borderWidth: 1,
          borderColor: "#E7E9E2",
          shadowColor: "#153D2E",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.07,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <View className="flex-row items-center">
          <View className="h-[45px] w-[45px] items-center justify-center rounded-xl bg-[#E9F0E3]">
            <Ionicons name={goal.icon} size={23} color="#153D2E" />
          </View>

          <View className="ml-3 flex-1">
            <Text
              className="text-[15px] text-ink"
              style={{ fontFamily: "Manrope-Bold" }}
            >
              {goal.name}
            </Text>

            <Text
              className="mt-1 text-[11px] text-muted"
              style={{ fontFamily: "Manrope-Regular" }}
            >
              {goal.type}
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={17} color="#64746A" />
        </View>

        <Text
          className="mt-3.5 text-[12px] text-ink"
          style={{ fontFamily: "Manrope-Medium" }}
        >
          {formatMoney(goal.saved)} of {formatMoney(goal.target)}
        </Text>

        <View className="mt-3 h-2 overflow-hidden rounded-full bg-sage">
          <View
            className="h-full rounded-full bg-forest"
            style={{ width: `${goal.progress}%` }}
          />
        </View>

        <View className="mt-2 flex-row items-center justify-between">
          <Text
            className="text-[11px] text-forest"
            style={{ fontFamily: "Manrope-Bold" }}
          >
            {goal.progress}% complete
          </Text>

          <Text
            className="text-[10px] text-muted"
            style={{ fontFamily: "Manrope-Regular" }}
          >
            {goal.detail}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
