import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { ProgressBar } from "@/components/ui/progress-bar";
import { Card } from "@/components/ui/card";

export default function FundingDetailsScreen() {
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

        {/* Screen content will be added section by section */}
        <ScrollView
          className="mt-5 flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          <Card className="rounded-card border border-border bg-white p-4 mt-2">
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
                <Text
                  className="text-sm font-medium text-muted"
                  style={{ fontFamily: "Manrope-Medium" }}
                >
                  YOUR SAVINGS GOAL
                </Text>
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

            <View className="flex-row items-center justify-between mt-1">
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
                  GH₵10,000.00
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
                  31 Dec 2026
                </Text>
              </View>
            </View>
          </Card>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
