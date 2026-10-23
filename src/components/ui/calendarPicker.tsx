
import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type CalendarPickerProps = {
  value: Date;
  onChange: (date: Date) => void;
  minimumDate?: Date;
};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const isSameDay = (first: Date, second: Date) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export function CalendarPicker({
  value,
  onChange,
  minimumDate = new Date(),
}: CalendarPickerProps) {
  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(value.getFullYear(), value.getMonth(), 1),
  );

  const days = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();

    // Monday-first calendar: Monday = 0, Sunday = 6.
    const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return [
      ...Array.from({ length: firstWeekday }, () => null),
      ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
    ];
  }, [visibleMonth]);

  const canGoToPreviousMonth =
    visibleMonth.getFullYear() > minimumDate.getFullYear() ||
    (visibleMonth.getFullYear() === minimumDate.getFullYear() &&
      visibleMonth.getMonth() > minimumDate.getMonth());

  const changeMonth = (amount: number) => {
    setVisibleMonth(
      (current) =>
        new Date(
          current.getFullYear(),
          current.getMonth() + amount,
          1,
        ),
    );
  };

  return (
    <View>
      {/* Month navigation */}
      <View className="mb-5 flex-row items-center justify-between">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Previous month"
          disabled={!canGoToPreviousMonth}
          onPress={() => changeMonth(-1)}
          className="h-10 w-10 items-center justify-center rounded-full bg-sage"
        >
          <Ionicons
            name="chevron-back"
            size={20}
            color={canGoToPreviousMonth ? "#153D2E" : "#A5B0A7"}
          />
        </Pressable>

        <Text
          className="text-[17px] text-ink"
          style={{ fontFamily: "Manrope-Bold" }}
        >
          {MONTHS[visibleMonth.getMonth()]} {visibleMonth.getFullYear()}
        </Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Next month"
          onPress={() => changeMonth(1)}
          className="h-10 w-10 items-center justify-center rounded-full bg-sage"
        >
          <Ionicons
            name="chevron-forward"
            size={20}
            color="#153D2E"
          />
        </Pressable>
      </View>

      {/* Weekday labels */}
      <View className="mb-2 flex-row">
        {WEEKDAYS.map((weekday) => (
          <View key={weekday} className="flex-1 items-center py-2">
            <Text
              className="text-[11px] text-muted"
              style={{ fontFamily: "Manrope-SemiBold" }}
            >
              {weekday}
            </Text>
          </View>
        ))}
      </View>

      {/* Date grid */}
      <View className="flex-row flex-wrap">
        {days.map((day, index) => {
          if (day === null) {
            return (
              <View
                key={`empty-${index}`}
                className="h-11 w-[14.2857%] items-center justify-center"
              />
            );
          }

          const date = new Date(
            visibleMonth.getFullYear(),
            visibleMonth.getMonth(),
            day,
          );

          const isSelected = isSameDay(date, value);
          const isDisabled = startOfDay(date) < startOfDay(minimumDate);

          return (
            <View
              key={day}
              className="h-11 w-[14.2857%] items-center justify-center"
            >
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`${day} ${MONTHS[visibleMonth.getMonth()]} ${visibleMonth.getFullYear()}`}
                accessibilityState={{
                  selected: isSelected,
                  disabled: isDisabled,
                }}
                disabled={isDisabled}
                onPress={() => onChange(date)}
                className={`h-9 w-9 items-center justify-center rounded-full ${
                  isSelected ? "bg-forest" : "bg-transparent"
                }`}
              >
                <Text
                  className={`text-[13px] ${
                    isSelected
                      ? "text-white"
                      : isDisabled
                        ? "text-[#C4CCC5]"
                        : "text-ink"
                  }`}
                  style={{
                    fontFamily: isSelected
                      ? "Manrope-Bold"
                      : "Manrope-Medium",
                  }}
                >
                  {day}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}
