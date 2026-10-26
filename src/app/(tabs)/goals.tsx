
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Card } from "@/components/ui/card";
import { GoalCard, type Goal } from "@/components/ui/goalCard";
import { Button } from "@/components/ui/button";

type GoalStatus = "in-progress" | "completed";
type GoalFilter = "all" | GoalStatus;

const goals: Goal[] = [
  {
    id: "laptop",
    name: "Laptop Fund",
    type: "Target savings",
    saved: 1860,
    target: 3000,
    progress: 62,
    status: "in-progress",
    detail: "Target · 30 Sep 2027",
    icon: "laptop-outline",
  },
  {
    id: "emergency",
    name: "Emergency Fund",
    type: "Flexible savings",
    saved: 3000,
    target: 7500,
    progress: 40,
    status: "in-progress",
    detail: "Withdraw when needed",
    icon: "medical-outline",
  },
];

export default function GoalsScreen() {
  const [activeFilter, setActiveFilter] = useState<GoalFilter>("all");

  const filters: { label: string; value: GoalFilter }[] = [
    { label: "All goals", value: "all" },
    { label: "In progress", value: "in-progress" },
    { label: "Completed", value: "completed" },
  ];

  const visibleGoals = goals.filter((goal) => {
    if (activeFilter === "all") return true;
    return goal.status === activeFilter;
  });

  const sectionTitle =
    activeFilter === "completed"
      ? "COMPLETED"
      : "IN PROGRESS";

  return (
    <SafeAreaView className="flex-1 bg-ivory" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back"
            onPress={() => {
              // Back navigation will be connected later.
            }}
            className="mr-2 h-9 w-9 items-center justify-center"
          >
            <Ionicons name="arrow-back" size={26} color="#153D2E" />
          </Pressable>

          <Text
            className="flex-1 text-[20px] text-ink"
            style={{ fontFamily: "Manrope-Bold" }}
          >
            Your savings goals
          </Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Create a new goal"
            onPress={() => router.push("/create-goal")}
            className="h-9 w-9 items-center justify-center"
          >
            <Ionicons name="add" size={27} color="#153D2E" />
          </Pressable>
        </View>

        <Text
          className="mb-5 mt-1 text-[13px] text-muted"
          style={{ fontFamily: "Manrope-Regular" }}
        >
          Every goal brings you closer.
        </Text>

        {/* Total savings summary */}
        <Card className="h-[128px] rounded-[18px] bg-forest px-[18px] pt-3.5">
          <Text
            className="text-[10px] text-sage"
            style={{ fontFamily: "Manrope-Bold" }}
          >
            TOTAL SAVED
          </Text>

          <Text
            className="mt-1.5 text-[30px] text-white"
            style={{ fontFamily: "Manrope-Bold" }}
          >
            GH₵4,860.00
          </Text>

          <Text
            className="mt-1 text-[12px] text-sage"
            style={{ fontFamily: "Manrope-Regular" }}
          >
            2 active goals
          </Text>
        </Card>

        {/* Filters */}
        <View className="mt-5 flex-row gap-2">
          {filters.map((filter) => {
            const selected = activeFilter === filter.value;

            const widthClass =
              filter.value === "all"
                ? "w-[100px]"
                : filter.value === "in-progress"
                  ? "w-[132px]"
                  : "w-[105px]";

            return (
              <Pressable
                key={filter.value}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => setActiveFilter(filter.value)}
                className={`h-[38px] ${widthClass} items-center justify-center rounded-xl ${
                  selected ? "bg-forest" : "bg-white"
                }`}
              >
                <Text
                  className={`text-[12px] ${
                    selected ? "text-white" : "text-ink"
                  }`}
                  style={{
                    fontFamily: selected
                      ? "Manrope-Bold"
                      : "Manrope-Medium",
                  }}
                >
                  {filter.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Goal list */}
        <Text
          className="mb-3 mt-5 text-[10px] text-muted"
          style={{ fontFamily: "Manrope-Bold" }}
        >
          {sectionTitle}
        </Text>

        {visibleGoals.length > 0 ? (
          visibleGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onPress={() => {
                // Goal details navigation will be added later.
              }}
            />
          ))
        ) : (
          <Card className="items-center rounded-[16px] bg-white px-5 py-8">
            <Ionicons name="flag-outline" size={30} color="#64746A" />

            <Text
              className="mt-3 text-[14px] text-ink"
              style={{ fontFamily: "Manrope-SemiBold" }}
            >
              {activeFilter === "completed"
                ? "No completed goals yet"
                : "No savings goals yet"}
            </Text>

            <Text
              className="mt-1 text-center text-[12px] text-muted"
              style={{ fontFamily: "Manrope-Regular" }}
            >
              {activeFilter === "completed"
                ? "Your completed goals will appear here."
                : "Create a goal to start saving."}
            </Text>
          </Card>
        )}

        {/* Create goal button */}
        <Button
          title="＋ Create a new goal"
          onPress={() => {
            // Create Goal navigation will be added later.
          }}
          variant="accent"
          className="mt-2 h-[52px] rounded-[15px] px-0 py-0"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
