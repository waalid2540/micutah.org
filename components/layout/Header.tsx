"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Heart, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Prayer Times", href: "/prayer-times" },
  { name: "Ramadan", href: "/ramadan" },
  { name: "Events", href: "/events" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Blog", href: "/blog" },
  { name: "Quizzes", href: "/quizzes" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const tickerItems = [
  "OPEN 24/7",
  "Near Love's Truck Stop & Flying J",
  "Free Truck Parking",
  "Near SLC Airport",
  "1773 W North Temple, SLC",
  "(801) 555-1234",
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top bar ticker */}
      <div className="bg-primary-dark text-white py-1.5 overflow-hidden">
        <div className="marquee-track">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center text-xs font-medium tracking-wide whitespace-nowrap px-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent mr-3 flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Main navigation */}
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? "glass-white shadow-lg"
            : "bg-white/95"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/images/logo.png"
                alt="Madina Islamic Center"
                width={50}
                height={50}
                className="group-hover:scale-105 transition-transform"
              />
              <div className="hidden sm:block">
                <h1 className="font-heading text-lg font-bold text-primary leading-tight">
                  Madina Islamic Center
                </h1>
                <p className="text-[10px] text-gray-500 tracking-wide">
                  MICUTAH
                </p>
              </div>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-3 py-2 text-sm text-gray-700 hover:text-primary font-medium transition-colors group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent rounded-full transition-all duration-300 group-hover:w-3/4" />
                </Link>
              ))}
              <div className="flex items-center gap-2 ml-3 pl-3 border-l border-gray-200">
                <a
                  href="tel:+18015551234"
                  className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" />
                </a>
                <Link href="/donate">
                  <Button size="sm" className="gap-1.5 rounded-full">
                    <Heart className="h-3.5 w-3.5" />
                    Donate
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation with framer-motion */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden border-t border-gray-100"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col gap-1">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        className="block px-4 py-2.5 text-gray-700 hover:bg-cream hover:text-primary rounded-lg transition-colors font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: navigation.length * 0.05, duration: 0.3 }}
                    className="pt-2 mt-2 border-t border-gray-100 flex gap-2"
                  >
                    <a
                      href="tel:+18015551234"
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        size="lg"
                      >
                        <Phone className="h-4 w-4" />
                        Call Us
                      </Button>
                    </a>
                    <Link href="/donate" className="flex-1">
                      <Button className="w-full gap-2" size="lg">
                        <Heart className="h-4 w-4" />
                        Donate
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
