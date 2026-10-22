
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import YourGoals from "@/components/home/your-goals";
import RecentActivity from "@/components/home/recent-activity";


export default function HomeScreen() {
  const [balanceVisible, setBalanceVisible] = useState(true);

  const totalSavings = "GH₵4,860.00";

  return (
    <SafeAreaView className="flex-1 bg-ivory">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-8"
        showsVerticalScrollIndicator={false}
      >
        {/* Dashboard header */}
        <View className="mb-6 mt-3 flex-row items-center justify-between">
          <View className="flex-1 pr-3">
            <Text
              className="text-[21px] text-ink"
              style={{ fontFamily: "Manrope-Bold" }}
            >
              Good morning, Ama 👋
            </Text>

            <Text
              className="mt-1 text-[13px] text-muted"
              style={{ fontFamily: "Manrope-Regular" }}
            >
              Let’s keep your goals moving.
            </Text>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open profile"
            onPress={() =>
              Alert.alert("Profile", "Your profile screen is coming soon.")
            }
            className="h-11 w-11 items-center justify-center rounded-full bg-sage"
          >
            <Text
              className="text-base text-forest"
              style={{ fontFamily: "Manrope-Bold" }}
            >
              A
            </Text>
          </Pressable>
        </View>

        {/* Total savings card */}
        <View className="rounded-balance bg-forest px-5 pb-5 pt-5">
          <View className="flex-row items-center justify-between">
            <Text
              className="text-[10px] uppercase tracking-[1px] text-white"
              style={{ fontFamily: "Manrope-Bold" }}
            >
              TOTAL SAVINGS
            </Text>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={
                balanceVisible ? "Hide savings balance" : "Show savings balance"
              }
              onPress={() => setBalanceVisible((visible) => !visible)}
              hitSlop={10}
              className="h-9 w-9 items-center justify-center rounded-full"
            >
              <Ionicons
                name={balanceVisible ? "eye-outline" : "eye-off-outline"}
                size={21}
                color="#FFFFFF"
              />
            </Pressable>
          </View>

          <Text
            className="mt-1 text-[30px] text-white"
            style={{ fontFamily: "Manrope-ExtraBold" }}
          >
            {balanceVisible ? totalSavings : "GH₵••••••"}
          </Text>

          <Text
            className="mt-1 text-[12px] text-white"
            style={{ fontFamily: "Manrope-Regular" }}
          >
            Across all your savings goals
          </Text>

          <View className="mt-5 flex-row items-center justify-between">
            <Pressable
              accessibilityRole="button"
              onPress={() =>
                Alert.alert(
                  "Create a goal",
                  "We'll build the goal creation screen next."
                )
              }
              className="flex-row items-center justify-center rounded-[11px] bg-lime px-4 py-2"
            >
              <Ionicons name="add" size={17} color="#153D2E" />

              <Text
                className="ml-1 text-[12px] text-forest"
                style={{ fontFamily: "Manrope-Bold" }}
              >
                Create a goal
              </Text>
            </Pressable>

            <Text
              className="text-[11px] text-white"
              style={{ fontFamily: "Manrope-Medium" }}
            >
              ✦ Every cedi counts
            </Text>
          </View>
        </View>

         <YourGoals />
         <RecentActivity />
         
      </ScrollView>
    </SafeAreaView>
  );
}
