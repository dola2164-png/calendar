import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import DayCell from "./DayCell";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type Props = {
  currentMonth: Date;
  calendarDays: Date[];
  isDark: boolean;
  onDayClick: (day: Date) => void;
  isInRange: (day: Date) => boolean;
  isRangeStart: (day: Date) => boolean;
  isRangeEnd: (day: Date) => boolean;
};

export default function CalendarGrid({
  currentMonth,
  calendarDays,
  isDark,
  onDayClick,
  isInRange,
  isRangeStart,
  isRangeEnd,
}: Props) {
  return (
    <div className="mb-1 flex flex-col gap-1.5">
      <div className="grid grid-cols-7 gap-1.5">
        {weekDays.map((day, index) => {
  const isWeekendHeader = index === 0 || index === 6;

  return (
    <div
      key={day}
      className={
        isWeekendHeader
          ? "text-center text-[10px] font-semibold uppercase tracking-wide text-blue-500"
          : "text-center text-[10px] font-semibold uppercase tracking-wide text-stone-500"
      }
    >
      {day}
    </div>
  );
})}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={format(currentMonth, "yyyy-MM")}
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
exit={{ opacity: 0, y: -16, scale: 0.98 }}
transition={{ duration: 0.28, ease: "easeInOut" }}
          className="grid grid-cols-7 gap-1.5"
        >
          {calendarDays.map((day) => (
            <DayCell
              key={day.toISOString()}
              day={day}
              currentMonth={currentMonth}
              isDark={isDark}
              onClick={() => onDayClick(day)}
              inRange={isInRange(day)}
              isStart={isRangeStart(day)}
              isEnd={isRangeEnd(day)}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}