import { Button } from "@/components/ui/button";
import { Menu, LogIn, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { manualSupabaseClient as supabase } from "@/integrations/supabase/manualClient";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";
import logo from "@/assets/company-logo.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    }
  };

  const navItems = [
    { name: "Home", href: "#" },
    { name: "Packages", href: "#packages" },
    { name: "States", href: "/states", isRoute: true },
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
              <h1 className="font-allerta text-lg md:text-xl font-bold leading-tight logo-company">
                Dhana Tours and Consultors
              </h1>
              <p className="font-allerta text-sm md:text-base logo-tagline">
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
            {user ? (
              <Button
                variant="outline"
                size="lg"
                className="animate-fade-in"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Button
                variant="outline"
                size="lg"
                className="animate-fade-in"
                onClick={() => navigate("/auth")}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            )}
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
            {user ? (
              <Button
                variant="outline"
                size="lg"
                className="w-full mt-2"
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Button
                variant="outline"
                size="lg"
                className="w-full mt-2"
                onClick={() => {
                  navigate("/auth");
                  setMobileMenuOpen(false);
                }}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
