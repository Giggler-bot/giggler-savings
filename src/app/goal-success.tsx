import { useLocalSearchParams, router } from "expo-router";
import { Text, View, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/ui/button";

const formatCurrency = (amount: string) => {
  const value = Number(amount);

  if (!Number.isFinite(value)) return "GH₵0.00";

  return `GH₵${value.toLocaleString("en-GH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const formatDisplayDate = (dateString: string) => {
  if (!dateString) return "Not specified";

  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(year, month - 1, day);

  if (Number.isNaN(date.getTime())) return "Not specified";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function GoalSuccessScreen() {
  const params = useLocalSearchParams<{
    goalName: string;
    targetAmount: string;
    targetDate: string;
    fundingMethod: string;
    contributionAmount: string;
    frequency: string;
  }>();

  const isAutomatic = params.fundingMethod === "automatic";

  const targetAmount = formatCurrency(params.targetAmount);

  const targetDate = formatDisplayDate(params.targetDate);

  const frequencyLabels: Record<string, string> = {
    daily: "day",
    weekly: "week",
    monthly: "month",
  };

  const schedule = isAutomatic
    ? `${formatCurrency(params.contributionAmount)} / ${
        frequencyLabels[params.frequency] ?? "Not specified"
      }`
    : "Manual contributions";

  return (
    <SafeAreaView className="flex-1 bg-forest">
      <View className="flex-1 px-5">
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 48,
            paddingBottom: 24,
          }}
        >
          {/* success Content */}
          <View className="items-center">
            {/* Success Icon */}
            <View className="h-28 w-28 items-center justify-center rounded-full bg-white">
              <View className="h-14 w-14 items-center justify-center rounded-full bg-[#00865A]">
                <Ionicons name="checkmark" size={36} color="#FFFFFF" />
              </View>
            </View>

            {/* success Heading */}
            <Text
              className="mt-8 text-center text-[28px] leading-9 text-white"
              style={{ fontFamily: "Manrope-ExtraBold" }}
            >
              Goal created{"\n"}successfully!
            </Text>
            {/* Description */}

            <Text
              className="mt-4 text-center text-[14px] leading-6"
              style={{ fontFamily: "Manrope-Regular", color: "#C5D9D0" }}
            >
              Your{" "}
              <Text style={{ fontFamily: "Manrope-Bold", color: "#FFFFFF" }}>
                {params.goalName || "Savings Goal"}
              </Text>{" "}
              savings goal is ready. You're on your way to saving {targetAmount}
              . Let's make it happen!
            </Text>

            {/* Goal Summary */}
            <View
              className="mt-12 w-full rounded-[24px] border border-white/20 p-5"
              style={{ backgroundColor: "rgba(255,255,255,0.10)" }}
            >
              {/* Target */}
              <View className="mb-5 flex-row items-center justify-between">
                <Text
                  className="text-[13px] text-white/65"
                  style={{ fontFamily: "Manrope-Medium", color: "#B7D0C6" }}
                >
                  Target
                </Text>

                <Text
                  className="text-[15px] text-white"
                  style={{ fontFamily: "Manrope-ExtraBold" }}
                >
                  {targetAmount}
                </Text>
              </View>

              {/* Schedule */}
              <View className="mb-5 flex-row items-center justify-between">
                <Text
                  className="text-[13px] text-white/65"
                  style={{ fontFamily: "Manrope-Medium" }}
                >
                  Schedule
                </Text>

                <Text
                  className="text-[15px] text-white"
                  style={{ fontFamily: "Manrope-ExtraBold" }}
                >
                  {schedule}
                </Text>
              </View>

              {/* Target Date */}
              <View className="flex-row items-center justify-between">
                <Text
                  className="text-[13px] text-white/65"
                  style={{ fontFamily: "Manrope-Medium" }}
                >
                  Target Date
                </Text>

                <Text
                  className="text-[15px] text-white"
                  style={{ fontFamily: "Manrope-ExtraBold" }}
                >
                  {targetDate}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Actions */}
        <View className="gap-3 pb-5">
          <Button
            title="View Goal Details"
            onPress={() => {}}
            variant="secondary"
            className="w-full"
          />

          <Pressable
            accessibilityRole="button"
            onPress={() => {}}
            className="h-14 items-center justify-center rounded-xl border border-white/30 "
          >
            <Text
              className="text-[14px] text-white"
              style={{ fontFamily: "Manrope-Bold" }}
            >
              Back to Dashboard
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
