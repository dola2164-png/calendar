import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import HeroPanel from "./components/HeroPanel";
import CalendarHeader from "./components/CalendarHeader";
import CalendarGrid from "./components/CalendarGrid";
import NotesPanel from "./components/NotesPanel";
import PresetActions from "./components/PresetActions";

export type Theme = "light" | "dark";
export type NoteMode = "today" | "monthly" | "range";

export type SavedState = {
  currentMonth: string;
  startDate: string | null;
  endDate: string | null;
  monthNote: string;
  rangeNote: string;
  todayNoteDate: string;
  todayNote: string;
  noteMode: NoteMode;
  theme: Theme;
};

const STORAGE_KEY = "wall-calendar-component-v3";

const monthImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
];

function toDateOrNull(value: string | null) {
  return value ? new Date(value) : null;
}

function getImageForMonth(month: Date) {
  return monthImages[month.getMonth() % monthImages.length];
}

export default function App() {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [monthNote, setMonthNote] = useState("");
  const [rangeNote, setRangeNote] = useState("");
  const [todayNote, setTodayNote] = useState("");
  const [todayNoteDate, setTodayNoteDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [noteMode, setNoteMode] = useState<NoteMode>("monthly");
  const [theme, setTheme] = useState<Theme>("dark");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw) {
      const saved: SavedState = JSON.parse(raw);
      setCurrentMonth(new Date(saved.currentMonth));
      setStartDate(toDateOrNull(saved.startDate));
      setEndDate(toDateOrNull(saved.endDate));
      setMonthNote(saved.monthNote || "");
      setRangeNote(saved.rangeNote || "");
      setTodayNote(saved.todayNote || "");
      setTodayNoteDate(saved.todayNoteDate || format(new Date(), "yyyy-MM-dd"));
      setNoteMode(saved.noteMode || "monthly");
      setTheme(saved.theme || "light");
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const payload: SavedState = {
      currentMonth: currentMonth.toISOString(),
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
      monthNote,
      rangeNote,
      todayNote,
      todayNoteDate,
      noteMode,
      theme,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [
    isHydrated,
    currentMonth,
    startDate,
    endDate,
    monthNote,
    rangeNote,
    todayNote,
    todayNoteDate,
    noteMode,
    theme,
  ]);

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const gridStart = startOfWeek(monthStart);
    const gridEnd = endOfWeek(monthEnd);
    return eachDayOfInterval({ start: gridStart, end: gridEnd });
  }, [currentMonth]);

  const heroImage = useMemo(() => getImageForMonth(currentMonth), [currentMonth]);

  function handleDayClick(day: Date) {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
      return;
    }

    if (isBefore(day, startDate)) {
      setEndDate(startDate);
      setStartDate(day);
      return;
    }

    if (isSameDay(day, startDate)) {
      setEndDate(day);
      return;
    }

    setEndDate(day);
  }

  function isInRange(day: Date) {
    if (!startDate || !endDate) return false;
    return isAfter(day, startDate) && isBefore(day, endDate);
  }

  function isRangeStart(day: Date) {
    return !!startDate && isSameDay(day, startDate);
  }

  function isRangeEnd(day: Date) {
    return !!endDate && isSameDay(day, endDate);
  }

  function setTodayPreset() {
    const today = new Date();
    setCurrentMonth(startOfMonth(today));
    setStartDate(today);
    setEndDate(today);
    setNoteMode("today");
    setTodayNoteDate(format(today, "yyyy-MM-dd"));
  }

  function setWeekPreset() {
    const today = new Date();
    const start = startOfWeek(today);
    const end = endOfWeek(today);
    setCurrentMonth(startOfMonth(today));
    setStartDate(start);
    setEndDate(end);
    setNoteMode("range");
  }

  function setWeekendPreset() {
    const today = new Date();
    const currentDay = today.getDay();
    const saturdayOffset = (6 - currentDay + 7) % 7;
    const saturday = new Date(today);
    saturday.setDate(today.getDate() + saturdayOffset);

    const sunday = new Date(saturday);
    sunday.setDate(saturday.getDate() + 1);

    setCurrentMonth(startOfMonth(saturday));
    setStartDate(saturday);
    setEndDate(sunday);
    setNoteMode("range");
  }

  function clearSelection() {
    setStartDate(null);
    setEndDate(null);
  }

  function resetAll() {
    setCurrentMonth(startOfMonth(new Date()));
    setStartDate(null);
    setEndDate(null);
    setMonthNote("");
    setRangeNote("");
    setTodayNote("");
    setTodayNoteDate(format(new Date(), "yyyy-MM-dd"));
    setNoteMode("monthly");
    setTheme("light");
  }

  const isDark = theme === "dark";
  const today = new Date();

  const noteTitle =
    noteMode === "today"
      ? `Today note · ${format(today, "dd MMM yyyy")}`
      : noteMode === "monthly"
      ? `Monthly note · ${format(currentMonth, "MMMM yyyy")}`
      : startDate && endDate
      ? `Range note · ${format(startDate, "dd MMM")} - ${format(endDate, "dd MMM")}`
      : startDate
      ? `Range note · Start ${format(startDate, "dd MMM yyyy")}`
      : "Range note · No range selected";

  const notePlaceholder =
    noteMode === "today"
      ? "Write a note for today..."
      : noteMode === "monthly"
      ? "Write a memo for this month..."
      : "Write a note for the selected date range...";

  const activeNoteValue =
    noteMode === "today"
      ? todayNote
      : noteMode === "monthly"
      ? monthNote
      : rangeNote;

  function handleNoteChange(value: string) {
    if (noteMode === "today") {
      const todayKey = format(today, "yyyy-MM-dd");

      if (todayNoteDate !== todayKey) {
        setTodayNoteDate(todayKey);
      }

      setTodayNote(value);
      return;
    }

    if (noteMode === "monthly") {
      setMonthNote(value);
      return;
    }

    setRangeNote(value);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={
        isDark
          ? "min-h-screen bg-neutral-950 text-white transition-colors duration-300"
          : "min-h-screen bg-stone-100 text-stone-900 transition-colors duration-300"
      }
    >
      <div className="mx-auto max-w-7xl p-2 md:p-3">
        <div
          className={
            isDark
              ? "overflow-hidden rounded-[24px] border border-white/10 bg-neutral-900 shadow-2xl"
              : "overflow-hidden rounded-[24px] border border-stone-200 bg-white shadow-2xl"
          }
        >
          <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
            <div className="space-y-3">
              <HeroPanel
                currentMonth={currentMonth}
                heroImage={heroImage}
                isDark={isDark}
                theme={theme}
                onToggleTheme={() =>
                  setTheme((prev) => (prev === "light" ? "dark" : "light"))
                }
                startDate={startDate}
                endDate={endDate}
              />

              <div className="px-3 pb-3">
                <NotesPanel
                  isDark={isDark}
                  noteMode={noteMode}
                  onNoteModeChange={setNoteMode}
                  noteTitle={noteTitle}
                  noteValue={activeNoteValue}
                  notePlaceholder={notePlaceholder}
                  onNoteChange={handleNoteChange}
                />
              </div>
            </div>

            <section
              className={
                isDark
                  ? "border-t border-white/10 p-3 lg:border-l lg:border-t-0 lg:border-white/10"
                  : "border-t border-stone-200 p-3 lg:border-l lg:border-t-0 lg:border-stone-200"
              }
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                  <CalendarHeader
                    currentMonth={currentMonth}
                    isDark={isDark}
                    onPrev={() => setCurrentMonth((prev) => addMonths(prev, -1))}
                    onNext={() => setCurrentMonth((prev) => addMonths(prev, 1))}
                    onClear={clearSelection}
                  />

                  <PresetActions
                    isDark={isDark}
                    onToday={setTodayPreset}
                    onWeek={setWeekPreset}
                    onWeekend={setWeekendPreset}
                    onReset={resetAll}
                  />
                </div>

                <CalendarGrid
                  currentMonth={currentMonth}
                  calendarDays={calendarDays}
                  isDark={isDark}
                  onDayClick={handleDayClick}
                  isInRange={isInRange}
                  isRangeStart={isRangeStart}
                  isRangeEnd={isRangeEnd}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
}