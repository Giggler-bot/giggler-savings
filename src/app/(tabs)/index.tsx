import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-ivory">
      <View className="flex-1 gap-4 p-6">
        <Text className="text-2xl font-bold text-ink">Component test</Text>

        <Card className="bg-white">
          <Text className="text-sm text-muted">Total savings</Text>
          <Text className="mt-2 text-3xl font-extrabold text-forest">
            GH₵4,860.00
          </Text>
          <Text className="mt-1 text-sm text-muted">
            Across your savings goals
          </Text>
        </Card>

        <Card className="bg-sage">
          <Text className="text-lg font-bold text-ink">Laptop Fund</Text>
          <Text className="mt-2 text-muted">GH₵1,860 saved of GH₵3,000</Text>
          <View className="mt-4">
            <Button
              title="View goal"
              onPress={() =>
                Alert.alert("Laptop Fund", "Your goal card works!")
              }
            />
          </View>

          <View className="mt-4">
            <ProgressBar progress={100} />
          </View>

          <View className="mt-2 flex-row justify-between">
            <Text className="text-sm font-bold text-forest">100% completed</Text>
            <Text className="text-sm text-muted">GH₵1,140 remaining</Text>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
}
