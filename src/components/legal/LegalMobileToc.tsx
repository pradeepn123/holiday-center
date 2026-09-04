type TocSection = { id: string; title: string };

export function LegalMobileToc({ sections }: { sections: TocSection[] }) {
  return (
    <details className="rounded-2xl border border-neutral-100 bg-white p-5 lg:hidden">
      <summary className="cursor-pointer text-[13px] font-bold uppercase tracking-wide text-[#5a6a80]">
        Jump to a section
      </summary>
      <div className="mt-3 flex flex-col gap-1">
        {sections.map((section, index) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="rounded-lg px-3 py-2 text-[13px] leading-snug text-[#475467] hover:bg-[#eaf2ff] hover:text-[#224ba0]"
          >
            {index + 1}. {section.title}
          </a>
        ))}
      </div>
    </details>
  );
}
