"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  Calendar,
  Car,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Globe,
  Loader2,
  MapPin,
  Minus,
  PlaneLanding,
  PlaneTakeoff,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { searchCategories } from "@/lib/data";
import { CruiseSupportPanel } from "@/components/sections/CruiseSupportPanel";
import { useClickOutside } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const nationalities = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "India",
  "Singapore",
  "Germany",
  "France",
  "Belgium",
  "New Zealand",
  "South Africa",
  "Philippines",
  "Pakistan",
  "Egypt",
  "Jordan",
  "Lebanon",
];

const destinationSuggestions = [
  { city: "London", region: "United Kingdom" },
  { city: "London", region: "Kentucky (USA)" },
  { city: "London", region: "Ontario (Canada)" },
  { city: "Dubai", region: "United Arab Emirates" },
  { city: "Dubai Internet City", region: "United Arab Emirates" },
  { city: "Bangkok", region: "Thailand" },
  { city: "Bangkok, Bangkok", region: "Thailand" },
  { city: "Paris", region: "France" },
  { city: "New York", region: "United States" },
  { city: "Singapore", region: "Singapore" },
  { city: "Istanbul", region: "Turkey" },
  { city: "Rome", region: "Italy" },
  { city: "Cairo", region: "Egypt" },
  { city: "Doha", region: "Qatar" },
  { city: "Kuala Lumpur", region: "Malaysia" },
  { city: "Sydney", region: "Australia" },
  { city: "Barcelona", region: "Spain" },
];

type SearchFieldConfig = {
  icon: React.ReactNode;
  type: "text" | "location" | "date" | "dateRange" | "select" | "guests" | "activityGuests";
  placeholder?: string;
  hasChevron?: boolean;
  options?: string[];
  /** Wires this field to the SearchWidget's lifted state so it can be carried through the URL. */
  primary?: boolean;
};

const defaultFields: SearchFieldConfig[] = [
  { icon: <MapPin className="size-[18px]" />, type: "location", placeholder: "Where to?", primary: true },
  {
    icon: <Calendar className="size-[18px]" />,
    type: "dateRange",
    placeholder: "Check-In - Check-out",
    primary: true,
  },
  { icon: <Users className="size-[18px]" />, type: "guests" },
  { icon: <Globe className="size-[18px]" />, type: "select", placeholder: "Nationality", hasChevron: true, options: nationalities },
];

const searchFieldsByCategory: Record<string, SearchFieldConfig[]> = {
  hotel: defaultFields,
  sports: [
    { icon: <MapPin className="size-[18px]" />, type: "text", placeholder: "Team/Sports/Location/Artist" },
    { icon: <Calendar className="size-[18px]" />, type: "dateRange", placeholder: "From Date - Till Date" },
  ],
  packages: [
    { icon: <MapPin className="size-[18px]" />, type: "location", placeholder: "Where to?", primary: true },
  ],
  "car-rental": [
    { icon: <Car className="size-[18px]" />, type: "location", placeholder: "Pick-up location" },
    { icon: <Calendar className="size-[18px]" />, type: "dateRange", placeholder: "Pick-up - Drop-off" },
    { icon: <Users className="size-[18px]" />, type: "guests" },
    { icon: <Globe className="size-[18px]" />, type: "select", placeholder: "Nationality", hasChevron: true, options: nationalities },
  ],
  activities: [
    { icon: <MapPin className="size-[18px]" />, type: "location", placeholder: "Destination", primary: true },
    { icon: <Calendar className="size-[18px]" />, type: "date", placeholder: "Start Date" },
    { icon: <Calendar className="size-[18px]" />, type: "date", placeholder: "End Date" },
    { icon: <Users className="size-[18px]" />, type: "activityGuests" },
  ],
  transfers: [
    { icon: <MapPin className="size-[18px]" />, type: "location", placeholder: "Pick-up location" },
    { icon: <MapPin className="size-[18px]" />, type: "location", placeholder: "Drop-off location" },
    { icon: <Calendar className="size-[18px]" />, type: "date", placeholder: "Transfer date" },
    { icon: <Users className="size-[18px]" />, type: "guests" },
  ],
};

export type RoomConfig = { adults: number; children: number };

const MAX_ROOMS = 3;
const MAX_ADULTS = 9;
const MAX_CHILDREN = 6;

export type SearchWidgetInitialValues = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
  rooms?: number;
};

export type FlightSearchInitialValues = {
  tripType?: "oneway" | "roundtrip" | "multicity";
  from?: string;
  to?: string;
  departureDate?: string;
  returnDate?: string;
  travelClass?: string;
  passengers?: number;
  directFlightOnly?: boolean;
};

function buildInitialRooms(initialValues?: SearchWidgetInitialValues): RoomConfig[] {
  const roomCount = Math.min(MAX_ROOMS, Math.max(1, initialValues?.rooms ?? 1));
  const totalAdults = Math.max(1, initialValues?.adults ?? 2);
  const totalChildren = Math.max(0, initialValues?.children ?? 0);

  const rooms: RoomConfig[] = Array.from({ length: roomCount }, () => ({ adults: 1, children: 0 }));
  rooms[0] = {
    adults: Math.max(1, totalAdults - (roomCount - 1)),
    children: totalChildren,
  };
  return rooms;
}

type SharedSearchState = {
  destination: string;
  onDestinationChange: (value: string) => void;
  checkIn: string;
  checkOut: string;
  onCheckInChange: (value: string) => void;
  onCheckOutChange: (value: string) => void;
  rooms: RoomConfig[];
  onRoomsChange: (updater: (prev: RoomConfig[]) => RoomConfig[]) => void;
};

export function SearchWidget({
  showCategoryTabs = true,
  initialValues,
  initialCategory,
  flightInitialValues,
  compactOnMobile = false,
}: {
  showCategoryTabs?: boolean;
  initialValues?: SearchWidgetInitialValues;
  initialCategory?: string;
  flightInitialValues?: FlightSearchInitialValues;
  /** On small screens, starts collapsed into a tap-to-edit summary pill instead of the full form. */
  compactOnMobile?: boolean;
}) {
  const router = useRouter();
  const [isSearching, startSearchTransition] = useTransition();
  const [activeCategory, setActiveCategory] = useState(initialCategory ?? "hotel");
  const [destination, setDestination] = useState(initialValues?.destination ?? "");
  const [checkIn, setCheckIn] = useState(initialValues?.checkIn ?? "");
  const [checkOut, setCheckOut] = useState(initialValues?.checkOut ?? "");
  const [rooms, setRooms] = useState<RoomConfig[]>(() => buildInitialRooms(initialValues));
  const [isExpanded, setIsExpanded] = useState(!compactOnMobile);
  const fields = searchFieldsByCategory[activeCategory] ?? defaultFields;

  const totalGuests = rooms.reduce((sum, room) => sum + room.adults + room.children, 0);
  const searchSummary = `${checkIn && checkOut ? `${formatDate(checkIn)} – ${formatDate(checkOut)}` : "Select dates"} · ${totalGuests} guest${totalGuests === 1 ? "" : "s"}, ${rooms.length} room${rooms.length === 1 ? "" : "s"}`;

  const flightPassengers = flightInitialValues?.passengers ?? 1;
  const flightTitle =
    activeCategory === "flight" && (flightInitialValues?.from || flightInitialValues?.to)
      ? `${flightInitialValues?.from || "From"} → ${flightInitialValues?.to || "To"}`
      : "Where to?";
  const flightSummary = flightInitialValues?.departureDate
    ? `${formatDate(flightInitialValues.departureDate)}${
        flightInitialValues?.returnDate ? ` – ${formatDate(flightInitialValues.returnDate)}` : ""
      } · ${flightPassengers} passenger${flightPassengers === 1 ? "" : "s"}`
    : "Select dates";

  const activityTitle = destination || "Where to?";
  const activitySummary = "Tap to edit dates & guests";

  const shared: SharedSearchState = {
    destination,
    onDestinationChange: setDestination,
    checkIn,
    checkOut,
    onCheckInChange: setCheckIn,
    onCheckOutChange: setCheckOut,
    rooms,
    onRoomsChange: setRooms,
  };

  function handleSearch() {
    if (compactOnMobile) setIsExpanded(false);

    if (activeCategory === "packages") {
      startSearchTransition(() => {
        router.push("/packages");
      });
      return;
    }

    if (activeCategory === "sports") {
      startSearchTransition(() => {
        router.push("/sports");
      });
      return;
    }

    if (activeCategory === "activities") {
      startSearchTransition(() => {
        router.push("/activities");
      });
      return;
    }

    if (activeCategory !== "hotel") return;

    const totalAdults = rooms.reduce((sum, room) => sum + room.adults, 0);
    const totalChildren = rooms.reduce((sum, room) => sum + room.children, 0);

    const params = new URLSearchParams();
    if (destination.trim()) params.set("destination", destination.trim());
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    params.set("adults", String(totalAdults));
    params.set("children", String(totalChildren));
    params.set("rooms", String(rooms.length));

    startSearchTransition(() => {
      router.push(`/hotels?${params.toString()}`);
    });
  }

  return (
    <div className="relative z-10 mx-auto w-full">
      {compactOnMobile && !isExpanded && (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="flex w-full items-center gap-3 rounded-2xl bg-white px-4 py-3.5 text-left shadow-[0_10px_30px_rgba(0,0,0,0.12)] lg:hidden"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
            <Search className="size-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[14px] font-semibold text-neutral-900">
              {activeCategory === "flight"
                ? flightTitle
                : activeCategory === "activities"
                  ? activityTitle
                  : destination || "Where to?"}
            </span>
            <span className="block truncate text-[12px] text-neutral-500">
              {activeCategory === "flight"
                ? flightSummary
                : activeCategory === "activities"
                  ? activitySummary
                  : searchSummary}
            </span>
          </span>
          <span className="shrink-0 rounded-full bg-neutral-100 px-3 py-1.5 text-[12px] font-semibold text-brand-blue">
            Edit
          </span>
        </button>
      )}

      <div className={cn(compactOnMobile && !isExpanded ? "hidden lg:block" : "block")}>
        {compactOnMobile && (
          <div className="mb-2 flex items-center justify-between lg:hidden">
            <p className="text-[13px] font-semibold text-white/80">Edit your search</p>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              aria-label="Collapse search"
              className="flex size-7 items-center justify-center rounded-full bg-white/10 text-white"
            >
              <ChevronUp className="size-4" />
            </button>
          </div>
        )}

        {showCategoryTabs && (
          <div
            role="tablist"
            aria-label="Search category"
            className="scrollbar-hide flex gap-1 overflow-x-auto rounded-[6px] bg-white p-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.1)] sm:inline-flex sm:flex-wrap sm:overflow-visible"
          >
            {searchCategories.map((category) => {
              const isActive = activeCategory === category.value;
              return (
                <button
                  key={category.value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category.value)}
                  className={cn(
                    "shrink-0 whitespace-nowrap rounded-full px-5 py-1 lg:py-2.5 text-[15px] font-medium transition-colors",
                    isActive ? "bg-brand-blue text-white" : "text-neutral-700 hover:bg-neutral-100"
                  )}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        )}

        {activeCategory === "flight" ? (
        <FlightSearchPanel
          className={showCategoryTabs ? "mt-3" : undefined}
          initialValues={flightInitialValues}
          onSearchStart={() => {
            if (compactOnMobile) setIsExpanded(false);
          }}
        />
      ) : activeCategory === "cruise" ? (
        <CruiseSupportPanel className={showCategoryTabs ? "mt-3" : undefined} />
      ) : (
        <div
          role="tabpanel"
          className={cn(
            "rounded-2xl bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.12)] sm:p-4",
            showCategoryTabs && "mt-3"
          )}
        >
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            {fields.map((field, index) => (
              <SearchField key={`${activeCategory}-${index}`} {...field} shared={shared} />
            ))}

            <button
              type="button"
              onClick={handleSearch}
              disabled={isSearching}
              className="flex h-[65px] shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-blue px-8 text-[15px] font-semibold text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSearching ? (
                <Loader2 className="size-[18px] animate-spin" />
              ) : (
                <Search className="size-[18px]" />
              )}
              {isSearching
                ? "Searching..."
                : `Search ${searchCategories.find((c) => c.value === activeCategory)?.label ?? ""}`}
            </button>
          </div>

          {activeCategory === "packages" && (
            <Link
              href="/packages"
              className="mt-3 inline-block text-[14px] font-medium text-brand-blue underline"
            >
              View all Packages
            </Link>
          )}
        </div>
      )}
      </div>
    </div>
  );
}

const fieldContainerClass =
  "flex h-[65px] w-full shrink-0 items-center gap-2.5 rounded-xl bg-neutral-100 px-4 text-left transition-colors hover:bg-neutral-200/70 focus-within:bg-neutral-200/70 lg:flex-1";
const controlClass =
  "w-full min-w-0 flex-1 bg-transparent text-[14px] font-medium text-neutral-900 outline-none placeholder:text-neutral-500 [color-scheme:light]";

function formatDate(value: string) {
  const [year, month, day] = value.split("-");
  return `${day}-${month}-${year}`;
}

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

function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseISODate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, count: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + count, 1);
}

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
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
  onPrev,
  onNext,
}: {
  monthsToShow: number;
  months: Date[];
  canGoPrev: boolean;
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
        aria-label="Next month"
        className="flex size-8 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}

type DayVisual = { isBoundary: boolean; fill: "none" | "full" | "start" | "end" };

function CalendarMonths({
  months,
  monthsToShow,
  todayIso,
  minSelectableIso,
  getDayVisual,
  onDayClick,
  onDayHover,
}: {
  months: Date[];
  monthsToShow: number;
  todayIso: string;
  minSelectableIso: string;
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
              const isDisabled = iso < minSelectableIso;
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

function DateRangeField({
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
      <button type="button" onClick={handleToggle} className={fieldContainerClass}>
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

function SingleDateField({
  icon,
  placeholder,
  value: controlledValue,
  onChange,
  minDateIso,
  disabled = false,
}: {
  icon: React.ReactNode;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  minDateIso?: string;
  disabled?: boolean;
}) {
  const [internalValue, setInternalValue] = useState("");
  const isControlled = controlledValue !== undefined && onChange !== undefined;
  const value = isControlled ? controlledValue! : internalValue;
  const setValue = isControlled ? onChange! : setInternalValue;

  const [viewMonth, setViewMonth] = useState<Date>(() =>
    startOfMonth(value ? parseISODate(value) : new Date())
  );
  const today = startOfToday();
  const todayIso = toISODate(today);
  const minSelectableIso = minDateIso && minDateIso > todayIso ? minDateIso : todayIso;
  const { open, setOpen, panelStyle, containerRef, panelRef, toggleOpen } = useAnchoredPanel(() => 336);

  function handleToggle() {
    if (disabled) return;
    toggleOpen(() => setViewMonth(startOfMonth(value ? parseISODate(value) : parseISODate(minSelectableIso))));
  }

  function handleDayClick(iso: string) {
    setValue(iso);
    setOpen(false);
  }

  const months = [viewMonth];
  const canGoPrev = viewMonth > startOfMonth(parseISODate(minSelectableIso));

  function getDayVisual(iso: string): DayVisual {
    return { isBoundary: iso === value, fill: "none" };
  }

  return (
    <div ref={containerRef} className="relative flex-1">
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        aria-label={placeholder}
        className={cn(fieldContainerClass, disabled && "cursor-not-allowed opacity-50")}
      >
        <span className="shrink-0 text-neutral-500">{icon}</span>
        <span
          className={cn(
            "flex-1 truncate text-left text-[14px] font-medium",
            value ? "text-neutral-900" : "text-neutral-500"
          )}
        >
          {value ? formatDate(value) : placeholder}
        </span>
      </button>

      {open &&
        panelStyle &&
        createPortal(
          <div
            ref={panelRef}
            style={{ position: "fixed", top: panelStyle.top, left: panelStyle.left, width: panelStyle.width }}
            className={calendarPanelClass}
          >
            <CalendarNav
              monthsToShow={1}
              months={months}
              canGoPrev={canGoPrev}
              onPrev={() => canGoPrev && setViewMonth((v) => addMonths(v, -1))}
              onNext={() => setViewMonth((v) => addMonths(v, 1))}
            />

            <CalendarMonths
              months={months}
              monthsToShow={1}
              todayIso={todayIso}
              minSelectableIso={minSelectableIso}
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

function SearchField({
  icon,
  type,
  placeholder,
  hasChevron,
  options,
  primary,
  shared,
}: SearchFieldConfig & { shared: SharedSearchState }) {
  if (type === "location") {
    return (
      <LocationField
        icon={icon}
        placeholder={placeholder}
        value={primary ? shared.destination : undefined}
        onChange={primary ? shared.onDestinationChange : undefined}
      />
    );
  }

  if (type === "guests") {
    return <GuestsField icon={icon} rooms={shared.rooms} onRoomsChange={shared.onRoomsChange} />;
  }

  if (type === "activityGuests") {
    return <ActivityGuestsField icon={icon} />;
  }

  if (type === "dateRange") {
    return (
      <DateRangeField
        icon={icon}
        placeholder={placeholder}
        checkIn={primary ? shared.checkIn : undefined}
        checkOut={primary ? shared.checkOut : undefined}
        onCheckInChange={primary ? shared.onCheckInChange : undefined}
        onCheckOutChange={primary ? shared.onCheckOutChange : undefined}
      />
    );
  }

  if (type === "date") {
    return <SingleDateField icon={icon} placeholder={placeholder} />;
  }

  return (
    <div className={cn(fieldContainerClass, type === "select" && "lg:flex-[0.7]")}>
      <span className="shrink-0 text-neutral-500">{icon}</span>

      {type === "text" && <input type="text" placeholder={placeholder} className={controlClass} />}

      {type === "select" && (
        <select defaultValue="" aria-label={placeholder} className={cn(controlClass, "appearance-none")}>
          <option value="" disabled>
            {placeholder}
          </option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {hasChevron && type === "select" && <ChevronDown className="size-4 shrink-0 text-neutral-400" />}
    </div>
  );
}

function LocationField({
  icon,
  placeholder,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  const [internalQuery, setInternalQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useClickOutside<HTMLDivElement>(() => setOpen(false));

  const isControlled = value !== undefined && onChange !== undefined;
  const query = isControlled ? value : internalQuery;
  const setQuery = isControlled ? onChange : setInternalQuery;

  const trimmedQuery = query.trim().toLowerCase();
  const matches =
    trimmedQuery.length >= 2
      ? destinationSuggestions.filter((item) => item.city.toLowerCase().includes(trimmedQuery))
      : [];

  return (
    <div ref={containerRef} className="relative flex-1 lg:flex-[1.6]">
      <div className={fieldContainerClass}>
        <span className="shrink-0 text-neutral-500">{icon}</span>
        <input
          type="text"
          value={query}
          placeholder={placeholder}
          onChange={(event) => {
            const nextValue = event.target.value;
            setQuery(nextValue);
            setOpen(nextValue.trim().length >= 2);
          }}
          onFocus={() => {
            if (query.trim().length >= 2) setOpen(true);
          }}
          className={controlClass}
        />
      </div>

      {open && matches.length > 0 && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 max-h-[300px] overflow-y-auto rounded-2xl border border-neutral-100 bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
          {matches.map((item, index) => (
            <button
              key={`${item.city}-${item.region}-${index}`}
              type="button"
              onClick={() => {
                setQuery(item.city);
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-neutral-100"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-400">
                <Building2 className="size-[18px]" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[14px] font-semibold text-neutral-900">
                  {item.city}
                </span>
                <span className="block truncate text-[13px] text-neutral-500">{item.region}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function GuestsField({
  icon,
  rooms,
  onRoomsChange,
}: {
  icon: React.ReactNode;
  rooms: RoomConfig[];
  onRoomsChange: (updater: (prev: RoomConfig[]) => RoomConfig[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [panelStyle, setPanelStyle] = useState<{ top: number; left: number; width: number } | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  function computePanelPosition() {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = Math.min(320, window.innerWidth - 32);
    const left = Math.min(Math.max(16, rect.left), window.innerWidth - width - 16);
    setPanelStyle({ top: rect.bottom + 8, left, width });
  }

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (containerRef.current?.contains(target) || panelRef.current?.contains(target)) {
        return;
      }
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

  function toggleOpen() {
    if (!open) {
      computePanelPosition();
    }
    setOpen((value) => !value);
  }

  const totalAdults = rooms.reduce((sum, room) => sum + room.adults, 0);
  const totalChildren = rooms.reduce((sum, room) => sum + room.children, 0);
  const summary = `${totalAdults} Adult${totalAdults === 1 ? "" : "s"}${
    totalChildren > 0 ? `, ${totalChildren} Child${totalChildren === 1 ? "" : "ren"}` : ""
  }, ${rooms.length} Room${rooms.length === 1 ? "" : "s"}`;

  function updateRoom(index: number, key: "adults" | "children", delta: number) {
    onRoomsChange((prev) =>
      prev.map((room, i) => {
        if (i !== index) return room;
        const max = key === "adults" ? MAX_ADULTS : MAX_CHILDREN;
        const min = key === "adults" ? 1 : 0;
        return { ...room, [key]: Math.min(max, Math.max(min, room[key] + delta)) };
      })
    );
  }

  function addRoom() {
    onRoomsChange((prev) => (prev.length >= MAX_ROOMS ? prev : [...prev, { adults: 1, children: 0 }]));
  }

  function removeRoom(index: number) {
    onRoomsChange((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div ref={containerRef} className="relative flex-1">
      <button type="button" onClick={toggleOpen} className={fieldContainerClass}>
        <span className="shrink-0 text-neutral-500">{icon}</span>
        <span className="flex-1 truncate text-left text-[14px] font-medium text-neutral-900">{summary}</span>
        <ChevronDown
          className={cn("size-4 shrink-0 text-neutral-400 transition-transform", open && "rotate-180")}
        />
      </button>

      {open &&
        panelStyle &&
        createPortal(
          <div
            ref={panelRef}
            style={{
              position: "fixed",
              top: panelStyle.top,
              left: panelStyle.left,
              width: panelStyle.width,
            }}
            className="z-[100] rounded-2xl border border-neutral-100 bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
          >
          <div className="flex max-h-[320px] flex-col divide-y divide-neutral-100 overflow-y-auto pr-1">
            {rooms.map((room, index) => (
              <div key={index} className={cn(index === 0 ? "pb-5" : "py-5")}>
                <div className="flex items-center justify-between">
                  <p className="text-[15px] font-semibold text-neutral-900">Room {index + 1}</p>
                  {rooms.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRoom(index)}
                      className="text-[13px] font-medium text-neutral-400 transition-colors hover:text-neutral-600"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="mt-3 grid grid-cols-2 gap-4">
                  <GuestCounter
                    label="Adults"
                    hint="+12 Y"
                    value={room.adults}
                    onDecrease={() => updateRoom(index, "adults", -1)}
                    onIncrease={() => updateRoom(index, "adults", 1)}
                    disableDecrease={room.adults <= 1}
                    disableIncrease={room.adults >= MAX_ADULTS}
                  />
                  <GuestCounter
                    label="Children"
                    hint="+2 Y"
                    value={room.children}
                    onDecrease={() => updateRoom(index, "children", -1)}
                    onIncrease={() => updateRoom(index, "children", 1)}
                    disableDecrease={room.children <= 0}
                    disableIncrease={room.children >= MAX_CHILDREN}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-neutral-100 pt-4">
            <button
              type="button"
              onClick={addRoom}
              disabled={rooms.length >= MAX_ROOMS}
              className="rounded-xl border border-neutral-200 px-4 py-2.5 text-[14px] font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              + Add Room
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

function ActivityGuestsField({ icon }: { icon: React.ReactNode }) {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [open, setOpen] = useState(false);
  const [panelStyle, setPanelStyle] = useState<{ top: number; left: number; width: number } | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  function computePanelPosition() {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = Math.min(320, window.innerWidth - 32);
    const left = Math.min(Math.max(16, rect.left), window.innerWidth - width - 16);
    setPanelStyle({ top: rect.bottom + 8, left, width });
  }

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (containerRef.current?.contains(target) || panelRef.current?.contains(target)) {
        return;
      }
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

  function toggleOpen() {
    if (!open) {
      computePanelPosition();
    }
    setOpen((value) => !value);
  }

  const summary = `${adults} Adult${adults === 1 ? "" : "s"}${
    children > 0 ? `, ${children} Child${children === 1 ? "" : "ren"}` : ""
  }`;

  return (
    <div ref={containerRef} className="relative flex-1">
      <button type="button" onClick={toggleOpen} className={fieldContainerClass}>
        <span className="shrink-0 text-neutral-500">{icon}</span>
        <span className="flex-1 truncate text-left text-[14px] font-medium text-neutral-900">
          {summary}
        </span>
        <ChevronDown
          className={cn("size-4 shrink-0 text-neutral-400 transition-transform", open && "rotate-180")}
        />
      </button>

      {open &&
        panelStyle &&
        createPortal(
          <div
            ref={panelRef}
            style={{
              position: "fixed",
              top: panelStyle.top,
              left: panelStyle.left,
              width: panelStyle.width,
            }}
            className="z-[100] rounded-2xl border border-neutral-100 bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
          >
            <div className="grid grid-cols-2 gap-4">
              <GuestCounter
                label="Adults"
                hint="+12 Y"
                value={adults}
                onDecrease={() => setAdults((value) => Math.max(1, value - 1))}
                onIncrease={() => setAdults((value) => Math.min(MAX_ADULTS, value + 1))}
                disableDecrease={adults <= 1}
                disableIncrease={adults >= MAX_ADULTS}
              />
              <GuestCounter
                label="Children"
                hint="+2 Y"
                value={children}
                onDecrease={() => setChildren((value) => Math.max(0, value - 1))}
                onIncrease={() => setChildren((value) => Math.min(MAX_CHILDREN, value + 1))}
                disableDecrease={children <= 0}
                disableIncrease={children >= MAX_CHILDREN}
              />
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-5 flex h-10 w-full items-center justify-center rounded-xl bg-brand-lime text-[14px] font-semibold text-brand-dark transition-transform hover:scale-[1.02]"
            >
              Done
            </button>
          </div>,
          document.body
        )}
    </div>
  );
}

function GuestCounter({
  label,
  hint,
  value,
  onDecrease,
  onIncrease,
  disableDecrease,
  disableIncrease,
}: {
  label: string;
  hint: string;
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
  disableDecrease?: boolean;
  disableIncrease?: boolean;
}) {
  return (
    <div>
      <p className="text-[14px] font-medium text-neutral-900">{label}</p>
      <p className="text-[12px] text-neutral-400">{hint}</p>
      <div className="mt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={onDecrease}
          disabled={disableDecrease}
          className="flex size-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Minus className="size-3.5" />
        </button>
        <span className="w-5 text-center text-[14px] font-semibold text-neutral-900">
          {String(value).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={onIncrease}
          disabled={disableIncrease}
          className="flex size-8 items-center justify-center rounded-full bg-neutral-900 text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

const TRIP_TYPES = [
  { value: "oneway", label: "One way" },
  { value: "roundtrip", label: "Round Trip" },
  { value: "multicity", label: "Multi City" },
] as const;

const TRAVEL_CLASSES = ["Economy", "Premium Economy", "Business", "First"];
const MAX_PASSENGERS = 9;

function FlightSearchPanel({
  className,
  initialValues,
  onSearchStart,
}: {
  className?: string;
  initialValues?: FlightSearchInitialValues;
  onSearchStart?: () => void;
}) {
  const router = useRouter();
  const [isSearching, startSearchTransition] = useTransition();
  const [tripType, setTripType] = useState<(typeof TRIP_TYPES)[number]["value"]>(
    initialValues?.tripType ?? "oneway"
  );
  const [travelClass, setTravelClass] = useState(initialValues?.travelClass ?? TRAVEL_CLASSES[0]);
  const [passengers, setPassengers] = useState(initialValues?.passengers ?? 1);
  const [from, setFrom] = useState(initialValues?.from ?? "");
  const [to, setTo] = useState(initialValues?.to ?? "");
  const [isPassengersOpen, setIsPassengersOpen] = useState(false);
  const [isClassOpen, setIsClassOpen] = useState(false);
  const [departureDate, setDepartureDate] = useState(initialValues?.departureDate ?? "");
  const [returnDate, setReturnDate] = useState(initialValues?.returnDate ?? "");
  const [directFlightOnly, setDirectFlightOnly] = useState(initialValues?.directFlightOnly ?? false);
  const passengersRef = useClickOutside<HTMLDivElement>(() => setIsPassengersOpen(false));
  const classRef = useClickOutside<HTMLDivElement>(() => setIsClassOpen(false));

  const isRoundTrip = tripType === "roundtrip";

  function handleSearch() {
    onSearchStart?.();

    const params = new URLSearchParams();
    params.set("tripType", tripType);
    if (from.trim()) params.set("from", from.trim());
    if (to.trim()) params.set("to", to.trim());
    if (departureDate) params.set("departureDate", departureDate);
    if (isRoundTrip && returnDate) params.set("returnDate", returnDate);
    params.set("travelClass", travelClass);
    params.set("passengers", String(passengers));
    if (directFlightOnly) params.set("directFlightOnly", "1");

    startSearchTransition(() => {
      router.push(`/flights?${params.toString()}`);
    });
  }

  return (
    <div className={cn("rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)]", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3 px-3 pb-2 pt-3 sm:px-4 sm:pb-3 sm:pt-4">
        <div className="flex flex-wrap items-center gap-2">
          {TRIP_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setTripType(type.value)}
              className={cn(
                "rounded-full px-4 py-2 text-[14px] font-medium transition-colors",
                tripType === type.value
                  ? "bg-[#EBF86C] text-[#2C341D]"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              )}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <div ref={classRef} className="relative">
            <button
              type="button"
              onClick={() => setIsClassOpen((value) => !value)}
              className="flex items-center gap-1 text-[14px] font-medium text-neutral-800"
            >
              {travelClass}
              <ChevronDown
                className={cn(
                  "size-4 text-neutral-400 transition-transform",
                  isClassOpen && "rotate-180"
                )}
              />
            </button>

            {isClassOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] z-20 w-[180px] rounded-2xl border border-neutral-100 bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
                {TRAVEL_CLASSES.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setTravelClass(option);
                      setIsClassOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center rounded-lg px-3 py-2.5 text-left text-[14px] font-medium transition-colors hover:bg-neutral-100",
                      travelClass === option ? "text-brand-blue" : "text-neutral-700"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div ref={passengersRef} className="relative">
            <button
              type="button"
              onClick={() => setIsPassengersOpen((value) => !value)}
              className="flex items-center gap-1 text-[14px] font-medium text-neutral-800"
            >
              {passengers} Passenger{passengers === 1 ? "" : "s"}
              <ChevronDown
                className={cn(
                  "size-4 text-neutral-400 transition-transform",
                  isPassengersOpen && "rotate-180"
                )}
              />
            </button>

            {isPassengersOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] z-20 w-[240px] rounded-2xl border border-neutral-100 bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-medium text-neutral-900">Passengers</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setPassengers((value) => Math.max(1, value - 1))}
                      disabled={passengers <= 1}
                      className="flex size-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-5 text-center text-[14px] font-semibold text-neutral-900">
                      {String(passengers).padStart(2, "0")}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPassengers((value) => Math.min(MAX_PASSENGERS, value + 1))}
                      disabled={passengers >= MAX_PASSENGERS}
                      className="flex size-8 items-center justify-center rounded-full bg-neutral-900 text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPassengersOpen(false)}
                  className="mt-4 flex h-10 w-full items-center justify-center rounded-xl bg-brand-lime text-[14px] font-semibold text-brand-dark transition-transform hover:scale-[1.02]"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 px-3 pb-3 pt-1 sm:px-4 sm:pb-4 sm:pt-2 lg:flex-row lg:items-center">
        <LocationField
          icon={<PlaneTakeoff className="size-[18px]" />}
          placeholder="From"
          value={from}
          onChange={setFrom}
        />
        <LocationField
          icon={<PlaneLanding className="size-[18px]" />}
          placeholder="To"
          value={to}
          onChange={setTo}
        />

        <SingleDateField
          icon={<Calendar className="size-[18px]" />}
          placeholder="Departure Date"
          value={departureDate}
          onChange={(nextDeparture) => {
            setDepartureDate(nextDeparture);
            if (returnDate && returnDate < nextDeparture) {
              setReturnDate("");
            }
          }}
        />

        <SingleDateField
          icon={<Calendar className="size-[18px]" />}
          placeholder="Book a round trip"
          value={returnDate}
          onChange={setReturnDate}
          minDateIso={departureDate || undefined}
          disabled={!isRoundTrip}
        />

        <button
          type="button"
          onClick={handleSearch}
          disabled={isSearching}
          className="flex h-[65px] shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-blue px-8 text-[15px] font-semibold text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSearching ? (
            <Loader2 className="size-[18px] animate-spin" />
          ) : (
            <Search className="size-[18px]" />
          )}
          {isSearching ? "Searching..." : "Search Flight"}
        </button>
      </div>

      <div className="px-3 pb-3 sm:px-4 sm:pb-4">
        <label className="flex items-center gap-2 text-[14px] text-neutral-700">
          <input
            type="checkbox"
            checked={directFlightOnly}
            onChange={(event) => setDirectFlightOnly(event.target.checked)}
            className="size-4 rounded border-neutral-300 text-brand-blue focus:ring-brand-blue"
          />
          Direct Flight Only
        </label>
      </div>
    </div>
  );
}
