import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ProgressBar } from "@/components/ui/progress-bar";

import { DateField } from "@/components/ui/dateField";
import { CalendarPicker } from "@/components/ui/calendarPicker";

import { GoalName } from "@/components/ui/goalName";

type FundingMethod = "manual" | "automatic";
type ContributionFrequency = "daily" | "weekly" | "monthly";
type FundingSource = "momo" | "bank";

type FundingConfiguration = {
  method: FundingMethod;
  startDate: string;
  automatic: {
    amount: number;
    frequency: ContributionFrequency;
    source: FundingSource;
  } | null;
};

const formatDisplayDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateForRoute = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default function FundingDetailsScreen() {
  const { purpose, goalName, targetAmount, targetDate, savingsType } =
    useLocalSearchParams<{
      purpose: string;
      goalName: string;
      targetAmount: string;
      targetDate: string;
      savingsType: string;
    }>();

  const parsedTargetAmount = Number(targetAmount);

  const formattedTargetAmount = parsedTargetAmount.toLocaleString("en-GH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedTargetDate = formatDisplayDate(targetDate);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [selectedStartDate, setSelectedStartDate] = useState(today);
  const [draftStartDate, setDraftStartDate] = useState(today);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);

  const openStartDatePicker = () => {
    setDraftStartDate(selectedStartDate);
    setShowStartDatePicker(true);
  };

  const handleConfirmStartDate = () => {
    setSelectedStartDate(draftStartDate);
    setShowStartDatePicker(false);
  };

  const [fundingMethod, setFundingMethod] =
    useState<FundingMethod>("automatic");

  const [frequency, setFrequency] = useState<ContributionFrequency>("weekly");
  const [amount, setAmount] = useState("100");
  const [source, setSource] = useState<FundingSource>("momo");
  const [amountError, setAmountError] = useState("");

  const handleContinue = () => {
    setAmountError("");

    if (
      selectedStartDate < today ||
      selectedStartDate > new Date(`${targetDate}T00:00:00`)
    ) {
      Alert.alert(
        "Invalid start date",
        "Your start date must be between today and your target date.",
      );
      return;
    }

    let configuration: FundingConfiguration;

    if (fundingMethod === "automatic") {
      const parsedAmount = Number(amount);

      if (
        amount.trim() === "" ||
        !Number.isFinite(parsedAmount) ||
        parsedAmount <= 0
      ) {
        setAmountError("Enter a contibution amount greater than Zero.");
        return;
      }

      const decimalPlaces = amount.trim().split(".")[1]?.length ?? 0;

      if (decimalPlaces > 2) {
        setAmountError("Enter an amount with no more than two decimal places.");
        return;
      }

      configuration = {
        method: "automatic",
        startDate: formatDateForRoute(selectedStartDate),
        automatic: {
          amount: Math.round(parsedAmount * 100) / 100,
          frequency,
          source,
        },
      };
    } else {
      configuration = {
        method: "manual",
        startDate: formatDateForRoute(selectedStartDate),
        automatic: null,
      };
    }
  
    router.push({
      pathname: "/review-plan",
      params: {
        purpose,
        goalName,
        targetAmount,
        targetDate,
        savingsType,
        startDate: configuration.startDate,
        fundingMethod: configuration.method,
        contributionAmount: configuration.automatic?.amount.toString() ?? "",
        frequency: configuration.automatic?.frequency ?? "",
        source: configuration.automatic?.source ?? "",

      }
    })
   
  };

  const selectMethod = (method: FundingMethod) => {
    setFundingMethod(method);
    setAmountError("");
  };

  const frequencyOptions: {
    label: string;
    value: ContributionFrequency;
  }[] = [
    {
      label: "Daily",
      value: "daily",
    },
    {
      label: "Weekly",
      value: "weekly",
    },
    {
      label: "Monthly",
      value: "monthly",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-ivory">
      <View className="flex-1 px-5 pt-4">
        {/* Header */}
        <View className="mt-2 flex-row items-center">
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
            Create a savings goal
          </Text>
        </View>

        {/* Step indicator */}
        <View className="mt-6">
          <View className="mb-2 flex-row items-center justify-between">
            <Text
              className="mt-2 text-[12px] text-muted"
              style={{ fontFamily: "Manrope-Medium" }}
            >
              STEP 2 OF 2
            </Text>

            <Text
              className="text-[12px] text-forest"
              style={{ fontFamily: "Manrope-SemiBold" }}
            >
              Funding details
            </Text>
          </View>

          <ProgressBar progress={100} />
        </View>

        <ScrollView
          className="mt-5 flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          {/* Goal summary */}
          <Card className="mt-2 rounded-card border border-border bg-white p-4">
            <View className="mb-3 flex-row items-center">
              <View
                className="mr-3 items-center justify-center rounded-full bg-sage"
                style={{
                  width: 56,
                  height: 56,
                  minWidth: 56,
                  minHeight: 56,
                  flexShrink: 0,
                  aspectRatio: 1,
                  borderRadius: 28,
                }}
              >
                <Ionicons name="wallet-outline" size={36} color="#153D2E" />
              </View>

              <View className="flex-1">
               <GoalName name={goalName} className="ml-1" />
              </View>

              <Ionicons name="checkmark-circle" size={22} color="#26734D" />
            </View>

            <View
              className="mb-3 w-full"
              style={{
                height: 2,
                backgroundColor: "#E7E9E2",
              }}
            />

            <View className="mt-1 flex-row items-center justify-between">
              <View>
                <Text
                  className="text-xs text-muted"
                  style={{ fontFamily: "Manrope-Regular" }}
                >
                  Target Amount
                </Text>

                <Text
                  className="mt-1 text-xl font-extrabold text-forest"
                  style={{ fontFamily: "Manrope-ExtraBold" }}
                >
                  {`GH₵${formattedTargetAmount}`}
                </Text>
              </View>

              <View className="items-end">
                <Text
                  className="text-xs text-muted"
                  style={{ fontFamily: "Manrope-Regular" }}
                >
                  Target date
                </Text>

                <Text
                  className="mt-1 text-sm font-bold text-ink"
                  style={{ fontFamily: "Manrope-Bold" }}
                >
                  {formattedTargetDate}
                </Text>
              </View>
            </View>
          </Card>

          {/* Start date selection */}
          <View className="mt-5">
            <DateField
              label="Start date"
              value={selectedStartDate.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
              placeholder="Select a start date"
              onPress={openStartDatePicker}
            />
          </View>

          {/* Funding method */}
          <View className="mt-6">
            <Text
              className="text-[18px] text-ink"
              style={{ fontFamily: "Manrope-Bold" }}
            >
              How would you like to save?
            </Text>

            <Text
              className="mt-1 text-[12px] text-muted"
              style={{ fontFamily: "Manrope-Regular" }}
            >
              Choose how you want to add money to this goal.
            </Text>
          </View>

          {/* Manual contributions option */}
          <Pressable
            accessibilityRole="radio"
            accessibilityState={{ selected: fundingMethod === "manual" }}
            onPress={() => selectMethod("manual")}
            className={`mt-4 rounded-card border bg-white p-4 ${
              fundingMethod === "manual" ? "border-forest" : "border-border"
            }`}
          >
            <View className="flex-row items-start">
              <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-sage">
                <Ionicons name="hand-left-outline" size={23} color="#153D2E" />
              </View>

              <View className="flex-1">
                <Text
                  className="text-[15px] text-ink"
                  style={{ fontFamily: "Manrope-Bold" }}
                >
                  Manual contributions
                </Text>

                <Text
                  className="mt-1 text-[12px] text-muted"
                  style={{ fontFamily: "Manrope-Regular" }}
                >
                  Add money whenever you choose. You stay in control of when and
                  how much you contribute.
                </Text>
              </View>

              <Ionicons
                name={
                  fundingMethod === "manual"
                    ? "checkmark-circle"
                    : "ellipse-outline"
                }
                size={22}
                color={fundingMethod === "manual" ? "#26734D" : "#64746A"}
              />
            </View>
          </Pressable>

          {/* Automatic contributions */}
          <Pressable
            accessibilityRole="radio"
            accessibilityState={{ selected: fundingMethod === "automatic" }}
            onPress={() => selectMethod("automatic")}
            className={`mt-4 rounded-card border bg-white p-4 ${
              fundingMethod === "automatic" ? "border-forest" : "border-border"
            }`}
          >
            <View className="flex-row items-start">
              <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-sage">
                <Ionicons name="hand-left-outline" size={23} color="#153D2E" />
              </View>

              <View className="flex-1">
                <Text
                  className="text-[15px] text-ink"
                  style={{ fontFamily: "Manrope-Bold" }}
                >
                  Automatic contributions
                </Text>

                <Text
                  className="mt-1 text-[12px] text-muted"
                  style={{ fontFamily: "Manrope-Regular" }}
                >
                  Plan regular contributions on a schedule that suits you.
                </Text>
              </View>

              <Ionicons
                name={
                  fundingMethod === "automatic"
                    ? "checkmark-circle"
                    : "ellipse-outline"
                }
                size={22}
                color={fundingMethod === "automatic" ? "#26734D" : "#64746A"}
              />
            </View>
          </Pressable>

          {/* Conditional automatic contribution settings */}
          {fundingMethod === "automatic" && (
            <View className="mt-5">
              <Text
                className="text-[15px] text-ink"
                style={{ fontFamily: "Manrope-Bold" }}
              >
                Contribution frequency
              </Text>

              <View className="mt-3 flex-row gap-2 mb-3">
                {frequencyOptions.map((option) => {
                  const selected = frequency === option.value;

                  return (
                    <Pressable
                      key={option.value}
                      accessibilityRole="radio"
                      accessibilityState={{ selected }}
                      onPress={() => setFrequency(option.value)}
                      className={`flex-1 items-center justify-center rounded-xl border px-2 py-3 ${
                        selected
                          ? "border-forest bg-sage"
                          : "border-border bg-white"
                      }`}
                    >
                      <Text
                        className={`text-[12px] ${
                          selected ? "text-forest" : "text-ink"
                        }`}
                        style={{
                          fontFamily: selected
                            ? "Manrope-Bold"
                            : "Manrope-Medium",
                        }}
                      >
                        {option.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              {/* Contribution amount */}
              <Input
                label="Contribution amount (GH₵)"
                value={amount}
                onChangeText={(value) => {
                  setAmount(value);
                  setAmountError("");
                }}
                placeholder="100"
                keyboardType="decimal-pad"
                error={amountError}
              />

              {amountError ? (
                <Text
                  accessibilityRole="alert"
                  className="mt-2 text-[12px] text-red-600"
                  style={{ fontFamily: "Manrope-Medium" }}
                >
                  {amountError}
                </Text>
              ) : null}

              {/* Funding source */}
              <Text
                className="mb-2 mt-5 text-[15px] text-ink"
                style={{ fontFamily: "Manrope-Bold" }}
              >
                Preferred funding source
              </Text>

              <View className="flex-row gap-3">
                <Pressable
                  accessibilityRole="radio"
                  accessibilityState={{ selected: source === "momo" }}
                  onPress={() => setSource("momo")}
                  className={`flex-1 rounded-xl border bg-white p-3 ${
                    source === "momo" ? "border-forest" : "border-border"
                  }`}
                >
                  <Ionicons
                    name="phone-portrait-outline"
                    size={23}
                    color="#153D2E"
                  />

                  <Text
                    className="mt-2 text-[12px] text-ink"
                    style={{ fontFamily: "Manrope-SemiBold" }}
                  >
                    Mobile Money
                  </Text>

                  <View className="mt-2 flex-row items-center">
                    <Ionicons
                      name={
                        source === "momo"
                          ? "checkmark-circle"
                          : "ellipse-outline"
                      }
                      size={17}
                      color={source === "momo" ? "#26734D" : "#64746A"}
                    />

                    <Text
                      className="ml-1 text-[10px] text-muted"
                      style={{ fontFamily: "Manrope-Regular" }}
                    >
                      {source === "momo" ? "Selected" : "Select"}
                    </Text>
                  </View>
                </Pressable>

                <Pressable
                  accessibilityRole="radio"
                  accessibilityState={{ selected: source === "bank" }}
                  onPress={() => setSource("bank")}
                  className={`flex-1 rounded-xl border bg-white p-3 ${
                    source === "bank" ? "border-forest" : "border-border"
                  }`}
                >
                  <Ionicons name="business-outline" size={23} color="#153D2E" />

                  <Text
                    className="mt-2 text-[12px] text-ink"
                    style={{ fontFamily: "Manrope-SemiBold" }}
                  >
                    Bank account
                  </Text>

                  <View className="mt-2 flex-row items-center">
                    <Ionicons
                      name={
                        source === "bank"
                          ? "checkmark-circle"
                          : "ellipse-outline"
                      }
                      size={17}
                      color={source === "bank" ? "#26734D" : "#64746A"}
                    />

                    <Text
                      className="ml-1 text-[10px] text-muted"
                      style={{ fontFamily: "Manrope-Regular" }}
                    >
                      {source === "bank" ? "Selected" : "Select"}
                    </Text>
                  </View>
                </Pressable>
              </View>

              {/* Planned contribution summary */}
              <View className="mt-5 rounded-card bg-sage p-4">
                <Text
                  className="text-[12px] text-forest"
                  style={{ fontFamily: "Manrope-SemiBold" }}
                >
                  YOUR PLANNED CONTRIBUTION
                </Text>

                <Text
                  className="mt-2 text-[24px] text-forest"
                  style={{ fontFamily: "Manrope-ExtraBold" }}
                >
                  GH₵
                  {Number(amount) > 0 && Number.isFinite(Number(amount))
                    ? Number(amount).toLocaleString("en-GH", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : "0.00"}
                </Text>

                <Text
                  className="mt-1 text-[12px] text-forest"
                  style={{ fontFamily: "Manrope-Medium" }}
                >
                  Per{" "}
                  {frequency === "daily"
                    ? "day"
                    : frequency === "weekly"
                      ? "week"
                      : "month"}{" "}
                  · {source === "momo" ? "Mobile Money" : "Bank account"}
                </Text>
              </View>
            </View>
          )}

          {/* Disclosure */}
          <View className="mt-4 flex-row items-start rounded-xl bg-sage p-3">
            <Ionicons
              name="information-circle-outline"
              size={20}
              color="#153D2E"
              style={{ marginRight: 8 }}
            />

            <Text
              className="flex-1 text-[12px] text-forest"
              style={{ fontFamily: "Manrope-Regular" }}
            >
              {fundingMethod === "automatic"
                ? "This is a proposed contribution schedule. Automatic debits are not enabled yet. A supported provider, your authorization, and backend setup will be required before any money can be collected."
                : "You can contribute manually whenever you choose. Payment processing and deposits will be connected separately."}
            </Text>
          </View>

          {/* Continue action */}
          <Button
            title="Continue"
            onPress={handleContinue}
            variant="accent"
            className="mt-6"
          />

          <Pressable
            accessibilityRole="button"
            onPress={() => router.back()}
            className="mt-4 items-center py-2"
          >
            <Text
              className="text-[13px] text-forest"
              style={{ fontFamily: "Manrope-SemiBold" }}
            >
              Back to goal details
            </Text>
          </Pressable>
        </ScrollView>
      </View>
      <Modal
        visible={showStartDatePicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowStartDatePicker(false)}
      >
        <View className="flex-1 justify-center bg-black/40 px-4 py-4">
          <View className="rounded-3xl bg-ivory p-5">
            <View className="mb-5 flex-row items-center justify-between">
              <Text
                className="text-lg text-ink"
                style={{ fontFamily: "Manrope-bold" }}
              >
                Select Start date
              </Text>

              <Pressable
                onPress={() => setShowStartDatePicker(false)}
                accessibilityRole="button"
                accessibilityLabel="Close calendar"
              >
                <Ionicons name="close" size={24} color="#153D2E" />
              </Pressable>
            </View>

            <CalendarPicker
              value={draftStartDate}
              minimumDate={today}
              maximumDate={new Date(`${targetDate}T00:00:00`)}
              onChange={setDraftStartDate}
            />

            <View className="mt-5 flex-row gap-3">
              <View className="flex-1">
                <Button
                  title="Cancel"
                  variant="secondary"
                  onPress={() => setShowStartDatePicker(false)}
                />
              </View>
              <View className="flex-1">
                <Button
                  title="Confirm"
                  variant="accent"
                  onPress={handleConfirmStartDate}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
