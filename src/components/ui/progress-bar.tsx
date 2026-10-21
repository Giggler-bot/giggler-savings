import { View } from "react-native";

type ProgressBarProps = {
  progress: number;
  color?: string;
  trackColor?: string;
};

export function ProgressBar({
  progress,
  color = "#153D2E",
  trackColor = "#DDE9E0",
}: ProgressBarProps) {
    const safeProgress = Math.min(100, Math.max(0, progress));

    return (
        <View className="h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: trackColor }}>
            <View 
                className="h-full rounded-full"
                style={{
                    width: `${safeProgress}%`,
                    backgroundColor: color,
                }}
            />
        </View>
    )
}
