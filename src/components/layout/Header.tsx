"use client";

import { useState } from "react";
import {
  ChevronDown,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  UserCircle,
  X,
} from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { useClickOutside } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { AuthModal, type AuthTab } from "./AuthModal";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { label: "Manage Booking", href: "/manage-booking" },
  { label: "Contact us", href: "/contact" },
];

const ACCOUNT_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/manage-profile", icon: UserCircle },
  { label: "Manage Booking", href: "/manage-booking", icon: ClipboardList },
];

const CURRENCIES = [
  { code: "USD", label: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", label: "Euro", flag: "🇪🇺" },
  { code: "GBP", label: "British Pound", flag: "🇬🇧" },
  { code: "AUD", label: "Australian Dollar", flag: "🇦🇺" },
  { code: "AED", label: "UAE Dirham", flag: "🇦🇪" },
  { code: "INR", label: "Indian Rupee", flag: "🇮🇳" },
];

const LANGUAGES = ["English", "Arabic", "French", "Spanish", "German"];

function CurrencyFlag({ code, className }: { code: string; className?: string }) {
  if (code === "USD") {
    return (
      <Image
        src="/assets/icons/USD_icon.svg"
        alt=""
        width={20}
        height={20}
        className={cn("size-5 shrink-0 rounded-full", className)}
      />
    );
  }
  const flag = CURRENCIES.find((currency) => currency.code === code)?.flag;
  return (
    <span
      className={cn(
        "flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-100 text-[15px] leading-none",
        className
      )}
      aria-hidden="true"
    >
      {flag}
    </span>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<AuthTab | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("English");
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const accountRef = useClickOutside<HTMLDivElement>(() => setIsAccountOpen(false));
  const currencyRef = useClickOutside<HTMLDivElement>(() => setIsCurrencyOpen(false));
  const languageRef = useClickOutside<HTMLDivElement>(() => setIsLanguageOpen(false));

  function openAuthModal(tab: AuthTab) {
    setSignupError(null);
    setAuthModal(tab);
  }

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoggedIn(true);
    setAuthModal(null);
  }

  function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (formData.get("password") !== formData.get("confirmPassword")) {
      setSignupError("Passwords do not match.");
      return;
    }
    setSignupError(null);
    setIsLoggedIn(true);
    setAuthModal(null);
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setIsAccountOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0_0_4px_0_rgba(0,0,0,0.25)]">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Logo />

        <div className="flex items-center gap-5">
          <nav className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[15px] font-medium text-neutral-800 transition-colors hover:text-brand-blue"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div ref={currencyRef} className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setIsCurrencyOpen((open) => !open)}
              aria-expanded={isCurrencyOpen}
              className="flex items-center gap-1.5 text-[15px] font-medium text-neutral-800 hover:text-brand-blue"
            >
              <CurrencyFlag code={currency} />
              {currency}
              <ChevronDown
                className={cn("size-4 transition-transform", isCurrencyOpen && "rotate-180")}
              />
            </button>

            {isCurrencyOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] w-36 rounded-xl border border-neutral-100 bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
                {CURRENCIES.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      setCurrency(item.code);
                      setIsCurrencyOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[14px] font-medium transition-colors hover:bg-neutral-100",
                      currency === item.code ? "text-brand-blue" : "text-neutral-700"
                    )}
                  >
                    <CurrencyFlag code={item.code} />
                    {item.code}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div ref={languageRef} className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setIsLanguageOpen((open) => !open)}
              aria-expanded={isLanguageOpen}
              className="flex items-center gap-1 text-[15px] font-medium text-neutral-800 hover:text-brand-blue"
            >
              {language}
              <ChevronDown
                className={cn("size-4 transition-transform", isLanguageOpen && "rotate-180")}
              />
            </button>

            {isLanguageOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] w-34 rounded-xl border border-neutral-100 bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
                {LANGUAGES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setLanguage(item);
                      setIsLanguageOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center rounded-lg px-3 py-2.5 text-left text-[14px] font-medium transition-colors hover:bg-neutral-100",
                      language === item ? "text-brand-blue" : "text-neutral-700"
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div ref={accountRef} className="relative hidden sm:block">
            {isLoggedIn ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsAccountOpen((open) => !open)}
                  aria-expanded={isAccountOpen}
                  className="flex h-10 items-center gap-1 rounded-full bg-brand-blue px-4 text-white transition-colors hover:bg-brand-blue-dark"
                >
                  <User className="size-4" />
                  <ChevronDown
                    className={cn("size-4 transition-transform", isAccountOpen && "rotate-180")}
                  />
                </button>

                {isAccountOpen && (
                  <div className="absolute right-0 top-[calc(100%+10px)] w-56 rounded-xl border border-neutral-100 bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
                    {ACCOUNT_LINKS.map(({ label, href, icon: Icon }) => (
                      <a
                        key={label}
                        href={href}
                        onClick={() => setIsAccountOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[14px] font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
                      >
                        <Icon className="size-4 text-neutral-400" />
                        {label}
                      </a>
                    ))}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-[14px] font-medium text-red-600 transition-colors hover:bg-red-50"
                    >
                      <LogOut className="size-4" />
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal("signin")}
                aria-label="Account"
                className="flex h-10 items-center gap-1.5 rounded-full bg-brand-lime px-3 text-brand-dark transition-transform hover:scale-[1.03]"
              >
                <User className="size-4" />
                <ChevronDown className="size-4" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="flex size-10 items-center justify-center rounded-full text-neutral-800 hover:bg-neutral-100 lg:hidden"
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {isMenuOpen && (
        <div className="border-t border-neutral-100 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-neutral-800 hover:bg-neutral-100"
              >
                {link.label}
              </a>
            ))}

            {isLoggedIn && (
              <>
                <div className="mt-2 border-t border-neutral-100 pt-2" />
                {ACCOUNT_LINKS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[15px] font-medium text-neutral-800 hover:bg-neutral-100"
                  >
                    <Icon className="size-4 text-neutral-400" />
                    {label}
                  </a>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[15px] font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="size-4" />
                  Logout
                </button>
              </>
            )}

            <div className="mt-2 flex items-center justify-between gap-3 border-t border-neutral-100 px-3 pt-4">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-[15px] font-medium text-neutral-800"
                >
                  <CurrencyFlag code={currency} />
                  {currency}
                  <ChevronDown className="size-4" />
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 text-[15px] font-medium text-neutral-800"
                >
                  {language}
                  <ChevronDown className="size-4" />
                </button>
              </div>
              {!isLoggedIn && (
                <button
                  type="button"
                  onClick={() => {
                    openAuthModal("signin");
                    setIsMenuOpen(false);
                  }}
                  aria-label="Account"
                  className="flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-brand-lime px-3 text-brand-dark"
                >
                  <User className="size-4" />
                  <ChevronDown className="size-4" />
                </button>
              )}
            </div>
          </Container>
        </div>
      )}

      {authModal && (
        <AuthModal
          tab={authModal}
          onTabChange={openAuthModal}
          onClose={() => setAuthModal(null)}
          onSignIn={handleLogin}
          onSignUp={handleSignup}
          signupError={signupError}
        />
      )}
    </header>
  );
}
