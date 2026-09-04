import type { LegalBlock, LegalSection } from "./legalContent";

export type PrivacyBlock = LegalBlock;
export type PrivacySection = LegalSection;

export const privacyPolicyIntro: PrivacyBlock[] = [
  {
    type: "p",
    text: 'This privacy statement ("Statement") applies to HolidaysCenter llc, its subsidiaries (collectively, "HolidaysCenter," "we," or "us"). At HolidaysCenter, we strive to deliver outstanding products, services, and experiences around the world. We value your business and, more importantly, your loyalty. We recognize that privacy is an important issue. We have developed this Statement to explain our practices regarding the personal information we collect from you or about you on this site or via our apps, through written or verbal communications with us, when you visit one of our properties, or from other sources. While this Statement broadly describes the practices we have adopted across HolidaysCenter globally, local laws vary and some jurisdictions may place restrictions on our processing activities (e.g., certain jurisdictions may require affirmative consent to send marketing messages). Therefore, our actual practices in such jurisdictions may be more limited than those described herein in order to enable us to comply with local requirements. If you are a resident of the European Economic Area (EEA), please see Appendix A for additional information regarding HolidaysCenter’s use of your personal information.',
  },
  {
    type: "p",
    text: "By using any of our products or services and/or by agreeing to this Statement, e.g. in the context of registering for any of our products or services, you understand and acknowledge that we will collect and use personal information as described in this Statement.",
  },
  {
    type: "p",
    text: "Please note that this Statement does not apply to our processing of personal information on behalf of and subject to the instructions of third parties such as airlines, car rental companies, and other service providers, companies that organize or offer packaged travel arrangements, marketing partners, or corporate customers.",
  },
];

export const privacyPolicySections: PrivacySection[] = [
  {
    id: "personal-information-we-collect",
    title: "Personal Information We Collect",
    blocks: [
      {
        type: "p",
        text: "We collect personal information at every touchpoint or guest interaction, and in conducting every aspect of our business, we may collect personal information. This personal information may include: your name, mailing address, billing address, email address, phone number, information related to your reservation, stay or visit to a property; participation in a membership or loyalty program; participation in a contest, sweepstakes, or marketing program (even if you do not stay at one of our hotels); information related to the purchase and receipt of products or services; personal characteristics, nationality, income, passport number and date and place of issue; travel history; payment information, such as your payment card number and other card information, as well as authentication information and other billing and account details associated with mobile billing; guest preferences; marketing and communication preferences; information about vehicles you may bring onto our properties; reviews and opinions about our Portfolio of Brands or properties (if they are identified or associated with you); frequent flyer or travel partner program affiliation and member number; hotel, airline and rental car packages booked; groups with which you are associated for stays at hotels; information provided on membership and account applications; and other types of information that you choose to provide to us or that we may obtain about you.",
      },
      {
        type: "p",
        text: "We may ask for details on joint travelers, including their names and frequent flyer numbers, and the age of the driver of the rental car. We may also collect information related to conversations, including recording or monitoring customer service calls for quality assurance and training purposes, and other communications such as in-app messages and SMS.",
      },
      { type: "p", text: "In addition, we collect other personal information in certain cases, such as:" },
      {
        type: "list",
        items: [
          {
            label: "HolidaysCenter",
            text: "When you enroll in our HolidaysCenter, you will receive a HolidaysCenter number and we will ask you to create a user ID and password. We also collect information to administer the HolidaysCenter program and profiles, including transaction and correspondence details, and to provide you with our HolidaysCenter App functionality (where available). When you manage your profile online, you have the opportunity to provide additional information, such as your preferred airlines and your loyalty program account numbers with your room type preferences, your language preferences, your payment card account(s), and your email subscription preferences for receiving news, offers, and information from us and our partners. Also, when you book a reservation, we may ask for additional specific account information such as corporate account number, group or convention code, travel agent number, or AAA number. If you apply for a payment card or other account with one of our partners via one of our advertisements or on our properties, you may have the option to automatically add this information as part of your HolidaysCenter profile.",
          },
          {
            label: "Surveys",
            text: "We may request demographic data or other personal information in customer surveys.",
          },
          {
            label: "Social Media",
            text: "If you choose to participate in HolidaysCenter-sponsored social media activities or offerings, we may collect certain information from your social media account consistent with your settings within the social media service, such as location, check-ins, activities, interests, photos, status updates, and friend list. We may also allow you to enter into contests to provide photos, such as of your stay with us, which you may share with your connections on social media for votes, shared offers, or other promotions.",
          },
        ],
      },
      {
        type: "p",
        text: "In addition to the information we collect from you directly, we may also infer information about you based on the information you provide to us or from Other Information we collect.",
      },
    ],
  },
  {
    id: "personal-information-from-third-parties",
    title: "Personal Information We Collect from Third Parties",
    blocks: [
      {
        type: "p",
        text: "We may also collect information about you from third parties, including information from our airline, payment card, and other partners; from your social media services consistent with your settings on such services; and from other third-party sources that are lawfully entitled to share your data with us. We use and share this information (and may append this information to the other information we have on file for you) for the purposes described in this Statement.",
      },
    ],
  },
  {
    id: "use-of-personal-information",
    title: "Use of Personal Information Collected About You",
    blocks: [
      {
        type: "p",
        text: "We use your personal information in a number of ways, including to provide and personalize the services you request and expect from HolidaysCenter, to offer you the expected level of hospitality in-room and throughout our properties, administer the HolidaysCenter, conduct direct marketing and sales promotions and as set forth below in more detail. We will collect your consent prior to processing your data where required by applicable law.",
      },
      {
        type: "p",
        text: "We are obligated to collect certain data, including your name, address, payment information, and, in certain countries, travel document information, in order to process your reservation. Failure to provide this information will result in our inability to process your reservation.",
      },
      {
        type: "list",
        items: [
          {
            label: "HolidaysCenter Members",
            text: "If you are a HolidaysCenter member, HolidaysCenter uses your information to administer the HolidaysCenter club, to personalize your experience across our services and applications, and in connection with our HolidaysCenter App (where available). HolidaysCenter also uses your information to communicate news, promotional, and transactional materials across different HolidaysCenter services and to personalize advertising and content delivered to you through online, email, mobile, and display advertising, as well as on our website and applications and through our customer service call center in accordance with any communications preferences you have expressed.",
          },
          {
            label: "Service Administration",
            text: "We use your personal information to administer programs in which you participate, including providing you with access to your account information, to fulfill services that are part of such club; to enable direct communication between HolidaysCenter and you, and to facilitate collections.",
          },
          {
            label: "Meeting and Event Planning",
            text: "We may use your personal information to provide you with information about meeting and event planning.",
          },
          {
            label: "Marketing and Communications",
            text: "Where permitted we may use your personal information to provide or offer you newsletters, promotions, and featured specials, as well as other marketing messages in accordance with any communications preferences you have expressed. We use your information to provide in-stay messaging, account alerts, and reservation confirmations; to send you marketing messages; and to conduct surveys, sweepstakes, prize draws, and other contests. We may provide these communications via email, postal mail, online advertising, social media, telephone, text message (including SMS and MMS), push notifications, in-app messaging, and others. With your consent, we also use user-generated content (such as photos) from social media services to deliver display advertising or on our website and apps. We may also collect information from your payment card, which can be appended to personal information and used by HolidaysCenter or its business partners to recognize what type of card you have, such as whether or not it is a HolidaysCenter co-branded card and/or the bank or network of the card, and present and/or send you targeted marketing messages based on your payment method and in accordance with your communication preferences. We may also partner with third parties to learn whether a visitor to our site has a cash-back offer associated with their payment card and to deliver the visitor advertising and information that explains how to take advantage of that offer through HolidaysCenter.",
          },
          {
            label: "Service Improvements",
            text: "We may use your personal information to improve HolidaysCenter's services and to ensure that our site, products, and services are of interest to you. We also use your personal information to provide you with the expected level of hospitality.",
          },
          {
            label: "eFolio Program",
            text: "We may enroll you in our eFolio program and use your email address to send you any bill via email. It is your responsibility to ensure that we have the correct (and preferred) email address for you. If you make a reservation for another person using your email address, that person’s eFolio will be sent to your email address.",
          },
          {
            label: "Data Correctness, Analytics, and Personalization",
            text: "We may aggregate your personal information with data from third-party sources for purposes of keeping the information up to date and analytics. We also rely on information from third parties in order to provide better, more personalized service. For example, if you connect your social media services or other accounts to our services, we may use this information to make your experiences with us more personal and social or share and use it as described elsewhere in this Statement.",
          },
        ],
      },
    ],
  },
  {
    id: "personal-information-we-share",
    title: "Personal Information We Share",
    blocks: [
      {
        type: "p",
        text: "In order to offer you the expected level of hospitality and to provide you with the best level of service, we may share your personal information among members of the HolidaysCenter, our service providers, and other third parties as set forth in detail below:",
      },
      {
        type: "list",
        items: [
          { label: "HolidaysCenter", text: "We may share personal information within the HolidaysCenter Company." },
          {
            label: "Electronic Billing Program",
            text: "If you receive an eFolio by email (as discussed above), a summary detailing the goods and services provided to you during your stay will be shared with the payment card provider and, if you participate in a corporate billing program and use a corporate payment card, the payment card provider may share that summary with your employer. Additionally, if you participate in a special rate plan, we may share lists of HolidaysCenter numbers that used the plan with the entity that provided the special rate plan to you. The privacy policies of your employer, the relevant payment card provider, and the card issuer apply once we have transferred your information.",
          },
          {
            label: "Group Events or Meetings",
            text: "If you visit HolidaysCenter as part of a group event or meeting, information collected for meeting and event planning may be shared with the organizers of those meetings and events, and, where appropriate, guests who organize or participate in the meeting or event.",
          },
          {
            label: "Business Partners",
            text: "We may partner with other companies to provide you with products, services, or offers based on your experiences at our properties and may share your information with our business partners accordingly. For example, we may help to arrange rental cars or other services from our business partners and share personal information with our business partners in order to provide those services. If you are a HolidaysCenter member, we may share your personal information with our business partners in order to credit you with mileage or other benefits earned through your participation in the HolidaysCenter program. We may also share your personal information, such as your email address, with our corporate travel partners to help them assess compliance with travel policies, participate in special rate plans, or to engage in co-branded marketing with our corporate travel partners. We may also work with third parties, such as our airline and payment card partners, to allow us and our partners to deliver advertisements to our shared customers. Our partners may be able to provide more relevant offers to you based on information that we share about your experiences at our properties, as well as information in your HolidaysCenter profile. Additionally, we may allow third-party partners to recognize you when you visit that partner’s website or app, or to recognize you as one of their customers when you visit HolidaysCenter websites or apps so that they may provide more relevant offers to you. We may share a hashed version of your email address with third parties using available security measures that may match it with their own hashed versions of email addresses so that they can send online and email advertisements to you on our behalf.",
          },
          {
            label: "Co-Sponsors of Promotions",
            text: "We co-sponsor promotions, sweepstakes, prize draws, competitions, or contests with other companies, and we provide prizes for sweepstakes and contests sponsored by other companies. If you enter one of these sweepstakes or contests, we may share your information with the co-sponsor or third-party sponsor.",
          },
          {
            label: "Service Providers",
            text: "We rely on third parties to provide services and products on our behalf and may share your personal information with them as appropriate. Generally, our service providers are contractually obligated to protect your personal information and may not otherwise use or share your personal information, except as may be required by law. However, our fraud detection service providers may use, but not share, your personal information for fraud detection purposes. We may use service providers to communicate news and deliver promotional and transactional materials to you on our behalf, including personalized online and mobile advertising in accordance with your preferences and applicable law. Please see our Cookies Statement for more information. HolidaysCenter will only work with parties that offer a method to opt-out of such advertising. We may also share information with service providers to allow you to create itineraries by selecting sites, activities, and restaurants from lists that we have personalized for you based on your preferences and third-party data.",
          },
          {
            label: "Business Transactions",
            text: "As we develop our business, we might sell, buy, restructure, or reorganize businesses or assets, or cease being the manager or franchiser of a hotel that is currently part of our portfolio. In such circumstances, HolidaysCenter may transfer, sell, or assign information collected, including, without limitation, Other Information (described below) and personal information, to one or more affiliated or unaffiliated third parties in connection with these business transactions. To the extent that local laws require it, we will provide notice of our intent to transfer personal data to a third party for this purpose and explain how you can object to such transfer.",
          },
          {
            label: "Telemarketing",
            text: "If you stay at one of our hotels and are a HolidaysCenter member, we may share your telephone number with the HolidaysCenter Company, for purposes of telemarketing in accordance with your preferences and applicable law. We may also receive your telephone number from our partners or from other sources, which we may use for telemarketing purposes.",
          },
          {
            label: "Other",
            text: "In addition, HolidaysCenter may disclose personal information in order to: (i) comply with applicable laws, (ii) respond to governmental inquiries or requests from public authorities, (iii) comply with valid legal processes, (iv) protect the rights, privacy, safety or property of HolidaysCenter, site visitors, guests, employees or the public, (v) permit us to pursue available remedies or limit the damages that we may sustain, (vi) enforce our website’s terms and conditions, and (vii) respond to an emergency.",
          },
        ],
      },
    ],
  },
  {
    id: "other-information",
    title: "Other Information",
    blocks: [
      {
        type: "p",
        text: 'When you visit and interact with HolidaysCenter websites and apps, we collect other information that does not directly identify you about your use of the site, such as a catalog of the site pages you visit, and the number of visits to our sites ("Other Information"). We use Other Information, as well as data received from third parties, to deliver you an email, online (on our sites and other sites), and mobile advertisements. We may also use Other Information to allow third-party partners to recognize you as a HolidaysCenter member when you visit the partner’s website or app, or to recognize you as one of their customers when you visit HolidaysCenter websites or apps so that they may provide more relevant offers to you.',
      },
      {
        type: "p",
        text: 'We use cookies and other technologies (such as "pixel tags," "web beacons," "clear GIFs", links in emails, JavaScript, device IDs assigned by Google or Apple, or similar technologies) to collect this information. If you want to remove or block Cookies from your device at any time, you can update your browser settings (consult your browser’s "help" menu to learn how to remove or block Cookies). HolidaysCenter is not responsible for your browser settings. You can find good and simple instructions on how to manage Cookies on the different types of web browsers at www.allaboutcookies.org. Note for EEA and UK-Residents: If you are based in Europe, you also can adjust your Cookie preferences by adjusting the Cookie Settings through the Cookie Consent Manager.',
      },
      {
        type: "p",
        text: "You can learn more about interest-based advertising and how to opt-out of our vendors and other advertisers’ use of Cookies to tailor content or advertising to you by visiting http://optout.networkadvertising.org/#!/ and http://www.aboutads.info/choices.",
      },
      {
        type: "p",
        text: "At this time, we do not respond to Do Not Track signals or other, similar mechanisms. Please see our Cookies Statement for more information.",
      },
      {
        type: "p",
        text: "We may use the information we have collected and aggregated, or anonymized personal information received from third parties, to understand more about our users (for example, we may use the aggregated information to calculate the percentage of our users who have a particular telephone area code). This includes demographic data, such as date of birth, gender, and marital status, inferred commercial interests, such as favorite products or hobbies, and other information we may collect from you or from third parties.",
      },
      {
        type: "p",
        text: "Because Other Information does not personally identify you, such information may be disclosed for any purpose where permitted by law. In some instances, we may combine Other Information with personal information. If we do combine any Other Information with personal information, the combined information will be treated by us as personal information in accordance with this Statement.",
      },
    ],
  },
  {
    id: "sensitive-information",
    title: "Sensitive Information",
    blocks: [
      {
        type: "p",
        text: "The term “sensitive information” refers to information related to your racial or ethnic origin, political opinions, religious or philosophical beliefs, trade union membership, health, sex life, or sexual orientation, genetic information, criminal background, and any biometric data used for the purpose of unique identification. In some jurisdictions, mobile phone numbers, location data, and information contained on identity documents also are considered sensitive information.",
      },
      {
        type: "p",
        text: "We do not generally collect sensitive information unless it is volunteered by you or unless we are required to do so pursuant to applicable laws or regulations. We may use health data provided by you to serve you better and meet your particular needs (for example, the provision of disability access).",
      },
    ],
  },
  {
    id: "personal-information-from-children",
    title: "Personal Information from Children",
    blocks: [
      {
        type: "p",
        text: "We do not knowingly collect personal information from individuals under 18 years of age. As a parent or legal guardian, please do not allow your children to submit personal information without your permission.",
      },
    ],
  },
  {
    id: "links-to-third-party-websites",
    title: "Links to Third-Party Websites and Services",
    blocks: [
      {
        type: "p",
        text: "Our site and our mobile applications may contain links to third-party websites. Please note that we are not responsible for the collection, use, maintenance, sharing, or disclosure of data and information by such third parties. If you provide information on and use third-party sites, the privacy policy and terms of service on those sites are applicable. We encourage you to read the privacy policies of websites that you visit before submitting personal information.",
      },
      {
        type: "p",
        text: "HolidaysCenter may also partner with a limited number of Internet providers to offer Internet access to our guests. Your use of on-property Internet service is subject to the third-party Internet provider’s terms of use and privacy policy. You can access those terms and policies using the links on the service sign-in page, or by visiting the Internet provider’s website.",
      },
    ],
  },
  {
    id: "protecting-personal-information",
    title: "Protecting Personal Information",
    blocks: [
      {
        type: "p",
        text: "HolidaysCenter will take reasonable measures to: (i) protect personal information from unauthorized access, disclosure, alteration, or destruction, and (ii) keep personal information accurate and up-to-date as appropriate. HolidaysCenter employs a robust internal team of dedicated information security professionals who are responsible for creating, updating, and managing HolidaysCenter's security program. HolidaysCenter’s Global Information Security team is responsible for, among many other things, monitoring our systems for potential intrusions, responding to potential incidents, supporting property-level information security, regularly reviewing and updating the security controls HolidaysCenter uses to protect data, and providing training on HolidaysCenter information security program. HolidaysCenter maintains a PCI compliance program and an IT compliance program. This compliance program generates audit reports concerning the adequacy and effectiveness of HolidaysCenter IT internal controls, including a PCI Attestation of Compliance signed by an external PCI Qualified Security Assessor and a SSAE16/SOC1 report addressing the IT general controls over systems that support certain accounting and financial reporting. In the event of a security incident, HolidaysCenter will notify regulators and/or consumers as required by applicable laws or regulations.",
      },
      {
        type: "p",
        text: "We also seek to require our affiliates and service providers with whom we share personal information to exercise reasonable efforts to maintain the confidentiality of personal information about you. For online transactions, we use reasonable technological measures to protect the personal information that you transmit to us via our site. Unfortunately, however, no security system or system for transmitting data over the Internet can be guaranteed to be entirely secure.",
      },
      { type: "p", text: "For your own privacy protection, please do not send payment card numbers or any other confidential personal information to us via email." },
      {
        type: "p",
        text: "We will not contact you by mobile/text messaging or email to ask for your confidential personal information or payment card details. We will only ask for payment card details by telephone when you are booking a reservation or promotional package. We will not contact you to ask for your HolidaysCenter account login information. If you receive this type of request, you should not respond to it. We also ask that you please notify us at info@holidayscenter.com.",
      },
    ],
  },
  {
    id: "international-transfers",
    title: "International Transfers of Personal Information",
    blocks: [
      {
        type: "p",
        text: "As a global company, we endeavor to provide you with the same level of service that you have come to expect at HolidaysCenter whether you are in Delhi, San Francisco, London, or Tokyo. To provide this service, you acknowledge that we may share your personal information among members of the HolidaysCenter club, our service providers, and other third parties, which may be located in countries outside of your own. When you stay at a HolidaysCenter property outside Australia, the data controller for that property transfers the personal information relating to your reservation to HolidaysCenter in Australia pursuant to data transfer agreements when required by applicable laws or regulations. The data controller may also maintain a local copy of your personal information when required by applicable laws or regulations. Although the data protection laws of various countries may differ from those in your own country, we will take appropriate steps to ensure that your personal information is handled as described in this Statement and in accordance with the law.",
      },
    ],
  },
  {
    id: "changing-and-accessing",
    title: "Changing and Accessing Your Personal Information",
    blocks: [
      {
        type: "p",
        text: "If you are a HolidaysCenter member, the information you provided to us at the time of registration may be accessed, reviewed, and updated at any time by signing in to your HolidaysCenter profile.",
      },
      {
        type: "p",
        text: "To the extent required by applicable law, you may be able to request that we inform you about the personal information we maintain about you and, where appropriate, withdraw your consent for certain data processing activity and/or request that we update, correct, delete, and/or stop processing your personal information. We will make all required updates and changes within the time specified by applicable law and as required by law. When permitted by law, we may charge an appropriate fee to cover the costs of responding to the request. Such requests may be submitted by contacting us using the details in the Contact Us section below. To protect your confidentiality, we can only respond to such requests to the email address that you have registered or otherwise provided to us. Please remember that if you make such a request, we may not be able to provide you with the same quality and variety of services to which you are accustomed.",
      },
      {
        type: "p",
        text: "In addition, in some circumstances based on applicable law, you may request that we cease sharing personal information about you with our business partners or that HolidaysCenter cease using personal information about you by contacting us using the email or mailing address above. We will seek to honor those requests consistently with applicable law.",
      },
    ],
  },
  {
    id: "retaining-personal-information",
    title: "Retaining Personal Information",
    blocks: [
      {
        type: "p",
        text: "We retain personal information about you for the period necessary to fulfill the purposes outlined in this Statement unless a longer retention period is required or permitted by applicable law. We retain personal information collected in order to fulfill guest reservations for seven years after the stay is completed. We retain other personal information for shorter periods of time if possible and if permitted by law.",
      },
      { type: "p", text: "We will destroy your personal information as early as practicable and in a way that the information may not be restored or reconstructed." },
      {
        type: "p",
        text: "If printed on paper, the personal information will be destroyed in a secure manner, such as by cross-shredding or incinerating the paper documents or otherwise and, if saved in electronic form, the personal information will be destroyed by technical means to ensure the information may not be restored or reconstructed at a later time.",
      },
    ],
  },
  {
    id: "choices-marketing-communications",
    title: "Choices – Marketing Communications",
    blocks: [
      {
        type: "p",
        text: "If you have given us your contact information (mail address, fax number, email address or phone number), we may want to inform you in accordance with any preferences you have expressed, and with your consent where required, about our products and services or invite you to events via email, online advertising, social media, WeChat, WhatsApp, telephone, text message (including SMS and MMS), push notifications, in-app alerts, postal mail, our customer service call center, and other means (including on-property messaging, such as your in-room television).",
      },
      {
        type: "p",
        text: "If you are a HolidaysCenter member, you may change the communications you receive from us by logging on to your online account and managing your subscriptions, or by writing to us (and including your email address) at info@holidayscenter.com.",
      },
      {
        type: "p",
        text: "If you prefer not to receive email marketing materials from us, you may opt-out at any time by using the unsubscribe function in the email you receive from us.",
      },
      { type: "p", text: 'To opt out of text messages, tell HolidaysCenter that you do not want to receive text messages from the hotel or reply "STOP" to the message you received.' },
      { type: "p", text: "To be added to HolidaysCenter's internal do not call list, send a message to info@holidayscenter.com." },
      {
        type: "p",
        text: "You may control whether our mobile apps send you push notifications by changing your notification settings on your mobile device. If we engage in sending you in-app messages, we will allow control for those in our apps’ settings. For more information about cookies and interest-based advertising and to learn about how to manage these technologies, please see our Cookies Statement.",
      },
    ],
  },
  {
    id: "statement-modifications",
    title: "Statement Modifications",
    blocks: [
      {
        type: "p",
        text: "We may modify this Statement from time to time. When we make material changes to this Statement we will post a link to the revised Statement on the homepage of our site, and if you have registered for any of your products or services, will also inform you through a communications channel that you have provided. You can tell when this Statement was last updated by looking at the link and at the date at the top of the Statement. Any changes to our Statement will become effective upon posting the revised Statement on the site. Use of the site, any of our products and services, and/or providing consent to the updated Statement following such changes constitutes your acceptance of the revised Statement then in effect.",
      },
    ],
  },
  {
    id: "contact-us",
    title: "Contact Us",
    blocks: [
      {
        type: "p",
        text: "If you have any questions about this Statement or how HolidaysCenter processes your personal information, or if you wish to either provide a compliment or a complaint, please contact us by email at info@holidayscenter.com. We will respond within 30 days or sooner if practicable.",
      },
    ],
  },
  {
    id: "revisions",
    title: "HolidaysCenter Worldwide Privacy Statement Revisions",
    blocks: [
      {
        type: "list",
        items: [
          { text: "Updated to provide more detailed information about how we collect, use, share, and protect the personal information of our guests." },
          { text: "Added hyperlinks to HolidaysCenter’s Data Subject Rights Request Portal for guests to make individual rights requests pursuant to laws in some jurisdictions." },
          {
            text: 'Added Appendix A: "Additional Provisions Applicable to Processing of Personal Information of EEA Residents." Appendix A includes detailed information provided pursuant to Regulation (EU) 2016/679 of the European Parliament and of the Council of April 27, 2016, on the protection of natural persons with regard to the processing of Personal Information and on the free movement of such data, commonly referred to as the "General Data Protection Regulation" (GDPR).',
          },
        ],
      },
    ],
  },
  {
    id: "appendix-a",
    title: "Appendix A – Additional Provisions Applicable to Processing of Personal Information of EEA Residents",
    blocks: [
      {
        type: "p",
        text: "For individuals residing in the EEA, this Appendix outlines certain additional information that HolidaysCenter is obligated to provide to you, as well as certain rights you have with respect to the processing of your personal information, pursuant to applicable local laws. This Appendix will control to the extent it conflicts with any provision in the main body of this Statement.",
      },
      { type: "h3", text: "Purposes and Legal Basis for Processing" },
      {
        type: "p",
        text: "HolidaysCenter processes your personal information for the purposes set forth in the “Use of Personal Information Collected About You” and “Personal Information We Share” sections of the main body of this Statement.",
      },
      {
        type: "p",
        text: "The legal bases for HolidaysCenter’s processing activities include processing such information as necessary to comply with our contractual obligations, compliance with our legal obligations, protecting the safety of our employees, guests, and others, for our legitimate business interests, and pursuant to your consent.",
      },
      { type: "p", text: "The particular legal basis for the processing of your personal information is based on the purpose for which such information was provided or collected:" },
      {
        type: "list",
        items: [
          {
            label: "HolidaysCenter Participation",
            text: "We process the personal information obtained in connection with your participation in the HolidaysCenter program on the basis of our contractual relationship with you and in furtherance of our business interests, including to personalize your use of our services and applications, to communicate news and promotional items, and to deliver personalized advertising and content.",
          },
          {
            label: "Surveys",
            text: "Completion of surveys is voluntary – we process the information obtained from surveys on the basis of your consent and in furtherance of our business interests, including marketing, service improvements, and analytics.",
          },
          {
            label: "Event Profiles",
            text: "We process the personal information obtained in connection with your event on the basis of our contractual relationship with you and for our business interests, including for marketing, service improvements, and analytics and service personalization.",
          },
          {
            label: "Social Media",
            text: "Participation in HolidaysCenter-sponsored social media activities and offerings is voluntary – we process information obtained from social media participation on the basis of your consent and in furtherance of our related business interests, including for marketing, service improvements, and analytics and service personalization.",
          },
          {
            label: "Promotions and Sweepstakes",
            text: "Participation in sweepstakes, contests, and other promotional offerings is voluntary – we process the information obtained from such participation based on your consent and as necessary to administer the offering. We also use certain data for our business purposes, including for marketing, service improvements, administration of our eFolio program, and analytics and service personalization.",
          },
          {
            label: "Direct Marketing",
            text: "We use your personal information to send you marketing messages on the basis of your consent. You may withdraw your consent for direct marketing communications at any time by contacting us at info@holidayscenter.com, by following the unsubscribe instructions in the marketing message, or by logging in to your HolidaysCenter account and updating your communication preferences.",
          },
          { label: "Franchise and Ownership Opportunities", text: "" },
          {
            label: "Retention",
            text: "We retain personal information about you for the time necessary to accomplish the purpose for which such information was collected, usually for the duration of any contractual relationship and for any period thereafter as legally required or permitted by applicable law. Our retention policies reflect the applicable statute of limitation periods and legal requirements.",
          },
        ],
      },
      { type: "h3", text: "Data Subject Rights" },
      { type: "p", text: "Residents of the EEA have the following rights:" },
      {
        type: "list",
        items: [
          {
            label: "Access, Correction, and Erasure Requests",
            text: "You have the right to: ask us to confirm whether we are processing your personal information; receive information on how your data is processed; obtain a copy of your personal information; request that we update or correct your personal information; and request that we delete personal information in certain circumstances.",
          },
          {
            label: "Right to Object to Processing",
            text: "You have the right to request that HolidaysCenter cease processing of your personal information for marketing activities, including profiling; for statistical purposes; or where such processing is based on our legitimate business interests, unless we are able to demonstrate a compelling legitimate basis for such processing or we need to process your personal information for the establishment, exercise or defense of a legal claim.",
          },
          {
            label: "Right to Restrict Processing",
            text: "You have the right to request that HolidaysCenter limit the processing of your personal information while HolidaysCenter is evaluating or in the process of responding to a request by you to update or correct your personal information; where such processing is unlawful and you do not want HolidaysCenter to delete your data; where HolidaysCenter no longer requires such data, but you want us to retain the data for the establishment, exercise, or defense of a legal claim; or where you have submitted an objection to processing based on our legitimate business interests, pending our response to such a request. Where we limit the processing of your personal information pursuant to your request, we will inform you prior to re-engaging in such processing.",
          },
          {
            label: "Data Portability Requests",
            text: "You have the right to request that we provide you or a third party that you designate with certain of your personal information in a commonly used, machine-readable format. Please note, however, that data portability rights apply only to personal information that we have obtained directly from you and only where our processing is based on consent or the performance of a contract.",
          },
          {
            label: "Submitting Requests",
            text: "Your requests may be submitted by writing to us using the details in the Changing and Accessing Your Personal Information section of the main body of this Global Privacy Statement.",
          },
        ],
      },
      {
        type: "p",
        text: "We will respond to all such requests within 30 days of our receipt of the request unless there are extenuating circumstances, in which event we may take up to 60 days to respond. We will inform you if we expect our response to take longer than 30 days. Please note, however, that certain personal information may be exempt from such rights pursuant to applicable data protection laws. In addition, we will not respond to any request unless we are able to appropriately verify the requester’s identity. We may charge you a reasonable fee for subsequent copies of the data that you request.",
      },
      { type: "p", text: "If you have concerns about our data practices or the exercise of your rights, you may contact HolidaysCenter at info@holidayscenter.com." },
      {
        type: "h3",
        text: "Right to Withdraw Consent",
      },
      {
        type: "p",
        text: "You have the right to withdraw your consent to any processing that we conduct solely based on your consent (such as sending direct marketing materials to your personal email account). You may withdraw your consent to marketing activities by following the instructions on any marketing emails or contacting info@holidayscenter.com.",
      },
      { type: "h3", text: "Segmentation (also referred to as profiling) and Automated Decision Making" },
      {
        type: "p",
        text: "We use personal information to divide large groups of consumers into sub-groups of consumers (known as segments) based on some type of shared characteristics such as geography, behavior, or demographics.",
      },
      {
        type: "p",
        text: "With your consent, we make automated decisions, meaning without human interference, using segmentation and/or your specific personal information to offer you certain benefits based on your characteristics (such as discounted room rates or other special offers based on your geography, behavior, or demographics). For example, if you travel frequently during the week to hotels in France, we may send you special offers for HolidaysCenter hotels in France.",
      },
      { type: "h3", text: "International Data Transfers" },
      {
        type: "p",
        text: "We may transfer the personal information we collect about you pursuant to the purposes described in this Statement to countries that have not been found by the European Commission to provide adequate protection. In particular, we transfer your personal information to Australia.",
      },
      {
        type: "p",
        text: "We use appropriate safeguards for the transfer of personal information among our affiliates in various jurisdictions, and where required, we have implemented European Union controller-to-controller standard contractual clauses or other such safeguards for such purposes. To obtain a copy of these clauses or additional information on transfers, you may send your request to info@holidayscenter.com.",
      },
    ],
  },
];
