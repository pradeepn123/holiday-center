"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate, parseISODate, startOfToday, toISODate } from "@/lib/dateUtils";
import { cn } from "@/lib/utils";

const MONTH_NAMES = [
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
const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, count: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + count, 1);
}

function defaultViewMonthIso(minIso: string, maxIso: string | undefined, todayIso: string): string {
  if (minIso > todayIso) return minIso;
  if (maxIso && maxIso < todayIso) return maxIso;
  return todayIso;
}

function buildMonthGrid(monthStart: Date): (Date | null)[] {
  const year = monthStart.getFullYear();
  const month = monthStart.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(new Date(year, month, day));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

type PanelStyle = { top: number; left: number; width: number };

function useAnchoredPanel(getDesiredWidth: () => number) {
  const [open, setOpen] = useState(false);
  const [panelStyle, setPanelStyle] = useState<PanelStyle | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  function computePanelPosition() {
    if (!containerRef.current) return;
    const width = Math.min(getDesiredWidth(), window.innerWidth - 32);
    const rect = containerRef.current.getBoundingClientRect();
    const left = Math.min(Math.max(16, rect.left), window.innerWidth - width - 16);
    setPanelStyle({ top: rect.bottom + 8, left, width });
  }

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (containerRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("scroll", computePanelPosition, true);
    window.addEventListener("resize", computePanelPosition);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("scroll", computePanelPosition, true);
      window.removeEventListener("resize", computePanelPosition);
    };
  }, [open]);

  function toggleOpen(onBeforeOpen?: () => void) {
    if (!open) {
      computePanelPosition();
      onBeforeOpen?.();
    }
    setOpen((value) => !value);
  }

  return { open, setOpen, panelStyle, containerRef, panelRef, toggleOpen };
}

function CalendarNav({
  monthsToShow,
  months,
  canGoPrev,
  canGoNext = true,
  onPrev,
  onNext,
}: {
  monthsToShow: number;
  months: Date[];
  canGoPrev: boolean;
  canGoNext?: boolean;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-1">
      <button
        type="button"
        onClick={onPrev}
        disabled={!canGoPrev}
        aria-label="Previous month"
        className="flex size-8 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronLeft className="size-4" />
      </button>
      <span className="text-[13px] font-medium text-neutral-400">
        {monthsToShow === 2
          ? `${MONTH_NAMES[months[0].getMonth()]} ${months[0].getFullYear()} – ${MONTH_NAMES[months[1].getMonth()]} ${months[1].getFullYear()}`
          : `${MONTH_NAMES[months[0].getMonth()]} ${months[0].getFullYear()}`}
      </span>
      <button
        type="button"
        onClick={onNext}
        disabled={!canGoNext}
        aria-label="Next month"
        className="flex size-8 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}

function MonthYearJumpNav({
  monthDate,
  minYear,
  maxYear,
  onChange,
}: {
  monthDate: Date;
  minYear: number;
  maxYear: number;
  onChange: (next: Date) => void;
}) {
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, index) => maxYear - index);

  return (
    <div className="flex items-center gap-2 px-1">
      <div className="relative flex-1">
        <select
          value={monthDate.getMonth()}
          onChange={(event) => onChange(new Date(monthDate.getFullYear(), Number(event.target.value), 1))}
          aria-label="Month"
          className="h-9 w-full appearance-none rounded-lg border border-neutral-200 bg-white px-3 pr-7 text-[13px] font-medium text-neutral-700 outline-none focus:border-brand-blue"
        >
          {MONTH_NAMES.map((name, index) => (
            <option key={name} value={index}>
              {name}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-3.5 -translate-y-1/2 text-neutral-400" />
      </div>
      <div className="relative w-[104px] shrink-0">
        <select
          value={monthDate.getFullYear()}
          onChange={(event) => onChange(new Date(Number(event.target.value), monthDate.getMonth(), 1))}
          aria-label="Year"
          className="h-9 w-full appearance-none rounded-lg border border-neutral-200 bg-white px-3 pr-7 text-[13px] font-medium text-neutral-700 outline-none focus:border-brand-blue"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-3.5 -translate-y-1/2 text-neutral-400" />
      </div>
    </div>
  );
}

type DayVisual = { isBoundary: boolean; fill: "none" | "full" | "start" | "end" };

function CalendarMonths({
  months,
  monthsToShow,
  todayIso,
  minSelectableIso,
  maxSelectableIso,
  getDayVisual,
  onDayClick,
  onDayHover,
}: {
  months: Date[];
  monthsToShow: number;
  todayIso: string;
  minSelectableIso: string;
  maxSelectableIso?: string;
  getDayVisual: (iso: string) => DayVisual;
  onDayClick: (iso: string) => void;
  onDayHover: (iso: string) => void;
}) {
  return (
    <div className={cn("mt-2 grid gap-6", monthsToShow === 2 ? "grid-cols-2" : "grid-cols-1")}>
      {months.map((monthStart, monthIndex) => (
        <div key={monthIndex}>
          <p className="text-center text-[14px] font-semibold text-neutral-900">
            {MONTH_NAMES[monthStart.getMonth()]} {monthStart.getFullYear()}
          </p>
          <div className="mt-2 grid grid-cols-7 text-center text-[11px] font-medium text-neutral-400">
            {WEEKDAY_LABELS.map((label, labelIndex) => (
              <span key={`${label}-${labelIndex}`}>{label}</span>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {buildMonthGrid(monthStart).map((date, cellIndex) => {
              if (!date) return <div key={cellIndex} className="h-10 w-full" />;

              const iso = toISODate(date);
              const isDisabled = iso < minSelectableIso || (maxSelectableIso ? iso > maxSelectableIso : false);
              const isToday = iso === todayIso;
              const visual: DayVisual = isDisabled
                ? { isBoundary: false, fill: "none" }
                : getDayVisual(iso);

              return (
                <button
                  key={iso}
                  type="button"
                  disabled={isDisabled}
                  onMouseEnter={() => !isDisabled && onDayHover(iso)}
                  onClick={() => !isDisabled && onDayClick(iso)}
                  className={cn(
                    "relative flex h-10 w-full items-center justify-center text-[13px]",
                    isDisabled && "cursor-not-allowed"
                  )}
                >
                  {visual.fill === "full" && (
                    <span className="absolute inset-y-0 left-0 right-0 bg-brand-blue/10" />
                  )}
                  {visual.fill === "start" && (
                    <span className="absolute inset-y-0 left-1/2 right-0 bg-brand-blue/10" />
                  )}
                  {visual.fill === "end" && (
                    <span className="absolute inset-y-0 left-0 right-1/2 bg-brand-blue/10" />
                  )}
                  <span
                    className={cn(
                      "relative z-10 flex size-9 items-center justify-center rounded-full font-medium transition-colors",
                      visual.isBoundary
                        ? "bg-brand-blue text-white"
                        : isDisabled
                          ? "text-neutral-300"
                          : isToday
                            ? "border border-brand-blue text-brand-blue"
                            : "text-neutral-700 hover:bg-neutral-100"
                    )}
                  >
                    {date.getDate()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

const calendarPanelClass =
  "z-[100] max-h-[85vh] overflow-y-auto rounded-2xl border border-neutral-100 bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.15)]";

const defaultTriggerClass =
  "flex h-[65px] w-full shrink-0 items-center gap-2.5 rounded-xl bg-neutral-100 px-4 text-left transition-colors hover:bg-neutral-200/70 focus-within:bg-neutral-200/70 lg:flex-1";

export function DateRangeField({
  icon,
  placeholder,
  checkIn: controlledCheckIn,
  checkOut: controlledCheckOut,
  onCheckInChange,
  onCheckOutChange,
}: {
  icon: React.ReactNode;
  placeholder?: string;
  checkIn?: string;
  checkOut?: string;
  onCheckInChange?: (value: string) => void;
  onCheckOutChange?: (value: string) => void;
}) {
  const [internalCheckIn, setInternalCheckIn] = useState("");
  const [internalCheckOut, setInternalCheckOut] = useState("");
  const isControlled = controlledCheckIn !== undefined && onCheckInChange !== undefined;
  const checkIn = isControlled ? controlledCheckIn! : internalCheckIn;
  const checkOut = isControlled ? controlledCheckOut! : internalCheckOut;
  const setCheckIn = isControlled ? onCheckInChange! : setInternalCheckIn;
  const setCheckOut = isControlled ? onCheckOutChange! : setInternalCheckOut;

  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [viewMonth, setViewMonth] = useState<Date>(() =>
    startOfMonth(checkIn ? parseISODate(checkIn) : new Date())
  );
  const [rangeStartLabel, rangeEndLabel] = (placeholder ?? "").split(" - ");
  const today = startOfToday();
  const todayIso = toISODate(today);
  const { open, setOpen, panelStyle, containerRef, panelRef, toggleOpen } = useAnchoredPanel(() =>
    window.innerWidth >= 700 ? 656 : 336
  );

  function handleToggle() {
    toggleOpen(() => {
      setViewMonth(startOfMonth(checkIn ? parseISODate(checkIn) : new Date()));
      setHoveredDate(null);
    });
  }

  function handleDayClick(iso: string) {
    if (!checkIn || checkOut) {
      setCheckIn(iso);
      setCheckOut("");
      return;
    }
    if (iso <= checkIn) {
      setCheckIn(iso);
      setCheckOut("");
      return;
    }
    setCheckOut(iso);
    setOpen(false);
  }

  const monthsToShow = panelStyle && panelStyle.width >= 600 ? 2 : 1;
  const months = Array.from({ length: monthsToShow }, (_, index) => addMonths(viewMonth, index));
  const canGoPrev = viewMonth > startOfMonth(today);
  const previewEnd = checkIn && !checkOut ? hoveredDate : null;
  const rangeEnd = checkOut || previewEnd;

  function getDayVisual(iso: string): DayVisual {
    const isStart = iso === checkIn;
    const isEnd = checkOut ? iso === checkOut : false;
    const isPreviewEnd = !checkOut && previewEnd === iso && !isStart;
    const hasSpan = Boolean(checkOut || previewEnd);
    const inRange = Boolean(rangeEnd && checkIn && iso > checkIn && iso < rangeEnd);

    return {
      isBoundary: isStart || isEnd || isPreviewEnd,
      fill: inRange ? "full" : isStart && hasSpan ? "start" : isEnd || isPreviewEnd ? "end" : "none",
    };
  }

  return (
    <div ref={containerRef} className="relative flex-1">
      <button type="button" onClick={handleToggle} className={defaultTriggerClass}>
        <span className="shrink-0 text-neutral-500">{icon}</span>
        <span className="flex flex-1 items-center gap-2 overflow-hidden text-left">
          <span
            className={cn(
              "truncate text-[14px] font-medium",
              checkIn ? "text-neutral-900" : "text-neutral-500"
            )}
          >
            {checkIn ? formatDate(checkIn) : rangeStartLabel || placeholder}
          </span>
          <span className="shrink-0 text-neutral-300">–</span>
          <span
            className={cn(
              "truncate text-[14px] font-medium",
              checkOut ? "text-neutral-900" : "text-neutral-500"
            )}
          >
            {checkOut ? formatDate(checkOut) : rangeEndLabel || placeholder}
          </span>
        </span>
      </button>

      {open &&
        panelStyle &&
        createPortal(
          <div
            ref={panelRef}
            style={{ position: "fixed", top: panelStyle.top, left: panelStyle.left, width: panelStyle.width }}
            onMouseLeave={() => setHoveredDate(null)}
            className={calendarPanelClass}
          >
            <CalendarNav
              monthsToShow={monthsToShow}
              months={months}
              canGoPrev={canGoPrev}
              onPrev={() => canGoPrev && setViewMonth((value) => addMonths(value, -1))}
              onNext={() => setViewMonth((value) => addMonths(value, 1))}
            />

            <CalendarMonths
              months={months}
              monthsToShow={monthsToShow}
              todayIso={todayIso}
              minSelectableIso={todayIso}
              getDayVisual={getDayVisual}
              onDayClick={handleDayClick}
              onDayHover={setHoveredDate}
            />

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-neutral-100 pt-4">
              <button
                type="button"
                onClick={() => {
                  setCheckIn("");
                  setCheckOut("");
                }}
                className="text-[13px] font-semibold text-neutral-500 transition-colors hover:text-neutral-700"
              >
                Clear dates
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl bg-brand-lime px-6 py-2.5 text-[14px] font-semibold text-brand-dark transition-transform hover:scale-[1.02]"
              >
                Done
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

export function SingleDateField({
  icon,
  placeholder,
  value: controlledValue,
  onChange,
  minDateIso,
  maxDateIso,
  disabled = false,
  triggerClassName,
  iconPosition = "left",
  enableYearMonthJump = false,
}: {
  icon: React.ReactNode;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  /** Earliest selectable date (ISO yyyy-mm-dd). Defaults to today (no past dates). */
  minDateIso?: string;
  /** Latest selectable date (ISO yyyy-mm-dd). Unbounded by default. */
  maxDateIso?: string;
  disabled?: boolean;
  /** Overrides the trigger button's className entirely, e.g. to match a surrounding form's input style. */
  triggerClassName?: string;
  iconPosition?: "left" | "right";
  /** Shows Month/Year select dropdowns for fast navigation — useful for dates far from today (e.g. birthdates). */
  enableYearMonthJump?: boolean;
}) {
  const [internalValue, setInternalValue] = useState("");
  const isControlled = controlledValue !== undefined && onChange !== undefined;
  const value = isControlled ? controlledValue! : internalValue;
  const setValue = isControlled ? onChange! : setInternalValue;

  const today = startOfToday();
  const todayIso = toISODate(today);
  const minSelectableIso = minDateIso ?? todayIso;
  const maxSelectableIso = maxDateIso;

  const [viewMonth, setViewMonth] = useState<Date>(() =>
    startOfMonth(
      value ? parseISODate(value) : parseISODate(defaultViewMonthIso(minSelectableIso, maxSelectableIso, todayIso))
    )
  );
  const { open, setOpen, panelStyle, containerRef, panelRef, toggleOpen } = useAnchoredPanel(() => 336);

  function handleToggle() {
    if (disabled) return;
    toggleOpen(() =>
      setViewMonth(
        startOfMonth(
          value
            ? parseISODate(value)
            : parseISODate(defaultViewMonthIso(minSelectableIso, maxSelectableIso, todayIso))
        )
      )
    );
  }

  function handleDayClick(iso: string) {
    setValue(iso);
    setOpen(false);
  }

  const months = [viewMonth];
  const canGoPrev = viewMonth > startOfMonth(parseISODate(minSelectableIso));
  const canGoNext = maxSelectableIso ? viewMonth < startOfMonth(parseISODate(maxSelectableIso)) : true;

  function getDayVisual(iso: string): DayVisual {
    return { isBoundary: iso === value, fill: "none" };
  }

  const iconNode =
    iconPosition === "left" ? (
      <span className="shrink-0 text-neutral-500">{icon}</span>
    ) : (
      <span className="pointer-events-none shrink-0 text-neutral-400">{icon}</span>
    );

  return (
    <div ref={containerRef} className="relative flex-1">
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        aria-label={placeholder}
        className={cn(
          triggerClassName ?? defaultTriggerClass,
          "flex items-center gap-2.5",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        {iconPosition === "left" && iconNode}
        <span
          className={cn(
            "flex-1 truncate text-left text-[14px] font-medium",
            value ? "text-neutral-900" : "text-neutral-500"
          )}
        >
          {value ? formatDate(value) : placeholder}
        </span>
        {iconPosition === "right" && iconNode}
      </button>

      {open &&
        panelStyle &&
        createPortal(
          <div
            ref={panelRef}
            style={{ position: "fixed", top: panelStyle.top, left: panelStyle.left, width: panelStyle.width }}
            className={calendarPanelClass}
          >
            {enableYearMonthJump ? (
              <MonthYearJumpNav
                monthDate={viewMonth}
                minYear={parseISODate(minSelectableIso).getFullYear()}
                maxYear={parseISODate(maxSelectableIso ?? todayIso).getFullYear()}
                onChange={setViewMonth}
              />
            ) : (
              <CalendarNav
                monthsToShow={1}
                months={months}
                canGoPrev={canGoPrev}
                canGoNext={canGoNext}
                onPrev={() => canGoPrev && setViewMonth((v) => addMonths(v, -1))}
                onNext={() => canGoNext && setViewMonth((v) => addMonths(v, 1))}
              />
            )}

            <CalendarMonths
              months={months}
              monthsToShow={1}
              todayIso={todayIso}
              minSelectableIso={minSelectableIso}
              maxSelectableIso={maxSelectableIso}
              getDayVisual={getDayVisual}
              onDayClick={handleDayClick}
              onDayHover={() => {}}
            />

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-neutral-100 pt-4">
              <button
                type="button"
                onClick={() => setValue("")}
                className="text-[13px] font-semibold text-neutral-500 transition-colors hover:text-neutral-700"
              >
                Clear date
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl bg-brand-lime px-6 py-2.5 text-[14px] font-semibold text-brand-dark transition-transform hover:scale-[1.02]"
              >
                Done
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
