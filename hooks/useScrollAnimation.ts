"use client";

import { useEffect, useRef } from "react";

export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add visible class to the root element
            entry.target.classList.add("visible");

            // Also add visible to all animated children
            const children = entry.target.querySelectorAll(
              ".animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right"
            );
            children.forEach((child) => {
              child.classList.add("visible");
            });
          }
        });
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    // Observe the root element
    observer.observe(element);

    // Also observe individual animated children for independent triggering
    const animatedChildren = element.querySelectorAll(
      ".animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right"
    );
    animatedChildren.forEach((child) => {
      observer.observe(child);
    });

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
