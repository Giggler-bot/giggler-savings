
import { Alert, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HomeGoalCard } from "../ui/homeGoalCard";

export default function YourGoals() {
  return (
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

      <HomeGoalCard
        name="Laptop Fund"
        detail="Target date: 30 Dec 2026"
        saved="GH₵1,860"
        target="GH₵3,000"
        progress={62}
        milestone="Next milestone: 75%"
        progressColor="forest"
        delay={0}
        onPress={() =>
          Alert.alert("Laptop Fund", "We'll build goal details later.")
        }
        className="mb-3 rounded-goal border border-border bg-white p-4"
      />

      <HomeGoalCard
        name="Emergency Fund"
        detail="Flexible savings"
        saved="GH₵3,000"
        target="GH₵7,500"
        progress={40}
        progressColor="lime"
        delay={120}
        onPress={() =>
          Alert.alert("Emergency Fund", "We'll build goal details later.")
        }
        className="rounded-goal border border-border bg-white p-4 mb-3"
      />

       <HomeGoalCard
        name="Emergency Fund"
        detail="Flexible savings"
        saved="GH₵3,000"
        target="GH₵7,500"
        progress={40}
        progressColor="lime"
        delay={120}
        onPress={() =>
          Alert.alert("Emergency Fund", "We'll build goal details later.")
        }
        className="rounded-goal border border-border bg-white p-4 mb-3"
      />

       <HomeGoalCard
        name="Emergency Fund"
        detail="Flexible savings"
        saved="GH₵3,000"
        target="GH₵7,500"
        progress={40}
        progressColor="lime"
        delay={120}
        onPress={() =>
          Alert.alert("Emergency Fund", "We'll build goal details later.")
        }
        className="rounded-goal border border-border bg-white p-4 mb-3"
      />
    </View>
  );
}
