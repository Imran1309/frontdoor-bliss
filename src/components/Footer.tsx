import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/company-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Dhana Tour Consultors Logo" className="h-50 w-30" />
            </div>
            <p className="text-primary-foreground/80 mb-4">
              Creating unforgettable travel experiences across India since 2020.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook" title="Facebook" className="text-primary-foreground hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" title="Instagram" className="text-primary-foreground hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" title="Twitter" className="text-primary-foreground hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Home
                </a>
              </li>
              <li>
               <a href="#packages" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Packages
                </a>
              </li>
              <li>
                <a href="#about" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#reviews" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Destinations</h3>
            <ul className="space-y-2">
              <li className="text-primary-foreground/80">Kashmir</li>
              <li className="text-primary-foreground/80">Rajasthan</li>
              <li className="text-primary-foreground/80">Kerala</li>
              <li className="text-primary-foreground/80">Himachal Pradesh</li>
              <li className="text-primary-foreground/80">Goa</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  123 Travel Street, Mumbai, Maharashtra 400001
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/80">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/80">info@dhanatour.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-primary-foreground/80 text-sm">
            © {currentYear} Dhana Tour Consultors. All rights reserved. Made with ❤️ for travelers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
