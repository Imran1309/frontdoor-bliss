import { Check } from "lucide-react";

const WhyChooseUs = () => {
  const reasons = [
    "5+ years of trusted travel expertise",
    "Coverage across 32 Indian states",
    "Personalized itineraries for every budget",
    "24/7 customer support during your trip",
    "Best price guarantee",
    "Expert local guides",
    "Hassle-free booking process",
    "Eco-friendly travel options",
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose Us?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              We're not just a travel agency - we're your partners in creating extraordinary memories. 
              Since 2020, we've been helping travelers discover the incredible diversity of India.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {reasons.map((reason, index) => (
                <div 
                  key={reason} 
                  className="flex items-start gap-3 animate-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                      <Check className="h-4 w-4 text-accent-foreground" />
                    </div>
                  </div>
                  <span className="text-foreground">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-card rounded-lg p-6 shadow-lg border border-border animate-fade-in">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-muted-foreground">Happy Customers</div>
                </div>
                <div className="bg-card rounded-lg p-6 shadow-lg border border-border animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <div className="text-4xl font-bold text-secondary mb-2">32</div>
                  <div className="text-muted-foreground">States Covered</div>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-card rounded-lg p-6 shadow-lg border border-border animate-fade-in" style={{ animationDelay: "0.4s" }}>
                  <div className="text-4xl font-bold text-accent mb-2">100%</div>
                  <div className="text-muted-foreground">Satisfaction Rate</div>
                </div>
                <div className="bg-card rounded-lg p-6 shadow-lg border border-border animate-fade-in" style={{ animationDelay: "0.6s" }}>
                  <div className="text-4xl font-bold text-primary mb-2">5+</div>
                  <div className="text-muted-foreground">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
