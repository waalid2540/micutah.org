"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

// Generate unique IDs
function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Get or create visitor ID (persists across sessions)
function getVisitorId() {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("mic_visitor_id");
  if (!id) {
    id = generateId();
    localStorage.setItem("mic_visitor_id", id);
  }
  return id;
}

// Get or create session ID (expires after 30 min inactivity)
function getSessionId() {
  if (typeof window === "undefined") return "";
  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  const now = Date.now();
  
  let session = sessionStorage.getItem("mic_session");
  if (session) {
    const { id, lastActive } = JSON.parse(session);
    if (now - lastActive < SESSION_TIMEOUT) {
      sessionStorage.setItem("mic_session", JSON.stringify({ id, lastActive: now }));
      return id;
    }
  }
  
  const newId = generateId();
  sessionStorage.setItem("mic_session", JSON.stringify({ id: newId, lastActive: now }));
  return newId;
}

// Track function
async function track(type: string, data: Record<string, unknown> = {}) {
  try {
    await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        visitorId: getVisitorId(),
        sessionId: getSessionId(),
        referrer: document.referrer || null,
        ...data,
      }),
    });
  } catch (e) {
    // Silently fail - don't break the site for analytics
  }
}

// Export for manual event tracking
export function trackEvent(
  name: string, 
  category: string, 
  label?: string, 
  value?: number,
  metadata?: Record<string, unknown>
) {
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  track("event", {
    path,
    event: { name, category, label, value, metadata },
  });
}

// Pre-built event trackers for MIC
export const micAnalytics = {
  // Donations
  donationStarted: (type: string, amount?: number) => 
    trackEvent("started", "donations", type, amount),
  donationCompleted: (type: string, amount: number) => 
    trackEvent("completed", "donations", type, amount),
  
  // Downloads
  downloadCalendar: (format: string) => 
    trackEvent("download", "ramadan", `calendar_${format}`),
  downloadPlanner: () => 
    trackEvent("download", "ramadan", "planner"),
  downloadBook: (bookName: string) => 
    trackEvent("download", "books", bookName),
  
  // Forms
  contactSubmitted: () => 
    trackEvent("submit", "contact", "form"),
  directorySubmitted: () => 
    trackEvent("submit", "directory", "form"),
  
  // Clicks
  buttonClicked: (buttonName: string, page?: string) => 
    trackEvent("click", "button", buttonName, undefined, { page }),
  linkClicked: (linkName: string, url?: string) => 
    trackEvent("click", "link", linkName, undefined, { url }),
  
  // Ramadan
  iftarSponsorClicked: () => 
    trackEvent("click", "ramadan", "iftar_sponsor"),
  bookOpened: (bookName: string) => 
    trackEvent("open", "books", bookName),
  
  // Prayer times
  prayerTimesViewed: () => 
    trackEvent("view", "prayer_times"),
  
  // Chatbot
  chatbotOpened: () => 
    trackEvent("open", "chatbot"),
  chatbotMessage: () => 
    trackEvent("message", "chatbot"),
};

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const startTime = useRef<number>(Date.now());
  
  // Track page view on route change
  useEffect(() => {
    startTime.current = Date.now();
    track("pageview", { path: pathname });
    
    // Track duration when leaving page
    const handleBeforeUnload = () => {
      const duration = Math.round((Date.now() - startTime.current) / 1000);
      // Use sendBeacon for reliability on page unload
      navigator.sendBeacon?.(
        "/api/analytics/track",
        JSON.stringify({
          type: "duration",
          path: pathname,
          duration,
          sessionId: getSessionId(),
          visitorId: getVisitorId(),
        })
      );
    };
    
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [pathname]);
  
  return null;
}
