import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/company-logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#" },
    { name: "Packages", href: "#packages" },
    { name: "States", href: "#states" },
    { name: "Memories", href: "#memories" },
    { name: "Reviews", href: "#reviews" },
    { name: "About us", href: "#about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo + Title */}
          <div className="flex items-center gap-8 animate-slide-in">
            <img src={logo} alt="Dhana Tour Consultors Logo" className="h-20 w-30" />

            <div className="flex flex-col">
              <h1
                className="text-1xl md:text-5xl font-bold italic"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  color: "#FF0000",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                Dhana Tours and Consultors
              </h1>

              <p
                className="text-sm md:text-1xl"
                style={{
                  fontFamily: "'UnifrakturCook', cursive",
                  fontSize: "30px",
                  color: "hsla(283, 94%, 40%, 1)",
                }}
              >
                Since 2020
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10 ml-auto">
            {navItems.map((item, index) => {
              if (item.name === "States") {
                return (
                  <Link
                    key={item.name}
                    to="/states"
                    className="text-primary-foreground hover:text-accent transition-colors font-bold text-lg animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item.name}
                  </Link>
                );
              } else if (item.name === "Memories") {
                return (
                  <Link
                    key={item.name}
                    to="/memories"
                    className="text-primary-foreground hover:text-accent transition-colors font-bold text-lg animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item.name}
                  </Link>
                );
              } else {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-primary-foreground hover:text-accent transition-colors font-bold text-lg animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item.name}
                  </a>
                );
              }
            })}

            {/* Book Button (Desktop) → text changed to black */}
            <Button
              variant="hero"
              size="lg"
              className="animate-fade-in text-black font-bold"
              onClick={() => navigate("/booking")}
            >
              Book
            </Button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-primary-foreground"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            {navItems.map((item) => {
              if (item.name === "States") {
                return (
                  <Link
                    key={item.name}
                    to="/states"
                    className="block py-3 text-primary-foreground hover:text-accent transition-colors font-bold text-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              } else if (item.name === "Memories") {
                return (
                  <Link
                    key={item.name}
                    to="/memories"
                    className="block py-3 text-primary-foreground hover:text-accent transition-colors font-bold text-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              } else {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block py-3 text-primary-foreground hover:text-accent transition-colors font-bold text-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                );
              }
            })}

            {/* Book Button (Mobile) already black */}
            <Button variant="hero" size="lg" className="w-full mt-4 font-bold text-black">
              Book
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
