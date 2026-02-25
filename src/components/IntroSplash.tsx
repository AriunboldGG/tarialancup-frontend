"use client";

import { useEffect, useState } from "react";

const INTRO_KEY = "tc-intro-shown";
const INTRO_DURATION_MS = 2200;

export default function IntroSplash() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const hasShown = window.localStorage.getItem(INTRO_KEY) === "true";
      if (hasShown) return;
      window.localStorage.setItem(INTRO_KEY, "true");
      setIsVisible(true);
      const timeoutId = window.setTimeout(() => {
        setIsVisible(false);
      }, INTRO_DURATION_MS);
      return () => window.clearTimeout(timeoutId);
    } catch {
      setIsVisible(true);
      const timeoutId = window.setTimeout(() => {
        setIsVisible(false);
      }, INTRO_DURATION_MS);
      return () => window.clearTimeout(timeoutId);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="intro-splash" role="presentation">
      <div className="intro-splash__content">
        <div className="intro-splash__title">TARIALAN CUP - 2026</div>
        <div className="intro-splash__subtitle">WELCOME</div>
      </div>
    </div>
  );
}
