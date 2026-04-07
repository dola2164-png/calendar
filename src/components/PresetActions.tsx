import { RotateCcw } from "lucide-react";

type Props = {
  isDark: boolean;
  onToday: () => void;
  onWeek: () => void;
  onWeekend: () => void;
  onReset: () => void;
};

function ActionButton({
  label,
  isDark,
  onClick,
  showIcon = false,
}: {
  label: string;
  isDark: boolean;
  onClick: () => void;
  showIcon?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={
        isDark
          ? "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs hover:bg-white/15"
          : "inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs hover:bg-stone-50"
      }
    >
      {showIcon && <RotateCcw size={12} />}
      {label}
    </button>
  );
}

export default function PresetActions({
  isDark,
  onToday,
  onWeek,
  onWeekend,
  onReset,
}: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:justify-start xl:justify-end">
      <ActionButton label="Today" isDark={isDark} onClick={onToday} />
      <ActionButton label="This Week" isDark={isDark} onClick={onWeek} />
      <ActionButton label="Weekend" isDark={isDark} onClick={onWeekend} />
      <ActionButton label="Reset All" isDark={isDark} onClick={onReset} showIcon />
    </div>
  );
}