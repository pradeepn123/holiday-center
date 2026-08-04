"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { CalendarCheck, Eye, EyeOff, Gift, ShieldCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type AuthTab = "signin" | "signup";

const FEATURES = [
  {
    icon: Gift,
    before: "Unlock ",
    bold: "Exclusive Deals",
    after: " on every booking",
  },
  {
    icon: ShieldCheck,
    before: "24/7 customer support ",
    bold: "Holidayscenter",
    after: "",
  },
  {
    icon: CalendarCheck,
    before: "Easily ",
    bold: "View, Modify, or Cancel Bookings",
    after: "",
  },
];

const inputClass =
  "h-12 rounded-xl border border-neutral-200 px-4 text-[15px] outline-none focus:border-brand-blue";
const labelClass = "text-[14px] font-semibold text-neutral-800";

export function AuthModal({
  tab,
  onTabChange,
  onClose,
  onSignIn,
  onSignUp,
  signupError,
}: {
  tab: AuthTab;
  onTabChange: (tab: AuthTab) => void;
  onClose: () => void;
  onSignIn: (event: React.FormEvent<HTMLFormElement>) => void;
  onSignUp: (event: React.FormEvent<HTMLFormElement>) => void;
  signupError: string | null;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative flex w-full max-w-[900px] overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 shadow-sm hover:bg-neutral-50"
        >
          <X className="size-4" />
        </button>

        <div className="hidden w-1/2 shrink-0 flex-col bg-brand-blue p-8 sm:flex">
          <Image
            src="/assets/images/login_travel_img.png"
            alt="Traveller walking with a suitcase"
            width={216}
            height={216}
            className="mx-auto size-[220px]"
          />

          <div className="mt-auto flex flex-col gap-3 pt-8">
            {FEATURES.map(({ icon: Icon, before, bold, after }) => (
              <div key={bold} className="flex items-center gap-3 rounded-full bg-[#FBF7EF] px-4 py-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                  <Icon className="size-4" />
                </span>
                <p className="text-[13px] leading-snug text-neutral-700">
                  {before}
                  <span className="font-bold text-neutral-900">{bold}</span>
                  {after}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full p-8 sm:w-1/2 sm:p-10">
          <div className="flex w-full max-w-[320px] items-center rounded-full border border-neutral-200 p-1">
            <button
              type="button"
              onClick={() => onTabChange("signin")}
              className={cn(
                "flex-1 rounded-full py-2 text-[14px] font-semibold transition-colors",
                tab === "signin" ? "bg-brand-lime text-brand-dark" : "text-neutral-500 hover:text-neutral-700"
              )}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => onTabChange("signup")}
              className={cn(
                "flex-1 rounded-full py-2 text-[14px] font-semibold transition-colors",
                tab === "signup" ? "bg-brand-lime text-brand-dark" : "text-neutral-500 hover:text-neutral-700"
              )}
            >
              Sign Up
            </button>
          </div>

          {tab === "signin" ? (
            <>
              <p className="mt-6 font-serif text-3xl font-bold text-neutral-900">Welcome back</p>
              <p className="mt-1 text-[14px] text-neutral-500">
                Log in to unlock exclusive travel deals
              </p>

              <form onSubmit={onSignIn} className="mt-6 flex flex-col gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className={labelClass}>Email Address</span>
                  <input
                    type="email"
                    required
                    placeholder="e.g. traveling@holidays.com"
                    className={inputClass}
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className={labelClass}>Password</span>
                  <div className="flex h-12 items-center rounded-xl border border-neutral-200 px-4 focus-within:border-brand-blue">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Enter your password"
                      className="h-full w-full min-w-0 bg-transparent text-[15px] outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="flex shrink-0 items-center gap-1.5 text-[13px] font-medium text-neutral-500 hover:text-neutral-700"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </label>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-[14px] text-neutral-600">
                    <input
                      type="checkbox"
                      className="size-4 rounded border-neutral-300 text-brand-blue focus:ring-brand-blue"
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    className="text-[14px] font-semibold text-brand-blue hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="mt-2 flex h-12 items-center justify-center rounded-xl bg-brand-blue text-[15px] font-semibold text-white transition-colors hover:bg-brand-blue-dark"
                >
                  Sign In
                </button>
              </form>
            </>
          ) : (
            <>
              <p className="mt-6 font-serif text-3xl font-bold text-neutral-900">Welcome back</p>
              <p className="mt-1 text-[14px] text-neutral-500">
                Log in to unlock exclusive travel deals
              </p>

              <form onSubmit={onSignUp} className="mt-6 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1.5">
                    <span className={labelClass}>First name</span>
                    <input type="text" required placeholder="Enter name" className={inputClass} />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className={labelClass}>Last name</span>
                    <input
                      type="text"
                      required
                      placeholder="Enter last name"
                      className={inputClass}
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-1.5">
                  <span className={labelClass}>Email Address</span>
                  <input
                    type="email"
                    required
                    placeholder="e.g. traveling@holidays.com"
                    className={inputClass}
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className={labelClass}>Mobile number</span>
                  <input type="tel" required placeholder="+61" className={inputClass} />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className={labelClass}>Password</span>
                  <div className="flex h-12 items-center rounded-xl border border-neutral-200 px-4 focus-within:border-brand-blue">
                    <input
                      type={showSignupPassword ? "text" : "password"}
                      name="password"
                      required
                      placeholder="Enter your password"
                      className="h-full w-full min-w-0 bg-transparent text-[15px] outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword((value) => !value)}
                      className="flex shrink-0 items-center gap-1.5 text-[13px] font-medium text-neutral-500 hover:text-neutral-700"
                    >
                      {showSignupPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      {showSignupPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className={labelClass}>Re-Enter Password</span>
                  <div className="flex h-12 items-center rounded-xl border border-neutral-200 px-4 focus-within:border-brand-blue">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      required
                      placeholder="Enter your password"
                      className="h-full w-full min-w-0 bg-transparent text-[15px] outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((value) => !value)}
                      className="flex shrink-0 items-center gap-1.5 text-[13px] font-medium text-neutral-500 hover:text-neutral-700"
                    >
                      {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </label>

                {signupError && (
                  <p className="text-[13px] font-medium text-red-600">{signupError}</p>
                )}

                <button
                  type="submit"
                  className="mt-2 flex h-12 items-center justify-center rounded-xl bg-brand-blue text-[15px] font-semibold text-white transition-colors hover:bg-brand-blue-dark"
                >
                  Sign Up
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
