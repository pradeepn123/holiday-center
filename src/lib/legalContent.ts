export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: { label?: string; text: string }[] }
  | { type: "h3"; text: string }
  | { type: "table"; title?: string; columns: string[]; rows: string[][] };

export type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};
