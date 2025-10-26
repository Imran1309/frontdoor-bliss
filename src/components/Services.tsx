import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass, Mountain, Plane, Camera, Hotel, Users } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Compass,
      title: "Guided Tours",
      description: "Expert local guides to show you the hidden gems and authentic experiences.",
    },
    {
      icon: Mountain,
      title: "Adventure Trips",
      description: "Thrilling adventures from trekking to water sports across stunning landscapes.",
    },
    {
      icon: Plane,
      title: "Custom Packages",
      description: "Tailored itineraries designed to match your preferences and budget.",
    },
    {
      icon: Camera,
      title: "Photo Tours",
      description: "Capture breathtaking moments with professional photography guidance.",
    },
    {
      icon: Hotel,
      title: "Accommodation",
      description: "Handpicked hotels and resorts offering comfort and great value.",
    },
    {
      icon: Users,
      title: "Group Travel",
      description: "Special packages for families, friends, and corporate team outings.",
    },
  ];

  return (
    <section id="packages" className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive travel solutions designed to make your journey unforgettable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              className="hover:shadow-lg transition-all hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-warm flex items-center justify-center mb-4">
                  <service.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
