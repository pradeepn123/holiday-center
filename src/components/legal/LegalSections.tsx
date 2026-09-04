import type { LegalBlock, LegalSection } from "@/lib/legalContent";
import { LegalBlockRenderer } from "./LegalBlockRenderer";

export function LegalSections({
  intro,
  sections,
  closing,
}: {
  intro: LegalBlock[];
  sections: LegalSection[];
  closing?: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-6">
      <div className="flex flex-col gap-4">
        {intro.map((block, index) => (
          <LegalBlockRenderer key={index} block={block} />
        ))}
      </div>

      {sections.map((section, index) => (
        <section key={section.id} id={section.id} className="scroll-mt-28 border-t border-neutral-100 pt-10">
          <h2 className="text-[22px] font-bold text-[#0d1b3e] sm:text-[24px]">
            {index + 1}. {section.title}
          </h2>
          <div className="mt-5 flex flex-col gap-4">
            {section.blocks.map((block, blockIndex) => (
              <LegalBlockRenderer key={blockIndex} block={block} />
            ))}
          </div>
        </section>
      ))}

      {closing && (
        <div className="border-t border-neutral-100 pt-10 text-[15px] leading-[1.75] text-[#475467]">
          {closing}
        </div>
      )}
    </div>
  );
}
