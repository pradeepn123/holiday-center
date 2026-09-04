import type { LucideIcon } from "lucide-react";

function ProfileRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <span className="text-[14px] text-[#64748b]">{label}</span>
      {value ? (
        <span className="text-[14px] font-bold text-[#0f172a]">{value}</span>
      ) : (
        <span className="text-[14px] text-[#cbd5e1]">---</span>
      )}
    </div>
  );
}

export function ProfileInfoCard({
  icon: Icon,
  title,
  rows,
}: {
  icon: LucideIcon;
  title: string;
  rows: { label: string; value?: string }[];
}) {
  return (
    <div className="rounded-2xl border border-[#e2e8f0] p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex items-center justify-center rounded-xl bg-[#eef2ff] p-2.5">
          <Icon className="size-[18px] text-[#224ba0]" />
        </span>
        <p className="text-[16px] font-bold text-[#0f172a]">{title}</p>
      </div>
      <div className="flex flex-col divide-y divide-[#f1f5f9]">
        {rows.map((row) => (
          <ProfileRow key={row.label} {...row} />
        ))}
      </div>
    </div>
  );
}
