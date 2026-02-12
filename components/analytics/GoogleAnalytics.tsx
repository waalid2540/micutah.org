"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Track page views
function GoogleAnalyticsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    
    // Send page view to GA4
    window.gtag?.("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }, [pathname, searchParams]);

  return null;
}

export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <GoogleAnalyticsInner />
      </Suspense>
    </>
  );
}

// Helper function to track custom events
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  
  window.gtag?.("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}

// Specific tracking functions for MIC
export const analytics = {
  // Donations
  donationStarted: (type: string, amount?: number) => {
    trackEvent("donation_started", "donations", type, amount);
  },
  donationCompleted: (type: string, amount: number) => {
    trackEvent("donation_completed", "donations", type, amount);
  },
  
  // Downloads
  downloadCalendar: (format: string) => {
    trackEvent("download", "ramadan", `calendar_${format}`);
  },
  downloadPlanner: () => {
    trackEvent("download", "ramadan", "planner");
  },
  downloadBook: (bookName: string) => {
    trackEvent("download", "books", bookName);
  },
  
  // Engagement
  prayerTimesViewed: () => {
    trackEvent("view", "prayer_times", "daily");
  },
  eventViewed: (eventName: string) => {
    trackEvent("view", "events", eventName);
  },
  contactFormSubmitted: () => {
    trackEvent("submit", "contact", "form");
  },
  
  // Ramadan specific
  iftarSponsorClicked: () => {
    trackEvent("click", "ramadan", "iftar_sponsor");
  },
  ramadanBookOpened: (bookName: string) => {
    trackEvent("open", "ramadan_books", bookName);
  },
};

// Type declaration for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
