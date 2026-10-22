import { Alert, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function YourGoals() {
  return (
    /* Savings goals section */
    <View className="mt-7">
      <View className="mb-4 flex-row items-center justify-between">
        <Text
          className="text-[20px] text-ink"
          style={{ fontFamily: "Manrope-Bold" }}
        >
          Your goals
        </Text>

        <Pressable
          accessibilityRole="button"
          onPress={() =>
            Alert.alert("Your goals", "The full goals screen is coming soon.")
          }
          className="flex-row items-center"
        >
          <Text
            className="text-[12px] text-forest"
            style={{ fontFamily: "Manrope-SemiBold" }}
          >
            See all
          </Text>
          <Ionicons
            name="arrow-forward"
            size={14}
            color="#153D2E"
            style={{ marginLeft: 4 }}
          />
        </Pressable>
      </View>

      {/* Laptop Fund */}
      <Pressable
        accessibilityRole="button"
        onPress={() =>
          Alert.alert("Laptop Fund", "We'll build goal details later.")
        }
        className="mb-3 rounded-goal border border-border bg-white p-4"
      >
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-3">
            <Text
              className="text-[15px] text-ink"
              style={{ fontFamily: "Manrope-Bold" }}
            >
              Laptop Fund
            </Text>

            <Text
              className="mt-1 text-[11px] text-muted"
              style={{ fontFamily: "Manrope-Regular" }}
            >
              Target date: 30 Dec 2026
            </Text>
          </View>

          <View className="rounded-full bg-sage px-2.5 py-1">
            <Text
              className="text-[11px] text-forest"
              style={{ fontFamily: "Manrope-Bold" }}
            >
              62%
            </Text>
          </View>
        </View>

        <View className="mt-4 flex-row items-baseline">
          <Text
            className="text-[15px] text-ink"
            style={{ fontFamily: "Manrope-Bold" }}
          >
            GH₵1,860
          </Text>

          <Text
            className="ml-1 text-[11px] text-muted"
            style={{ fontFamily: "Manrope-Regular" }}
          >
            of GH₵3,000
          </Text>
        </View>

        <View className="mt-3 h-2 overflow-hidden rounded-full bg-sage">
          <View className="h-full w-[62%] rounded-full bg-forest" />
        </View>

        <Text
          className="mt-3 text-[11px] text-muted"
          style={{ fontFamily: "Manrope-Medium" }}
        >
          Next milestone: 75%
        </Text>
      </Pressable>

      {/* Emergency Fund */}
      <Pressable
        accessibilityRole="button"
        onPress={() =>
          Alert.alert("Emergency Fund", "We'll build goal details later.")
        }
        className="rounded-goal border border-border bg-white p-4"
      >
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-3">
            <Text
              className="text-[15px] text-ink"
              style={{ fontFamily: "Manrope-Bold" }}
            >
              Emergency Fund
            </Text>

            <Text
              className="mt-1 text-[11px] text-muted"
              style={{ fontFamily: "Manrope-Regular" }}
            >
              Flexible savings
            </Text>
          </View>

          <View className="rounded-full bg-sage px-2.5 py-1">
            <Text
              className="text-[11px] text-forest"
              style={{ fontFamily: "Manrope-Bold" }}
            >
              40%
            </Text>
          </View>
        </View>

        <View className="mt-4 flex-row items-baseline">
          <Text
            className="text-[15px] text-ink"
            style={{ fontFamily: "Manrope-Bold" }}
          >
            GH₵3,000
          </Text>

          <Text
            className="ml-1 text-[11px] text-muted"
            style={{ fontFamily: "Manrope-Regular" }}
          >
            of GH₵7,500
          </Text>
        </View>

        <View className="mt-3 h-2 overflow-hidden rounded-full bg-sage">
          <View className="h-full w-[40%] rounded-full bg-lime" />
        </View>
      </Pressable>
    </View>
  );
}
