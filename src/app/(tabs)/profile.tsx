import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PlaceholderScreen() {
  return (
    <SafeAreaView className="flex-1 bg-ivory">
      <View className="flex-1 items-center justify-center px-6">
        <Text
          className="text-2xl text-ink"
          style={{ fontFamily: "Manrope-Bold" }}
        >
          Profile
        </Text>

        <Text
          className="text-center mt-2 text-muted "
          style={{ fontFamily: "Manrope-Bold" }}
        >
          This screen would be implemented soon
        </Text>
      </View>
    </SafeAreaView>
  );
}
