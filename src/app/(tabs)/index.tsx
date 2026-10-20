import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-ivory">
      <View className="flex-1 items-center justify-center px-6">
        <View className="mb-6 h-16 w-16 items-center justify-center rounded-card bg-forest">
          <Text className="text-3xl font-extrabold text-lime">
            G
          </Text>
        </View>

        <Text className="text-3xl font-extrabold text-ink">
          Giggler Savings
        </Text>

        <Text className="mt-3 text-center text-base text-muted">
          Your savings journey starts here.
        </Text>

        <View className="mt-8 rounded-2xl bg-forest px-6 py-4">
          <Text className="font-bold text-white">
            Your future, one goal at a time.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
