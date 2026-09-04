import type { LegalBlock, LegalSection } from "./legalContent";

export const feedbackPolicyIntro: LegalBlock[] = [
  {
    type: "p",
    text: "Holidays Center Australia is committed to providing the highest level of customer service. We take all feedback seriously and have developed this policy to ensure that complaints are handled in a fair, timely, and respectful manner.",
  },
];

export const feedbackPolicySections: LegalSection[] = [
  {
    id: "how-to-submit-a-complaint",
    title: "How to Submit a Complaint",
    blocks: [
      {
        type: "p",
        text: "Complaints can be submitted via email to: info@holidayscenter.com. Please include your full name, contact details, booking reference (if applicable), and a clear description of the issue.",
      },
    ],
  },
  {
    id: "acknowledgment",
    title: "Acknowledgment",
    blocks: [{ type: "p", text: "We will acknowledge receipt of your complaint within 2 business days." }],
  },
  {
    id: "investigation-and-resolution-timeline",
    title: "Investigation and Resolution Timeline",
    blocks: [
      {
        type: "p",
        text: "All complaints will be investigated thoroughly. We aim to resolve most issues within 10 business days. If further time is required, we will keep you informed of progress and reasons for any delay.",
      },
    ],
  },
  {
    id: "resolution-process",
    title: "Resolution Process",
    blocks: [
      { type: "p", text: "Once your complaint has been reviewed:" },
      {
        type: "list",
        items: [
          { text: "We will provide a written response including any findings or actions taken." },
          { text: "Where appropriate, we may offer remedies such as refunds, rebooking, or compensation." },
        ],
      },
    ],
  },
  {
    id: "escalation",
    title: "Escalation",
    blocks: [
      { type: "p", text: "If you are not satisfied with the outcome of your complaint:" },
      {
        type: "list",
        items: [
          { text: "You may request escalation to a senior staff member for further review." },
          { text: "If still unresolved, you may refer your complaint to the Australian Travel Industry." },
        ],
      },
      {
        type: "p",
        text: "ATIA monitors our compliance with the ATAS Code of Conduct and provides an independent complaint resolution process. Visit www.atas.com.au for more information.",
      },
    ],
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    blocks: [
      {
        type: "p",
        text: "All complaints will be handled with strict confidentiality and in accordance with our Privacy Policy: https://holidayscenter.com/privacy-policy",
      },
    ],
  },
  {
    id: "continuous-improvement",
    title: "Continuous Improvement",
    blocks: [
      {
        type: "p",
        text: "Feedback from complaints is used to improve our services. We review complaint trends and adjust policies or staff training where needed.",
      },
    ],
  },
];

export const feedbackPolicyClosing =
  "For questions about this policy or to submit a complaint, contact: info@holidayscenter.com";
