import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Star } from "lucide-react";
import { useState, useEffect } from "react";
import bgFalls from "@/assets/bg-falls.jpg";
import bgResort from "@/assets/bg-resort.jpg";
import bgCity from "@/assets/bg-city.jpg";
import falls2 from "@/assets/falls-2.jpg";
import go2 from "@/assets/go-2.jpg";
import promoB2 from "@/assets/promo_b-2.jpg";
import chakra from "@/assets/chakra.png";
import heroVideo from "@/assets/hero-video.mp4";

const Hero = () => {
  const backgrounds = [falls2, go2, promoB2, bgFalls];
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Images Slideshow */}
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          className="absolute inset-0 w-full h-full transition-opacity duration-1000"
          style={{
            opacity: currentBg === index ? 1 : 0,
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}
      
      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-6 animate-fade-in">
            <span className="text-secondary text-2xl md:text-3xl font-serif italic">
              Your Dream Begin
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Where every click brings a little wonder
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground mb-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Your dream came true with our team
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 text-primary-foreground animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <span className="text-3xl md:text-4xl font-bold text-secondary">32 States</span>
            <span className="text-2xl md:text-3xl flex items-center gap-1">
              unf
              <img src={chakra} alt="Chakra" className="inline-block h-8 w-8 md:h-10 md:w-10 animate-spin" style={{ animationDuration: '8s' }} />
              rgettable
            </span>
            <span className="text-3xl md:text-4xl font-bold text-accent">memories</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <Button variant="hero" size="xl">
              <Calendar className="mr-2 h-5 w-5" />
              Book Your Adventure
            </Button>
            <Button variant="outline" size="xl" className="bg-primary-foreground/10 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/20">
              <MapPin className="mr-2 h-5 w-5" />
              Explore Destinations
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "1s" }}>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">500+</div>
              <div className="text-primary-foreground text-sm">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">32</div>
              <div className="text-primary-foreground text-sm">States Covered</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-4xl font-bold text-accent mb-2">
                <Star className="h-8 w-8 fill-accent" />
                4.9
              </div>
              <div className="text-primary-foreground text-sm">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-primary-foreground rounded-full flex justify-center p-2">
          <div className="w-1.5 h-3 bg-accent rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
