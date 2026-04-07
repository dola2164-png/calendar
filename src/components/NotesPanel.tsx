import { NotebookPen } from "lucide-react";
import type { NoteMode } from "../App";

type Props = {
  isDark: boolean;
  noteMode: NoteMode;
  onNoteModeChange: (mode: NoteMode) => void;
  noteTitle: string;
  noteValue: string;
  notePlaceholder: string;
  onNoteChange: (value: string) => void;
};

function ModeButton({
  label,
  value,
  activeMode,
  onClick,
  isDark,
}: {
  label: string;
  value: NoteMode;
  activeMode: NoteMode;
  onClick: (mode: NoteMode) => void;
  isDark: boolean;
}) {
  const active = value === activeMode;

  return (
    <button
      onClick={() => onClick(value)}
      className={
        active
          ? "rounded-full bg-cyan-500 px-3 py-1.5 text-xs font-medium text-white"
          : isDark
          ? "rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10"
          : "rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs text-stone-700 hover:bg-stone-50"
      }
    >
      {label}
    </button>
  );
}

export default function NotesPanel({
  isDark,
  noteMode,
  onNoteModeChange,
  noteTitle,
  noteValue,
  notePlaceholder,
  onNoteChange,
}: Props) {
  return (
    <div
      className={
        isDark
          ? "rounded-2xl border border-white/10 bg-white/5 p-3"
          : "rounded-2xl border border-stone-200 bg-stone-50 p-3"
      }
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <NotebookPen size={16} />
          <h3 className="text-sm font-semibold">{noteTitle}</h3>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        <ModeButton
          label="Today"
          value="today"
          activeMode={noteMode}
          onClick={onNoteModeChange}
          isDark={isDark}
        />
        <ModeButton
          label="Monthly"
          value="monthly"
          activeMode={noteMode}
          onClick={onNoteModeChange}
          isDark={isDark}
        />
        <ModeButton
          label="Range"
          value="range"
          activeMode={noteMode}
          onClick={onNoteModeChange}
          isDark={isDark}
        />
      </div>

      <textarea
        value={noteValue}
        onChange={(e) => onNoteChange(e.target.value)}
        placeholder={notePlaceholder}
        className={
          isDark
            ? "h-28 w-full resize-none rounded-xl border border-white/10 bg-neutral-900 p-2.5 text-sm outline-none placeholder:text-white/35"
            : "h-28 w-full resize-none rounded-xl border border-stone-200 bg-white p-2.5 text-sm outline-none placeholder:text-stone-400"
        }
      />
    </div>
  );
}