import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { Pressable, Text, View, ScrollView, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { ProgressBar } from "@/components/ui/progress-bar";
import { Input } from "@/components/ui/input";
import { SelectionTile } from "@/components/ui/selectionTile";
import { OptionCard } from "@/components/ui/optionCard";
import { DateField } from "@/components/ui/dateField";

import { CalendarPicker } from "@/components/ui/CalendarPicker";
import { Button } from "@/components/ui/button";

type GoalPurpose =
  "laptop" | "education" | "emergency" | "travel" | "vehicle" | "other";

const goalPurposes: {
  label: string;
  value: GoalPurpose;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { label: "Technology", value: "laptop", icon: "laptop-outline" },
  { label: "Education", value: "education", icon: "school-outline" },
  { label: "Emergency", value: "emergency", icon: "shield-checkmark-outline" },
  { label: "Travel", value: "travel", icon: "airplane-outline" },
  { label: "Vehicle", value: "vehicle", icon: "car-outline" },
  { label: "Other", value: "other", icon: "apps-outline" },
];

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function CreateGoalsScreen() {
  const [selectedPurpose, setSelectedPurpose] = useState<GoalPurpose | null>(
    null,
  );

  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  const [targetDate, setTargetDate] = useState("");
  const [savingsType, setSavingsType] = useState<"target" | "flexible">(
    "target",
  );

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [draftDate, setDraftDate] = useState(new Date());

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const openDatePicker = () => {
    setDraftDate(selectedDate);
    setShowDatePicker(true);
  };

  const saveDate = () => {
    setSelectedDate(draftDate);
    setTargetDate(formatDate(draftDate));
    setShowDatePicker(false);
  };

  const { width: screenWidth } = useWindowDimensions();

  const purposeColumns = screenWidth < 360 ? 2 : 3;

  return (
    <SafeAreaView className="flex-1 bg-ivory" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-8"
        showsVerticalScrollIndicator={false}
      >
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
              STEP 1 OF 2
            </Text>

            <Text
              className="text-[12px] text-forest"
              style={{ fontFamily: "Manrope-SemiBold" }}
            >
              Goal details
            </Text>
          </View>

          <ProgressBar progress={50} />
        </View>

        {/* Savings purpose */}
        <View className="mt-6">
          <Text
            className="mt-3 text-[20px] text-ink"
            style={{ fontFamily: "Manrope-Bold" }}
          >
            What are you saving for?
          </Text>

          <Text
            className="mb-4 mt-1 text-[12px] text-muted"
            style={{ fontFamily: "Manrope-Regular" }}
          >
            Choose a purpose for your savings goal.
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginHorizontal: -6,
            }}
          >
            {goalPurposes.map((purpose) => (
              <View
                key={purpose.value}
                style={{
                  width: `${100 / purposeColumns}%`,
                  paddingHorizontal: 6,
                  marginBottom: 12,
                }}
              >
                <SelectionTile
                  title={purpose.label}
                  icon={purpose.icon}
                  selected={selectedPurpose === purpose.value}
                  onPress={() => setSelectedPurpose(purpose.value)}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Goal details */}
        <View className="mt-5 gap-2">
          <Input
            label="Goal name"
            value={goalName}
            onChangeText={setGoalName}
            placeholder="e.g. My new laptop"
          />

          <Input
            label="Target amount (GH₵)"
            value={targetAmount}
            onChangeText={setTargetAmount}
            placeholder="e.g. 3000"
            keyboardType="decimal-pad"
          />
        </View>

        {/* Target date */}
        <View className="mt-2">
          <DateField
            label="Target date"
            value={targetDate}
            placeholder="Choose a target date"
            onPress={openDatePicker}
          />
        </View>

        {/* Savings method */}
        <View className="mt-6">
          <Text
            className="mb-1 text-base text-ink"
            style={{ fontFamily: "Manrope-Bold" }}
          >
            Choose your savings method
          </Text>

          <Text
            className="mb-4 text-sm text-muted"
            style={{ fontFamily: "Manrope-Regular" }}
          >
            Select how you want to save towards your goal.
          </Text>

          <View
            style={{
              flexDirection: "row",
              gap: 12,
            }}
          >
            <View style={{ flex: 1 }}>
              <OptionCard
                title="Target Savings"
                description="Save towards your target with withdrawal restrictions."
                icon="lock-closed-outline"
                selected={savingsType === "target"}
                onPress={() => setSavingsType("target")}
                variant="forest"
              />
            </View>

            <View style={{ flex: 1 }}>
              <OptionCard
                title="Flexible Savings"
                description="Save and withdraw whenever you need."
                icon="wallet-outline"
                selected={savingsType === "flexible"}
                onPress={() => setSavingsType("flexible")}
                variant="sage"
              />
            </View>
          </View>
        </View>

        <View className="mt-6">
          <Button
            title="Continue ->"
            onPress={() => {
              router.push('/funding-details')
            }}
            variant="accent"
            className="w-full rounded-[14px] px-4 py-0"
          />
        </View>
      </ScrollView>

      {/* Centered date-picker modal */}
      <Modal
        visible={showDatePicker}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View className="flex-1 justify-center bg-black/40 px-4 py-4">
          <View className="rounded-3xl bg-white p-5">
            <View className="mb-1 flex-row items-center justify-between">
              <Text
                className="text-[20px] text-ink"
                style={{ fontFamily: "Manrope-Bold" }}
              >
                Choose target date
              </Text>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close date picker"
                onPress={() => setShowDatePicker(false)}
                className="h-9 w-9 items-center justify-center rounded-full bg-sage"
              >
                <Ionicons name="close" size={20} color="#153D2E" />
              </Pressable>
            </View>

            <Text
              className="mb-4 mt-1 text-[13px] text-muted"
              style={{ fontFamily: "Manrope-Regular" }}
            >
              When do you want to reach your goal?
            </Text>

            <CalendarPicker
              value={draftDate}
              minimumDate={new Date()}
              onChange={setDraftDate}
            />

            <View className="mt-5 flex-row gap-3">
              <Pressable
                accessibilityRole="button"
                onPress={() => setShowDatePicker(false)}
                className="h-12 flex-1 items-center justify-center rounded-xl bg-sage"
              >
                <Text
                  className="text-[14px] text-ink"
                  style={{ fontFamily: "Manrope-SemiBold" }}
                >
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                onPress={saveDate}
                className="h-12 flex-1 items-center justify-center rounded-xl bg-forest"
              >
                <Text
                  className="text-[14px] text-white"
                  style={{ fontFamily: "Manrope-Bold" }}
                >
                  Save date
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
