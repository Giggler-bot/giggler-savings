import { useLocalSearchParams, router } from "expo-router";
import { Text, View, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GoalName } from "@/components/ui/goalName";

const purposeLabels: Record<string, string> = {
  laptop: "Electronics & Gadgets",
  education: "Education",
  emergency: "Emergency",
  travel: "Travel",
  vehicle: "Vehicle",
  other: "Other",
};

const formatDisplayDate = (dateString?: string) => {
  if (!dateString || typeof dateString !== "string") {
    return "Not specified";
  }

  const [year, month, day] = dateString.split("-").map(Number);

  if (!year || !month || !day) {
    return "Not specified";
  }

  const date = new Date(year, month - 1, day);

  if (Number.isNaN(date.getTime())) {
    return "Not specified";
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const frequencyLabels: Record<string, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
};

const sourceLabels: Record<string, string> = {
  momo: "Mobile Money",
  bank: "Bank Account",
};

const formatCurrency = (amount: string) => {
  const parsedAmount = Number(amount);

  if (!Number.isFinite(parsedAmount)) return "GH₵ 0.00";

  return `GH₵ ${parsedAmount.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

type DetailRowProps = {
  label: string;
  value: string;
  valueColor?: string;
  valueSize?: number;
};
function DetailRow({
  label,
  value,
  valueColor = "#24332B",
  valueSize = 13,
}: DetailRowProps) {
  return (
    <View className="mb-4 flex-row items-center justify-between">
      <Text
        className="mr-4 text-[12px] text-muted"
        style={{ fontFamily: "Manrope-Medium" }}
      >
        {label}
      </Text>

      <Text
        className="text-right"
        style={{
          fontFamily: "Manrope-ExtraBold",
          fontSize: valueSize,
          color: valueColor,
          flexShrink: 1,
          minWidth: 0,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
export default function ReviewPlanScreen() {
  const params = useLocalSearchParams<{
    purpose: string;
    goalName: string;
    targetAmount: string;
    targetDate: string;
    savingsType: string;
    startDate: string;
    fundingMethod: string;
    contributionAmount: string;
    frequency: string;
    source: string;
  }>();

  const displayCategory = purposeLabels[params.purpose] ?? "Other";

  const formattedTargetAmount = Number(params.targetAmount).toLocaleString(
    "en-GB",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  );

  const targetDate = formatDisplayDate(params.targetDate);

  const isAutomatic = params.fundingMethod === "automatic";

  const fundingMethodLabel = isAutomatic
    ? "Automatic contributions"
    : "Manual contributions";

  const contributionAmount = formatCurrency(params.contributionAmount);

  const frequencyLabel = frequencyLabels[params.frequency] ?? "Not specified";

  const sourceLabel = sourceLabels[params.source] ?? "Not specified";

  const startDate = formatDisplayDate(params.startDate);

  return (
    <SafeAreaView className="flex-1 bg-ivory">
      <View className="flex-1">
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 24,
          }}
        >
          {/* Header */}
          <View className="flex-row items-center">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              onPress={() => router.back()}
              className="mr-3 h-9 w-9 items-center justify-center"
            >
              <Ionicons name="arrow-back" size={24} color="#153D2E" />
            </Pressable>

            <Text
              className="flex-1 text-[20px] text-ink"
              style={{ fontFamily: "Manrope-Bold" }}
            >
              Review your plan
            </Text>
          </View>

          {/* Introduction */}
          <Text
            className="mt-6 text-[13px] leading-5 text-muted"
            style={{ fontFamily: "Manrope-Regular" }}
          >
            Please review your savings goal and funding schedule before
            finalizing.
          </Text>

          {/* Goal Details Card */}
          <Card className="mt-6 rounded-card border border-border bg-white p-4">
            {/* Card Header */}
            <View className="mb-4 flex-row items-center">
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-sage">
                <Ionicons
                  name="radio-button-on-outline"
                  size={21}
                  color="#153D2E"
                />
              </View>

              <View className="flex-1">
                <Text
                  className="mb-1 text-[15px] text-ink"
                  style={{ fontFamily: "Manrope-Bold" }}
                >
                  Goal Details
                </Text>

                <Text
                  className="text-[12px] text-muted"
                  style={{ fontFamily: "Manrope-Regular" }}
                >
                  What you're saving for
                </Text>
              </View>
            </View>

            {/* Divider */}
            <View
              className="mb-4 w-full"
              style={{
                height: 1,
                backgroundColor: "#E7E9E2",
                borderStyle: "dashed",
              }}
            />

            {/* Goal Name */}
            <View className="mb-4 flex-row items-start justify-between">
              <Text
                className="mr-3 flex-1 text-[12px] text-muted"
                style={{ fontFamily: "Manrope-Medium" }}
              >
                Goal Name
              </Text>

              <View className="flex-1 items-end" style={{ minWidth: 0 }}>
                <GoalName name={params.goalName} className="text-right" />
              </View>
            </View>

            {/* Category */}
            <DetailRow label="Category" value={displayCategory} />

            {/* Target Amount */}
            <DetailRow
              label="Target Amount"
              value={`GH₵ ${formattedTargetAmount}`}
              valueColor="#00865A"
              valueSize={14}
            />

            {/* Target Date */}
            <DetailRow label="Target Date" value={targetDate} />
          </Card>

          {/* Funding Schedule */}
          {/* Funding Plan Card */}
          <Card className="mt-4 rounded-card border border-border bg-white p-4">
            {/* Card Header */}
            <View className="mb-4 flex-row items-center">
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-sage">
                <Ionicons name="wallet-outline" size={21} color="#153D2E" />
              </View>

              <View className="flex-1">
                <Text
                  className="mb-1 text-[15px] text-ink"
                  style={{ fontFamily: "Manrope-Bold" }}
                >
                  Funding Plan
                </Text>

                <Text
                  className="text-[12px] text-muted"
                  style={{ fontFamily: "Manrope-Regular" }}
                >
                  How you'll build your savings
                </Text>
              </View>
            </View>

            {/* Divider */}
            <View
              className="mb-4 w-full"
              style={{
                height: 1,
                backgroundColor: "#E7E9E2",
                borderStyle: "dashed",
              }}
            />

            {/* Funding Method */}
            <DetailRow label="Funding Method" value={fundingMethodLabel} />

            {isAutomatic ? (
              <>
                <DetailRow
                  label="Contribution"
                  value={contributionAmount}
                  valueColor="#00865A"
                  valueSize={14}
                />

                <DetailRow label="Frequency" value={frequencyLabel} />

                <DetailRow label="Funding Source" value={sourceLabel} />

                <DetailRow label="First Deduction" value={startDate} />
              </>
            ) : (
              <DetailRow label="Savings Starts" value={startDate} />
            )}
          </Card>
        </ScrollView>

        {/* Fixed Bottom Action */}
        <View className="border-t border-border bg-ivory px-5 py-4">
          <Button
            title="Confirm & Create Goal"
            onPress={() => {}}
            variant="accent"
            className="w-full"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
