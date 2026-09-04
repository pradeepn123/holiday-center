import type { LegalBlock } from "./legalContent";

/** Shared fee-schedule content, reused by the Terms & Conditions and Refund Policy pages. */
export const feeScheduleBlocks: LegalBlock[] = [
  { type: "h3", text: "Post-Ticketing Service Fees" },
  {
    type: "table",
    columns: ["Applies To", "For", "Amount Per Ticket"],
    rows: [
      [
        "Agent Assisted Cancellation¹",
        "Cancellation within 4 hours of the reservation and before 12 am on the reservation date.",
        "Without cost",
      ],
      ["Agent Assisted Cancellation¹", "Cancellation made after four hours but before midnight.", "AUD 25 for each booking"],
      [
        "Agent Assisted Cancellation¹",
        "Cancellation after midnight and within 24 hours of the reservation (Australian websites only).",
        "AUD 25 for each booking",
      ],
    ],
  },
  { type: "h3", text: "Cancellation & Refunds (beyond 24 hrs)" },
  {
    type: "table",
    columns: [
      "Service",
      "Economy – Domestic",
      "Economy – International",
      "Business/First – Domestic",
      "Business/First – International",
    ],
    rows: [
      ["Agent Assist Cancellation¹ with Future Credit", "AUD 50", "AUD 50", "AUD 100", "AUD 100"],
      ["Agent Assist Cancellation² with Refund", "AUD 100", "AUD 250", "AUD 250", "AUD 250"],
    ],
  },
  { type: "h3", text: "Changes to Existing Tickets (exchange)" },
  {
    type: "table",
    columns: [
      "Timing",
      "Economy – Domestic",
      "Economy – International",
      "Business/First – Domestic",
      "Business/First – International",
    ],
    rows: [
      ["Within 4 hours", "AUD 25", "AUD 50", "AUD 50", "AUD 50"],
      ["Within 10 days of new travel date", "AUD 150", "AUD 250", "AUD 250", "AUD 250"],
      ["Beyond 10 days of new travel date²", "AUD 100", "AUD 200", "AUD 200", "AUD 250"],
    ],
  },
  { type: "h3", text: "Special Services" },
  {
    type: "p",
    text: "Agent Assisted Refund or assistance with obtaining a Future Airline Credit due to any of the reasons noted³ (our service fees are applicable upon success, but do not include airline fees).",
  },
  {
    type: "table",
    columns: ["Service", "Fee"],
    rows: [
      ["Misspelled Passenger Name", "AUD 50"],
      ["Visa/Passport Services", "AUD 50"],
      ["Baggage Related Service", "AUD 25"],
      ["No-Show Services", "AUD 25"],
      ["Denied Boarding Services", "AUD 25"],
      ["Duplicate Booking Services", "AUD 25"],
    ],
  },
  {
    type: "list",
    items: [
      {
        text: "Special Discounts are available through our Compassion Exception Policy (CEP). Our CEP Policy includes provisions for members of the armed forces, senior citizens (over 64), bereavement, youth (between 16 and 25), terminally ill individuals, and those with disabilities.",
      },
      { text: "All Airline Refunds/Future Credits are subject to each airline's fare rules, policies, and procedures." },
      {
        text: "Service fees will be converted into your local currency on the payment page. Passenger types = Adult, Child, Infant. *Approximate amount.",
      },
      {
        text: "All post-ticketing service fees are non-refundable and are subject to change without notice. Holidayscenter fees, additional fares collected, and other charges are in addition to any airline, hotel, or car rental fees and charges. You will only be charged the final total amount.",
      },
      { text: "Government-imposed taxes and fees are subject to change. You will only be charged the final total amount as shown." },
      {
        text: 'Most of our airline tickets are non-refundable. Only available if our Travel Suppliers’ fare rules allow cancellation and refunds, and we have accepted your request for a refund, you are not a "no show" (most "no show" bookings are ineligible for any waiver from suppliers for refund processing), and if we are able to secure waivers from suppliers to process this requested cancellation and refund.',
      },
      { text: "Most of our airline tickets are non-refundable. Airline Refunds/Future Credits are subject to airline fare rules, policies, and procedures." },
      {
        text: "Special Services – All Services noted are on a Request Basis ONLY and are subject to each Airline's review and approval process, along with their fare rules, policies, and procedures.",
      },
    ],
  },
  {
    type: "list",
    items: [
      { label: "Name Misspelling", text: "Passenger's name on their airline ticket does not match their passport or other universally accepted government ID." },
      { label: "Visa/Passport", text: "A visa/passport decline letter is normally required in order to process a request." },
      { label: "Baggage", text: "Please retain all receipts and baggage tags." },
      { label: "No-Show", text: "Documentation advising why you were unable to make your scheduled departure will be required." },
      { label: "Denied Boarding", text: "Documentation explaining why you were denied boarding of your scheduled departure will be required." },
      { label: "Duplicate Tickets", text: "Copies of all tickets, reflecting the exact same itineraries booked with us, will be required in order to process a refund request." },
    ],
  },
];
