import { format } from "date-fns";
import { CalendarDays, Moon, Sun } from "lucide-react";
import type { Theme } from "../App";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  currentMonth: Date;
  heroImage: string;
  isDark: boolean;
  theme: Theme;
  onToggleTheme: () => void;
  startDate: Date | null;
  endDate: Date | null;
};

function getRangeLabel(startDate: Date | null, endDate: Date | null) {
  if (!startDate) return "No range selected";
  if (startDate && !endDate) return `Start: ${format(startDate, "dd MMM yyyy")}`;
  return `${format(startDate, "dd MMM")} - ${format(endDate!, "dd MMM yyyy")}`;
}

export default function HeroPanel({
  currentMonth,
  heroImage,
  isDark,
  onToggleTheme,
  startDate,
  endDate,
}: Props) {
  return (
    <section
      className={
        isDark
          ? "border-b border-white/10 p-3 lg:border-b-0 lg:border-r lg:border-white/10"
          : "border-b border-stone-200 p-3 lg:border-b-0 lg:border-r lg:border-stone-200"
      }
    >
      <div className="relative overflow-hidden rounded-[20px] [perspective:1200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={format(currentMonth, "yyyy-MM")}
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="relative"
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src={heroImage}
              alt="Calendar hero"
              className="h-[150px] w-full object-cover sm:h-[170px] lg:h-[190px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <p className="mb-1 inline-flex items-center gap-2 rounded-full bg-white/20 px-2.5 py-1 text-[10px] backdrop-blur">
                <CalendarDays size={12} />
                Calendar
              </p>
              <h1 className="text-2xl font-bold md:text-3xl">
                {format(currentMonth, "MMMM yyyy")}
              </h1>
              <p className="mt-1 text-xs text-white/90">
                Elegant planning
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-3 grid gap-2.5">
        <div
          className={
            isDark
              ? "rounded-2xl bg-white/5 p-3"
              : "rounded-2xl bg-stone-100 p-3"
          }
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">Appearance</p>
            <motion.button
              onClick={onToggleTheme}
              whileHover={{ rotate: 8, scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              className={
                isDark
                  ? "rounded-full border border-white/10 bg-white/10 p-2"
                  : "rounded-full border border-stone-200 bg-white p-2"
              }
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>
          </div>
        </div>

        <div
          className={
            isDark
              ? "rounded-2xl bg-white/5 p-3"
              : "rounded-2xl bg-stone-100 p-3"
          }
        >
          <p className="text-sm font-semibold">Selected range</p>
          <p className={isDark ? "mt-1 text-xs text-white/75" : "mt-1 text-xs text-stone-600"}>
            {getRangeLabel(startDate, endDate)}
          </p>
        </div>
      </div>
    </section>
  );
}