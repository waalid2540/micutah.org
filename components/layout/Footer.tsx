import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from "lucide-react";

const quickLinks = [
  { name: "Prayer Times", href: "/prayer-times" },
  { name: "Ramadan", href: "/ramadan" },
  { name: "Events", href: "/events" },
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
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-primary font-arabic text-lg">م</span>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold">Masjid Madina</h3>
                <p className="text-xs text-primary-foreground/70">Salt Lake City, UT</p>
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
                <a href="mailto:info@masjidmadina.org" className="hover:text-accent transition-colors">
                  info@masjidmadina.org
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
            &copy; {new Date().getFullYear()} Masjid Madina. All rights reserved.
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
