import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/company-logo.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", href: "#" },
    { name: "Packages", href: "#packages" },
    { name: "States", href: "#states" },
    { name: "Memories", href: "/memories", isRoute: true },
    { name: "Reviews", href: "#reviews" },
    { name: "About us", href: "#about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 animate-slide-in">
            <img src={logo} alt="Dhana Tour Consultors Logo" className="h-16 w-auto" />
            <div className="flex flex-col">
              <h1 className="font-allerta text-lg md:text-xl font-bold leading-tight" style={{ color: 'hsl(0 100% 50%)' }}>
                Dhana Tours and Consultors
              </h1>
              <p className="font-allerta text-sm md:text-base" style={{ color: 'hsl(270 100% 50%)' }}>
                Since 2020
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              item.isRoute ? (
                <button
                  key={item.name}
                  onClick={() => navigate(item.href)}
                  className="text-primary-foreground hover:text-accent transition-colors font-medium animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.name}
                </button>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-primary-foreground hover:text-accent transition-colors font-medium animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.name}
                </a>
              )
            ))}
            <Button variant="hero" size="lg" className="animate-fade-in" onClick={() => navigate("/booking")}>
              Book
            </Button>
          </div>

          {/* Mobile menu button */}
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

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            {navItems.map((item) => (
              item.isRoute ? (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.href);
                    setMobileMenuOpen(false);
                  }}
                  className="block py-3 text-primary-foreground hover:text-accent transition-colors font-medium w-full text-left"
                >
                  {item.name}
                </button>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-3 text-primary-foreground hover:text-accent transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              )
            ))}
            <Button variant="hero" size="lg" className="w-full mt-4" onClick={() => navigate("/booking")}>
              Book
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
