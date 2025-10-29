import { Button } from "@/components/ui/button";

const Services = () => {
  const packages = [
    {
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=80",
      title: "Honey Moon",
    },
    {
      image: "https://images.unsplash.com/photo-1581091870623-4e1e3b9e7ab3?w=400&q=80",
      title: "Educational Trip",
    },
    {
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&q=80",
      title: "Devotional Trip",
    },
    {
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80",
      title: "Wedding Trip",
    },
    {
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80",
      title: "College IV",
    },
    {
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80",
      title: "All India trip",
    },
  ];

  return (
    <section id="packages" className="py-20 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-400 via-green-400 via-cyan-400 to-blue-400"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <div 
              key={pkg.title} 
              className="flex flex-col items-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Circular Image */}
              <div className="relative mb-6 group">
                <div className="w-64 h-64 rounded-full overflow-hidden border-8 border-white shadow-2xl transition-transform hover:scale-105">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Button */}
              <Button 
                size="lg"
                className="w-80 bg-[#7d1f5e] hover:bg-[#6a1a4f] text-white rounded-full shadow-lg text-xl py-6 font-serif italic"
              >
                {pkg.title}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
