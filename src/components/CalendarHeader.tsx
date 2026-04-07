import { format } from "date-fns";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

type Props = {
  currentMonth: Date;
  isDark: boolean;
  onPrev: () => void;
  onNext: () => void;
  onClear: () => void;
};

export default function CalendarHeader({
  currentMonth,
  isDark,
  onPrev,
  onNext,
  onClear,
}: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
        <button
          onClick={onPrev}
          className={
            isDark
              ? "rounded-full border border-white/10 bg-white/5 p-2 hover:bg-white/10"
              : "rounded-full border border-stone-200 bg-white p-2 hover:bg-stone-50"
          }
        >
          <ChevronLeft size={16} />
        </button>

        <h2 className="min-w-[150px] text-center text-xl font-bold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>

        <button
          onClick={onNext}
          className={
            isDark
              ? "rounded-full border border-white/10 bg-white/5 p-2 hover:bg-white/10"
              : "rounded-full border border-stone-200 bg-white p-2 hover:bg-stone-50"
          }
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <button
        onClick={onClear}
        className={
          isDark
            ? "inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10"
            : "inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-2 text-xs hover:bg-stone-50"
        }
      >
        <RotateCcw size={14} />
        Clear Selection
      </button>
    </div>
  );
}