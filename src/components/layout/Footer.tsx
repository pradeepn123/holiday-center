"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaSnapchat,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { ChevronDown, Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { contactEmail, contactPhones, footerLinkGroups } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 lg:pointer-events-none lg:cursor-default"
      >
        <p className="font-sans text-lg font-bold text-neutral-900">{title}</p>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-neutral-400 transition-transform lg:hidden",
            open && "rotate-180"
          )}
        />
      </button>
      <ul className={cn("mt-5 flex-col gap-2 lg:flex", open ? "flex" : "hidden lg:flex")}>
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-[15px] text-neutral-500 transition-colors hover:text-brand-blue"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const SOCIAL_LINKS = [
  { label: "Facebook", icon: FaFacebookF, href: "#" },
  { label: "Instagram", icon: FaInstagram, href: "#" },
  { label: "X", icon: FaXTwitter, href: "#" },
  { label: "YouTube", icon: FaYoutube, href: "#" },
  { label: "TikTok", icon: FaTiktok, href: "#" },
  { label: "LinkedIn", icon: FaLinkedinIn, href: "#" },
  { label: "Pinterest", icon: FaPinterestP, href: "#" },
  { label: "Snapchat", icon: FaSnapchat, href: "#" },
];

const ACCREDITATION_NUMBERS = ["02367514", "42227662"];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-white">
      <Image
        src="/assets/images/footer_background.png"
        alt=""
        width={1439}
        height={250}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full object-cover object-bottom"
      />

      <Container className="relative grid grid-cols-1 gap-x-8 gap-y-3 py-16 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-[300px_repeat(4,1fr)]">
        <div>
          <Logo />
          <p className="mt-5 text-[14px] leading-relaxed text-neutral-500">
            Managed By Alghandour PTY LTD.
            <br />
            ABN: <span className="text-neutral-700">96665302170</span>
          </p>

          <div className="mt-6 inline-flex w-fit flex-col gap-3 rounded-2xl bg-[#DDF0E3] px-4 py-3">
            <div className="flex items-center gap-4">
              <Image src="/assets/icons/IATA.svg" alt="IATA member" width={84} height={67} className="h-9 w-auto" />
              <Image src="/assets/icons/ATIA.svg" alt="ATIA accredited" width={111} height={62} className="h-9 w-auto" />
            </div>
            <p className="text-[13px] text-neutral-500">{ACCREDITATION_NUMBERS.join(",")}</p>
          </div>
        </div>

        {footerLinkGroups.map((group) => (
          <FooterLinkColumn key={group.title} title={group.title} links={group.links} />
        ))}

        <div>
          <p className="font-sans text-lg font-bold text-neutral-900">Contact Us</p>
          <div className="mt-5 flex flex-col gap-2">
            <a
              href={`mailto:${contactEmail}`}
              className="flex items-center gap-2.5 text-[14px] text-neutral-500 transition-colors hover:text-brand-blue"
            >
              <Mail className="size-4 shrink-0" />
              {contactEmail}
            </a>
            <div className="flex items-start gap-2.5 text-[14px] text-neutral-500">
              <Phone className="mt-0.5 size-4 shrink-0" />
              <div className="flex flex-col gap-1.5">
                {contactPhones.map((phone) => (
                  <span key={phone.label}>
                    {phone.label}: {phone.value}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3.5">
            {SOCIAL_LINKS.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-neutral-800 transition-colors hover:text-brand-blue"
              >
                <Icon className="size-[18px]" />
              </a>
            ))}
          </div>
        </div>
      </Container>

      <div className="relative bg-[#2C341D] py-5">
        <Container className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-center text-sm text-white/60 sm:text-left">
            (C) 2026 holidayscenter.com All rights reserved.
          </p>
          <p className="text-center text-sm text-white/60 sm:text-right">
            Website Powered by Valentis Technologies
          </p>
        </Container>
      </div>
    </footer>
  );
}
