import type { LegalBlock } from "@/lib/legalContent";

export function LegalBlockRenderer({ block }: { block: LegalBlock }) {
  if (block.type === "p") {
    return <p className="text-[15px] leading-[1.75] text-[#475467]">{block.text}</p>;
  }

  if (block.type === "h3") {
    return <h3 className="mt-2 text-[18px] font-semibold text-[#0d1b3e]">{block.text}</h3>;
  }

  if (block.type === "table") {
    return (
      <div className="overflow-x-auto rounded-xl border border-neutral-200">
        <table className="w-full min-w-[560px] border-collapse text-left text-[13px]">
          <thead>
            <tr className="bg-[#eaf2ff]">
              {block.columns.map((column) => (
                <th
                  key={column}
                  className="whitespace-nowrap border-b border-neutral-200 px-4 py-2.5 font-bold text-[#0d1b3e]"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 1 ? "bg-neutral-50" : "bg-white"}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="border-b border-neutral-100 px-4 py-2.5 text-[#475467]">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  const hasLabels = block.items.some((item) => item.label);

  if (hasLabels) {
    return (
      <div className="flex flex-col gap-4">
        {block.items.map((item, index) => (
          <p key={index} className="text-[15px] leading-[1.75] text-[#475467]">
            <span className="font-semibold text-[#0d1b3e]">{item.label}</span>
            {item.text ? <>{": "}{item.text}</> : null}
          </p>
        ))}
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2 pl-5 text-[15px] leading-[1.75] text-[#475467]">
      {block.items.map((item, index) => (
        <li key={index} className="list-disc marker:text-[#224ba0]">
          {item.text}
        </li>
      ))}
    </ul>
  );
}
