
import { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";

type HomeGoalCardProps = {
  name: string;
  detail: string;
  saved: string;
  target: string;
  progress: number;
  milestone?: string;
  progressColor?: "forest" | "lime";
  delay?: number;
  className?: string;
  onPress: () => void;
};

export function HomeGoalCard({
  name,
  detail,
  saved,
  target,
  progress,
  milestone,
  progressColor = "forest",
  delay = 0,
  className = "",
  onPress,
}: HomeGoalCardProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(18)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
      ]),
    ]);

    animation.start();

    return () => animation.stop();
  }, [delay, opacity, translateY]);

  const animateScale = (toValue: number) => {
    Animated.spring(scale, {
      toValue,
      useNativeDriver: true,
      speed: 40,
      bounciness: 0,
    }).start();
  };

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateY }, { scale }],
      }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${name}, ${progress}% complete`}
        onPress={onPress}
        onPressIn={() => animateScale(0.98)}
        onPressOut={() => animateScale(1)}
        className={className}
      >
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-3">
            <Text
              className="text-[15px] text-ink"
              style={{ fontFamily: "Manrope-Bold" }}
            >
              {name}
            </Text>

            <Text
              className="mt-1 text-[11px] text-muted"
              style={{ fontFamily: "Manrope-Regular" }}
            >
              {detail}
            </Text>
          </View>

          <View className="rounded-full bg-sage px-2.5 py-1">
            <Text
              className="text-[11px] text-forest"
              style={{ fontFamily: "Manrope-Bold" }}
            >
              {progress}%
            </Text>
          </View>
        </View>

        <View className="mt-4 flex-row items-baseline">
          <Text
            className="text-[15px] text-ink"
            style={{ fontFamily: "Manrope-Bold" }}
          >
            {saved}
          </Text>

          <Text
            className="ml-1 text-[11px] text-muted"
            style={{ fontFamily: "Manrope-Regular" }}
          >
            of {target}
          </Text>
        </View>

        <View className="mt-3 h-2 overflow-hidden rounded-full bg-sage">
          <View
            className={`h-full rounded-full ${
              progressColor === "lime" ? "bg-lime" : "bg-forest"
            }`}
            style={{ width: `${progress}%` }}
          />
        </View>

        {milestone ? (
          <Text
            className="mt-3 text-[11px] text-muted"
            style={{ fontFamily: "Manrope-Medium" }}
          >
            {milestone}
          </Text>
        ) : null}
      </Pressable>
    </Animated.View>
  );
}
