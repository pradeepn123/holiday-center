import type { LegalBlock, LegalSection } from "./legalContent";
import { feeScheduleBlocks } from "./feeScheduleContent";

export type TermsBlock = LegalBlock;
export type TermsSection = LegalSection;

export const termsLastUpdated = "June 2025";

export const termsIntro: TermsBlock[] = [
  {
    type: "p",
    text: 'Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the https://holidayscenter.com website (the "Service") operated by Holidays Center ("us", "we," or "our").',
  },
  {
    type: "p",
    text: "Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.",
  },
  {
    type: "p",
    text: "By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the Terms, then you may not access the Service.",
  },
];

export const termsSections: TermsSection[] = [
  {
    id: "termination",
    title: "Termination",
    blocks: [
      {
        type: "p",
        text: "We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.",
      },
      {
        type: "p",
        text: "All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity clauses, and limitations of liability.",
      },
    ],
  },
  {
    id: "accessing-our-site",
    title: "Accessing Our Site",
    blocks: [
      {
        type: "p",
        text: "Access to our site is permitted on a temporary basis, and we reserve the right to withdraw or amend the service that we provide on our site without notice (see below). We will not be liable if for any reason our site is unavailable at any time or for any period.",
      },
      {
        type: "p",
        text: "You are responsible for making all arrangements necessary for you to have access to our site. You are also responsible for ensuring that all persons who access our site and apps through your internet connection are aware of these terms and that they comply with them.",
      },
    ],
  },
  {
    id: "booking-through-holidays-center",
    title: "Booking Through Holidays Center",
    blocks: [
      {
        type: "p",
        text: "If you make a booking for a travel product through our site or apps, that booking is made with the travel provider named on the booking page, and our sites only act as user interfaces. Accordingly, we have no responsibility for the booking or the travel product because we have no involvement in creating the description of the travel product, in defining the price and any applicable fees, and in providing the travel products that you book. If you have any issues or disputes regarding your booking and/or the travel product, you agree to address and resolve these with the travel provider and not with us.",
      },
    ],
  },
  {
    id: "quotes-and-itineraries",
    title: "Quotes & Itineraries",
    blocks: [
      {
        type: "p",
        text: "Holidays Center provides travel booking services as an agent for third party travel providers, including airlines, hotels, cruise operators, and tour companies. Your booking is subject not only to our Terms and Conditions but also to the terms and conditions of each individual supplier. It is the customer’s responsibility to review and understand the terms of all relevant service providers, as these may govern cancellation penalties, refunds, rebooking options, and service delivery.",
      },
    ],
  },
  {
    id: "customer-acknowledgment",
    title: "Customer Acknowledgment of Terms and Conditions",
    blocks: [
      {
        type: "p",
        text: "All customers are required to acknowledge and agree to our Terms and Conditions before completing a booking with Holidays Center. For online bookings, this is done by checking a confirmation box prior to final submission. For bookings completed through email, phone, or other channels, we will send a digital agreement to the customer, which must be signed and returned to confirm acceptance before any payment or reservation is processed.",
      },
    ],
  },
  {
    id: "schedule-of-fees",
    title: "Schedule of Fees",
    blocks: feeScheduleBlocks,
  },
  {
    id: "member-accounts",
    title: "Member Accounts, Passwords, and Security",
    blocks: [
      {
        type: "p",
        text: "Certain areas of the website or the app may be password-restricted and require registration or sign-in before they can be accessed. When you complete our registration process, you will receive a profile and select your own password, which will enable you to access all travel services. You agree to maintain the confidentiality of your password and are fully responsible for all liability and damages resulting from your failure to maintain that confidentiality and for all activities that occur through the use of your password. You agree to immediately notify us of any unauthorized use of your password or any other breach of security. You agree that Holidays Center cannot and will not be liable for any loss or damage arising from your failure to comply with this policy.",
      },
      {
        type: "p",
        text: "When you have logged into your profile, you will remain logged in until you log out, even if you close the browser used by you.",
      },
    ],
  },
  {
    id: "content-submitted",
    title: "Content Submitted for Inclusion On or For Distribution Through Holidays Center",
    blocks: [
      {
        type: "p",
        text: "You acknowledge that you are responsible for the information, photographs, graphics, messages, content, and other material that you upload, post, email, or otherwise submit to the website or the app, or make available using the Service, and that you have full responsibility for each of your submissions, including its legality, reliability, appropriateness, originality, and copyright. Holidays Center does not claim ownership of content (including photos and graphics) you submit or make available for inclusion as part of our travel content. However, with respect to travel content you submit or make available for inclusion as part of Holidays Center’s travel content, you grant Holidays Center a worldwide, royalty-free, and non-exclusive license to use, distribute, reproduce, modify, adapt, and publicly display such content for the purposes of providing and promoting the destination to which such content was submitted.",
      },
      {
        type: "p",
        text: 'This license exists only for as long as you elect to continue to include such content on the Service and will terminate at the time you remove or Holidays Center removes such content from the Service. You agree to provide a worldwide, royalty-free, non-exclusive, and irrevocable license to use, distribute, reproduce, modify, adapt, publicly display, and sublicense content (including photos and graphics) you submit or make available for inclusion in "publicly accessible" areas of the Service. "Publicly accessible" areas of the Service are those areas that are intended by Holidays Center to be available to the general public, including travel content where the option to share travel content with the public has been selected. Publicly accessible areas do not include travel content that you have selected to keep as your favorite travel content. Holidays Center does not control the content posted by third parties via the Service and, as such, does not guarantee the accuracy, integrity, or quality of such content. You understand that by using the Service, you may be exposed to content that is offensive, indecent, or objectionable. Under no circumstances will Holidays Center be liable in any way for any content, including, but not limited to, any errors or omissions in any content, or for any loss or damage of any kind incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available via the Service.',
      },
    ],
  },
  {
    id: "prohibited-uses",
    title: "Prohibited Uses",
    blocks: [
      { type: "p", text: "You may use our site only for lawful purposes. You may not use our site or apps:" },
      {
        type: "list",
        items: [
          { text: "in any way that breaches any applicable law or regulation;" },
          { text: "in any way that is unlawful or fraudulent, or has any unlawful or fraudulent purpose or effect;" },
          { text: "for the purpose of harming or attempting to harm anyone in any way;" },
          { text: "for any commercial or trading purpose, or for any use other than private use, without our prior express written permission;" },
          { text: "to transmit, or procure the sending of, any unsolicited or unauthorized advertising or promotional material or any form of similar solicitation (spam);" },
          { text: "in contravention of any of these Terms of Use." },
        ],
      },
      {
        type: "p",
        text: "You acknowledge that Holidays Center may or may not screen content, but that Holidays Center has the right (but not the obligation) at its sole discretion to screen, refuse, or move any content that is available via the Service. Without limiting the foregoing, Holidays Center and its designees shall have the right to remove any content that violates these Terms of Use or is otherwise deemed objectionable. You agree that you must evaluate, and bear all risks associated with, the use of any content, including any reliance on the accuracy, completeness, or usefulness of such content. In this regard, you acknowledge that you may not rely on any content created by Holidays Center or submitted to Holidays Center.",
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property Rights",
    blocks: [
      {
        type: "p",
        text: "We are the owner or the licensee of all intellectual property rights on our site and in the material published on it. Those works are protected by copyright laws and treaties around the world. All such rights are expressly reserved.",
      },
      {
        type: "p",
        text: "You may print off one copy and may download extracts of any page(s) from our site for your personal and private reference, and you may draw the attention of others within your organization to material posted on our site. In so doing, our status (and that of any identified contributors) as the authors of material on our site must always be expressly acknowledged by you.",
      },
      {
        type: "p",
        text: "You must not modify the paper or digital copies of any materials that you have printed off or downloaded in any way, and you must not use any illustrations, photographs, video or audio sequences, or any graphics separately from any accompanying text.",
      },
      {
        type: "p",
        text: "If you print off, copy, or download any part of our site in breach of these Terms of Use, your right to use our site will cease immediately and you must, at our option, return or destroy any copies of the materials you have made.",
      },
      { type: "p", text: 'The composite word-and-device "Holidays Center" logo, and each element of it, are trademarks owned and used by us.' },
    ],
  },
  {
    id: "site-changes",
    title: "Our Site Changes Regularly",
    blocks: [
      {
        type: "p",
        text: "We aim to update our site regularly and may change the content at any time. If the need arises, we may suspend access to our site, or close it indefinitely. Any of the material on our site may be out of date at any given time, and we are under no obligation to update such material.",
      },
    ],
  },
  {
    id: "our-liability",
    title: "Our Liability",
    blocks: [
      {
        type: "p",
        text: "To the extent permitted by law, we, other members of our group of companies, and third parties connected to us hereby expressly exclude:",
      },
      {
        type: "list",
        items: [
          {
            text: "all conditions, warranties, and other terms which might otherwise be implied by statute, common law, or the law of equity, whether relating to the accuracy of any material displayed on our site or to the accessibility of our site or otherwise howsoever;",
          },
          {
            text: "any liability for any direct, indirect, or consequential loss or damage incurred by any user in connection with our site or in connection with the use, inability to use, or results of the use of our site, any websites linked to it, and any commentaries or other materials posted on it (which, for the avoidance of doubt, are not intended to constitute advice on which any reliance should be placed), including without limitation any liability for:",
          },
        ],
      },
      {
        type: "list",
        items: [
          { text: "loss of income or revenue;" },
          { text: "loss of business;" },
          { text: "loss of profits or contracts;" },
          { text: "loss of anticipated savings;" },
          { text: "loss of data;" },
          { text: "loss of goodwill;" },
          { text: "wasted management or office time; and" },
          { text: "any other loss or damage of any kind, however arising and whether caused by tort (including negligence), breach of contract, or otherwise, even if foreseeable." },
        ],
      },
      {
        type: "p",
        text: "This condition shall not prevent claims for loss of or damage to your tangible property or any other claims for direct financial loss that are not excluded by any of the categories set out above.",
      },
      {
        type: "p",
        text: "This does not affect our liability for death or personal injury arising from our negligence, or our liability for fraudulent misrepresentation or misrepresentation as to a fundamental matter, or any other liability that cannot be excluded or limited under applicable law.",
      },
    ],
  },
  {
    id: "complaints-handling",
    title: "Complaints Handling & Dispute Resolution",
    blocks: [
      {
        type: "p",
        text: "We aim to resolve all complaints promptly and professionally. If you are dissatisfied with any aspect of your booking or experience with Holidays Center, you may contact us in writing at booking@holidayscenter.com. We will acknowledge your complaint within 2 business days and aim to resolve all issues within 10 business days.",
      },
      {
        type: "p",
        text: "Our internal complaints process is outlined here: https://holidayscenter.com/feedbackpolicy",
      },
      {
        type: "p",
        text: "If you are not satisfied with our response, you may refer your complaint to ATIA. Holidays Center Australia is proud to hold ATIA Accreditation. ATIA monitors our compliance with the ATAS Code of Conduct and assists in resolving complaints. For more information or to lodge a complaint, visit: https://www.atas.com.au",
      },
    ],
  },
  {
    id: "information-about-you",
    title: "Information About You and Your Visits to Our Site",
    blocks: [
      {
        type: "p",
        text: "We process information about you in accordance with our privacy policy. By using our site, you consent to such processing and you warrant that all data provided by you is accurate.",
      },
    ],
  },
  {
    id: "links-to-other-websites",
    title: "Links to Other Websites",
    blocks: [
      { type: "p", text: "Our Service may contain links to third-party websites or services that are not owned or controlled by Holidays Center." },
      {
        type: "p",
        text: "Holidays Center has no control over and assumes no responsibility for the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.",
      },
      { type: "p", text: "We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or services that you visit." },
    ],
  },
  {
    id: "visa-passports-health",
    title: "Visa, Passports, and Health Requirements",
    blocks: [
      {
        type: "p",
        text: "It is the traveler’s responsibility to ensure they have the correct documents and vaccinations for travel. This includes valid passports (with at least 6 months validity from the return date), visas for each destination, and any required health certifications or vaccinations. We recommend visiting the following official websites for accurate and current travel requirements:",
      },
      {
        type: "list",
        items: [
          { text: "www.smartraveller.gov.au" },
          { text: "www.homeaffairs.gov.au" },
          { text: "visalink.com.au" },
        ],
      },
      {
        type: "p",
        text: "For travelers heading to the United States, including Hawaii, it is mandatory to obtain an ESTA (Electronic System for Travel Authorization) at least 72 hours prior to departure: https://esta.cbp.dhs.gov/esta/",
      },
      {
        type: "p",
        text: "We strongly recommend consulting a medical professional for any travel-related health requirements and vaccinations well in advance of departure. Holidays Center will not be responsible for any costs or travel interruptions caused by incomplete or incorrect documentation.",
      },
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    blocks: [
      {
        type: "p",
        text: "These Terms shall be governed and construed in accordance with the laws of Australia, without regard to its conflict of law provisions.",
      },
      {
        type: "p",
        text: "Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service and supersede and replace any prior agreements we might have between us regarding the Service.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes",
    blocks: [
      {
        type: "p",
        text: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days’ notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.",
      },
    ],
  },
  {
    id: "your-concerns",
    title: "Your Concerns",
    blocks: [{ type: "p", text: "If you have any concerns about material which appears on our site, please contact us." }],
  },
];
