type TocSection = { id: string; title: string };

export function LegalTableOfContents({ sections }: { sections: TocSection[] }) {
  return (
    <nav className="hidden lg:block lg:w-[280px] lg:shrink-0">
      <div className="sticky top-28 flex max-h-[calc(100vh-140px)] flex-col gap-1 overflow-y-auto rounded-2xl border border-neutral-100 bg-white p-5">
        <p className="mb-2 text-[12px] font-bold uppercase tracking-wide text-[#5a6a80]">
          On this page
        </p>
        {sections.map((section, index) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="rounded-lg px-3 py-2 text-[13px] leading-snug text-[#475467] transition-colors hover:bg-[#eaf2ff] hover:text-[#224ba0]"
          >
            {index + 1}. {section.title}
          </a>
        ))}
      </div>
    </nav>
  );
}
