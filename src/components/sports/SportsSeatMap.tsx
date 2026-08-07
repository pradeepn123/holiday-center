type SeatTone = "gray" | "amber" | "teal" | "pink" | "dark";

const TONE_CLASS: Record<SeatTone, string> = {
  gray: "bg-neutral-200 text-neutral-600",
  amber: "bg-amber-200/70 text-amber-900",
  teal: "bg-teal-400 text-white",
  pink: "bg-pink-200 text-pink-900",
  dark: "bg-neutral-900 text-white",
};

function Seat({ label, tone = "gray" }: { label: string; tone?: SeatTone }) {
  return (
    <span
      className={`flex h-6 min-w-[30px] items-center justify-center rounded-[4px] px-1 text-[9px] font-semibold ${TONE_CLASS[tone]}`}
    >
      {label}
    </span>
  );
}

const TOP_ROW_A: { label: string; tone: SeatTone }[] = [
  { label: "N11B", tone: "gray" },
  { label: "N12", tone: "amber" },
  { label: "N13", tone: "amber" },
  { label: "N14", tone: "teal" },
  { label: "N15", tone: "amber" },
  { label: "N16", tone: "amber" },
  { label: "G11A", tone: "gray" },
];

const TOP_ROW_B: { label: string; tone: SeatTone }[] = [
  { label: "N11A", tone: "gray" },
  { label: "N1", tone: "gray" },
  { label: "N2", tone: "amber" },
  { label: "N3", tone: "amber" },
  { label: "N4", tone: "teal" },
  { label: "N5", tone: "amber" },
  { label: "N6", tone: "amber" },
  { label: "G1", tone: "gray" },
  { label: "G11B", tone: "gray" },
];

const FAMILY_COLUMN = [
  ["O1", "G2"],
  ["O2", "G12"],
  ["O3", "O11"],
  ["O12"],
  ["O13"],
];

const BOTTOM_ROW_A = ["B1", "B2", "B3", "B4", "B5", "B6", "B7"];
const BOTTOM_ROW_B = ["W11B", "W1", "B11", "B12", "B13", "B14", "B15", "B16", "B17", "O4", "O14"];

export function SportsSeatMap() {
  return (
    <div className="rounded-2xl border border-[#0000001A] bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          className="rounded-full border border-neutral-200 px-4 py-1.5 text-[13px] font-semibold text-brand-blue"
        >
          Where will I sit?
        </button>
        <span className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
          Schwarz-Weiss Tribüne
        </span>
      </div>

      <div className="mt-6 overflow-x-auto pb-1">
        <div className="mx-auto flex w-max flex-col items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex gap-1.5 pl-8">
              {TOP_ROW_A.map((seat) => (
                <Seat key={seat.label} {...seat} />
              ))}
            </div>
            <div className="flex gap-1.5">
              {TOP_ROW_B.map((seat) => (
                <Seat key={seat.label} {...seat} />
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <span className="[writing-mode:vertical-rl] rotate-180 text-[9px] font-semibold uppercase tracking-wide text-neutral-400">
                Ask Stehplatz Tribüne
              </span>
              <div className="flex flex-col gap-1.5">
                <Seat label="A" tone="dark" />
                <Seat label="S" tone="dark" />
                <Seat label="K" tone="dark" />
              </div>
            </div>

            <div className="relative flex h-[160px] w-[190px] items-center justify-center rounded-md bg-[#2E9E4F]">
              <div className="absolute inset-2 rounded-sm border border-white/70" />
              <div className="size-16 rounded-full border border-white/70" />
              <div className="absolute left-0 top-1/2 h-8 w-2 -translate-y-1/2 border border-white/70" />
              <div className="absolute right-0 top-1/2 h-8 w-2 -translate-y-1/2 border border-white/70" />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-1">
                {FAMILY_COLUMN.map((row, index) => (
                  <div key={index} className="flex gap-1">
                    {row.map((label) => (
                      <Seat key={label} label={label} tone="amber" />
                    ))}
                  </div>
                ))}
              </div>
              <span className="[writing-mode:vertical-rl] text-[9px] font-semibold uppercase tracking-wide text-neutral-400">
                Familien Tribüne
              </span>
            </div>
          </div>

          <div className="mt-3 flex flex-col items-center gap-1.5">
            <div className="flex gap-1.5">
              {BOTTOM_ROW_A.map((label) => (
                <Seat key={label} label={label} tone="pink" />
              ))}
            </div>
            <div className="flex gap-1.5">
              {BOTTOM_ROW_B.map((label) => (
                <Seat key={label} label={label} tone="gray" />
              ))}
            </div>
            <Seat label="W11A" tone="gray" />
          </div>

          <div className="mt-4 flex w-full flex-col items-center gap-1.5">
            <div className="flex h-6 w-full max-w-[280px] items-center justify-center rounded-full bg-neutral-400 text-[10px] font-bold uppercase tracking-wide text-white">
              Logen
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
              BWT Businessclub Tribüne
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
