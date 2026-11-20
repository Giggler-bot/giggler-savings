
import { Alert, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RecentActivity() {
  return (
    <View className="mt-7">
      <View className="mb-4 flex-row items-center justify-between">
        <Text
          className="text-[20px] text-ink"
          style={{ fontFamily: "Manrope-Bold" }}
        >
          Recent activity
        </Text>

        <Pressable
          accessibilityRole="button"
          onPress={() =>
            Alert.alert("Activity", "Your full activity history is coming soon.")
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

      <View className="flex-row items-center rounded-goal border border-border bg-white p-4">
        <View className="h-11 w-11 items-center justify-center rounded-full bg-sage">
          <Ionicons
            name="arrow-down"
            size={20}
            color="#153D2E"
          />
        </View>

        <View className="ml-3 flex-1">
          <Text
            className="text-[13px] text-ink"
            style={{ fontFamily: "Manrope-Bold" }}
          >
            Laptop Fund contribution
          </Text>

          <Text
            className="mt-1 text-[11px] text-muted"
            style={{ fontFamily: "Manrope-Regular" }}
          >
            Today · Scheduled saving
          </Text>
        </View>

        <Text
          className="text-[13px] text-success"
          style={{ fontFamily: "Manrope-Bold" }}
        >
          +GH₵200
        </Text>
      </View>
    </View>
  );
}
