import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AIChatbot from "@/components/chat/AIChatbot";

export const metadata: Metadata = {
  metadataBase: new URL("https://micutah.org"),
  title: {
    default: "Madina Islamic Center | Salt Lake City Mosque - Open 24/7 Near Love's Truck Stop",
    template: "%s | Madina Islamic Center - Salt Lake City",
  },
  description:
    "Madina Islamic Center is a 24/7 mosque in Salt Lake City, UT, right next to Love's Truck Stop & Flying J on I-80. Free truck parking, clean wudu facilities, daily prayers, Ramadan programs, and a welcoming community for travelers and locals. 1773 W North Temple, SLC.",
  keywords: [
    "masjid madina",
    "mosque salt lake city",
    "mosque near me",
    "islamic center utah",
    "prayer times salt lake city",
    "24/7 mosque",
    "mosque near truck stop",
    "mosque near Love's Truck Stop",
    "mosque near Flying J",
    "mosque near SLC airport",
    "ramadan salt lake city",
    "iftar salt lake city",
    "taraweeh salt lake city",
    "truck stop mosque",
    "muslim truckers",
    "halal salt lake city",
    "jummah salt lake city",
    "free truck parking mosque",
    "I-80 mosque",
    "north temple mosque",
    "wudu facilities",
    "zakat donation",
    "sadaqah",
  ],
  openGraph: {
    title: "Madina Islamic Center | Salt Lake City Mosque - Open 24/7",
    description:
      "A welcoming 24/7 mosque right next to Love's Truck Stop & Flying J in Salt Lake City. Free truck parking, wudu facilities, daily prayers, Ramadan programs, and community services. 5 min from SLC Airport.",
    type: "website",
    locale: "en_US",
    siteName: "Madina Islamic Center",
    images: [
      {
        url: "/images/masjid-1.jpg",
        width: 1200,
        height: 630,
        alt: "Madina Islamic Center prayer hall in Salt Lake City",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Madina Islamic Center | Salt Lake City Mosque - Open 24/7",
    description:
      "24/7 mosque next to Love's Truck Stop & Flying J. Free truck parking, daily prayers, Ramadan programs. 1773 W North Temple, SLC.",
    images: ["/images/masjid-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://micutah.org",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-[calc(2rem+64px)]">{children}</main>
        <Footer />
        <AIChatbot />
      </body>
    </html>
  );
}
