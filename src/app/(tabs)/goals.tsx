import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GoalScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F6F5EF]">
      <View className="flex-1 items-center justify-center px-6">
        <View className="mb-6 h-16 w-16 items-center justify-center rounded-2xl bg-[#153D2E]">
          <Text className="text-3xl font-extrabold text-[#C4F06A]">
            G
          </Text>
        </View>

        <Text className="text-xl font-extrabold text-[#24332B]">
          Giggler Savings Goal screen
        </Text>

        <Text className="mt-3 text-center text-base text-[#758078]">
          Your savings journey starts here.
        </Text>

        <View className="mt-8 rounded-2xl bg-[#153D2E] px-6 py-4">
          <Text className="font-bold text-white">
            Your future, one goal at a time.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
