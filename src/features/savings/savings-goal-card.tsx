import { Text, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";

type SavingsGoalCardProps = {
  name: string;
  savedAmount: number;
  targetAmount: number;
  onPress: () => void;
};

export function SavingsGoalCard({
  name,
  savedAmount,
  targetAmount,
  onPress,
}: SavingsGoalCardProps) {
  const safeTarget = Math.max(0, targetAmount);
  const safeSaved = Math.max(0, savedAmount);

  const progress =
    safeTarget > 0 ? Math.min(100, (safeSaved / safeTarget) * 100) : 0;

  const remaining = Math.max(0, safeTarget - safeSaved);

  const formatAmount = (amount: number) =>
    `GH₵${amount.toLocaleString("en-GH", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })}`;

  return (
    <Card>
      <View className="gap-3">
        <Text className="text-lg font-bold text-ink">{name}</Text>

        <View>
          <Text className="text-2xl font-extrabold text-forest">
            {formatAmount(safeSaved)}
          </Text>

          <Text className="mt-1 text-sm text-muted">
            of {formatAmount(safeTarget)} target
          </Text>
        </View>

        <ProgressBar progress={progress} />

        <View className="flex-row justify-between">
          <Text className="text-sm font-bold text-forest">
            {Math.round(progress)}% complete
          </Text>

          <Text className="text-sm text-muted">
            {formatAmount(remaining)} left
          </Text>
        </View>

        <Button title="view goal" variant="secondary" onPress={onPress} />
      </View>
    </Card>
  );
}
