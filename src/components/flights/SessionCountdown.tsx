"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

const SESSION_SECONDS = 15 * 60;

export function SessionCountdown() {
  const [secondsLeft, setSecondsLeft] = useState(SESSION_SECONDS);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((value) => (value > 0 ? value - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-[13px] font-semibold text-red-600">
      <Clock className="size-4 shrink-0" />
      Your Session Expires In: {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </div>
  );
}
