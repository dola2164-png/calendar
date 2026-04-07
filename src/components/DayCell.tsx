import { format, isSameMonth, isToday } from "date-fns";

type Props = {
  day: Date;
  currentMonth: Date;
  isDark: boolean;
  onClick: () => void;
  inRange: boolean;
  isStart: boolean;
  isEnd: boolean;
};

export default function DayCell({
  day,
  currentMonth,
  isDark,
  onClick,
  inRange,
  isStart,
  isEnd,
}: Props) {
  const outsideMonth = !isSameMonth(day, currentMonth);
  const today = isToday(day);
  const weekend = day.getDay() === 0 || day.getDay() === 6;
  const holiday = day.getDate() === 1 || day.getDate() === 15;
  const selectedSingle = isStart && isEnd;
  const isSelected = isStart || isEnd || selectedSingle;

  return (
    <button
      onClick={onClick}
      className={[
        "relative min-h-[52px] sm:min-h-[58px] md:min-h-[62px] rounded-xl border p-1.5 text-left transition-all duration-200 hover:-translate-y-[1px]",
        isDark
          ? "border-white/10 bg-white/5 hover:bg-white/10"
          : "border-stone-200 bg-white hover:bg-stone-50",
        outsideMonth ? (isDark ? "text-white/25" : "text-stone-300") : "",

        today && !isSelected
          ? isDark
            ? "border-violet-400/50 bg-violet-400/25"
            : "border-violet-400 bg-violet-100"
          : "",

        weekend && !outsideMonth && !isSelected
          ? isDark
            ? "border-blue-400/50 bg-blue-500/20"
            : "border-blue-300 bg-blue-100"
          : "",

        holiday && !outsideMonth && !isSelected
          ? isDark
            ? "border-yellow-300 bg-yellow-400/35 animate-bounce shadow-[0_0_16px_rgba(250,204,21,0.35)]"
            : "border-yellow-400 bg-yellow-200 animate-bounce shadow-[0_0_16px_rgba(250,204,21,0.35)]"
          : "",

        inRange && !isSelected
          ? isDark
            ? "border-pink-400/40 bg-pink-500/20"
            : "border-pink-300 bg-pink-100"
          : "",

        isSelected
          ? isDark
            ? "border-pink-400 bg-pink-500 text-white scale-[1.03] shadow-[0_0_16px_rgba(236,72,153,0.4)]"
            : "border-pink-500 bg-pink-500 text-white scale-[1.03] shadow-[0_0_16px_rgba(236,72,153,0.3)]"
          : "",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-1">
        <span
          className={
            isSelected
              ? "text-xs font-semibold text-white"
              : holiday && !outsideMonth
              ? isDark
                ? "text-xs font-semibold text-white"
                : "text-xs font-semibold text-yellow-900"
              : today
              ? "text-xs font-semibold text-violet-700"
              : weekend && !outsideMonth
              ? "text-xs font-semibold text-blue-600"
              : "text-xs font-semibold"
          }
        >
          {format(day, "d")}
        </span>

        <div className="flex flex-col items-end gap-1">
          {today && (
            <span
              className={
                isSelected
                  ? "rounded-full bg-white/20 px-1.5 py-0.5 text-[8px] text-white"
                  : "rounded-full bg-yellow-400 px-1.5 py-0.5 text-[8px] text-stone-900"
              }
            >
              today
            </span>
          )}

          {weekend && !outsideMonth && !holiday && (
            <span
              className={
                isSelected
                  ? "rounded-full bg-white/20 px-1.5 py-0.5 text-[8px] text-white"
                  : "rounded-full bg-blue-100 px-1.5 py-0.5 text-[8px] text-blue-700"
              }
            >
              wknd
            </span>
          )}
        </div>
      </div>

      {!outsideMonth && holiday && (
        <div
          className={
            isSelected
              ? "mt-2 text-[9px] text-white/90"
              : isDark
              ? "mt-2 text-[9px] font-semibold text-white"
              : "mt-2 text-[9px] font-semibold text-yellow-900"
          }
        >
          holiday
        </div>
      )}

      {inRange && !isStart && !isEnd && (
        <div
          className={
            isDark
              ? "absolute inset-x-1.5 bottom-1.5 h-1 rounded-full bg-pink-300/70"
              : "absolute inset-x-1.5 bottom-1.5 h-1 rounded-full bg-pink-400"
          }
        />
      )}
    </button>
  );
}