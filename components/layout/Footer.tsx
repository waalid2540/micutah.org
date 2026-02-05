import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from "lucide-react";

const quickLinks = [
  { name: "Prayer Times", href: "/prayer-times" },
  { name: "Ramadan", href: "/ramadan" },
  { name: "Events", href: "/events" },
  { name: "Directory", href: "/directory" },
  { name: "Donate", href: "/donate" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Contact", href: "/contact" },
];

const resourceLinks = [
  { name: "Islamic Quizzes", href: "/quizzes" },
  { name: "Blog", href: "/blog" },
  { name: "About Us", href: "/about" },
  { name: "Volunteer", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="Madina Islamic Center"
                width={50}
                height={50}
                className="rounded-lg bg-white p-1"
              />
              <div>
                <h3 className="font-heading text-lg font-bold">Madina Islamic Center</h3>
                <p className="text-xs text-primary-foreground/70">MICUTAH</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 mb-4">
              A welcoming place for worship, community, and spiritual growth.
              Open 24/7 to serve travelers and our local community.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-primary-foreground/80">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span>
                  1773 West North Temple<br />
                  Salt Lake City, UT 84116
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Phone className="h-5 w-5 shrink-0" />
                <a href="tel:+18015551234" className="hover:text-accent transition-colors">
                  (801) 555-1234
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Mail className="h-5 w-5 shrink-0" />
                <a href="mailto:info@micutah.org" className="hover:text-accent transition-colors">
                  info@micutah.org
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Clock className="h-5 w-5 shrink-0" />
                <span>Open 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-light mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            &copy; {new Date().getFullYear()} Madina Islamic Center. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-primary-foreground/60">
            <Link href="/privacy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
