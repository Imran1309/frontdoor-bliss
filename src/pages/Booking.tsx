import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ArrowLeft, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bookingSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(15),
  destination: z.string().min(1, "Travel destination is required"),
  date: z.date({ required_error: "Date of travel is required" }),
  people: z.string().min(1, "Number of people is required"),
  vacationType: z.string().min(1, "Vacation type is required"),
});

const Booking = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const packageType = searchParams.get("package");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    date: undefined as Date | undefined,
    people: "",
    vacationType: packageType || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      bookingSchema.parse(formData);
      
      toast({
        title: "Booking Submitted!",
        description: "We'll contact you shortly to confirm your booking.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        destination: "",
        date: undefined,
        people: "",
        vacationType: "",
      });
      setErrors({});
      
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            className="mb-8"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <div className={cn(
              "flex items-center justify-center gap-2 mb-6 p-4 rounded-lg transition-colors",
              timeRemaining <= 30 ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
            )}>
              <Clock className="h-5 w-5" />
              <span className="text-lg font-semibold">
                Time remaining: {formatTime(timeRemaining)}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold text-center mb-2">Book Your Trip</h1>
            <p className="text-center text-muted-foreground mb-8">
              Fill in the details below and we'll get back to you shortly
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-lg">Name:</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12 bg-[#7d1f5e] text-white placeholder:text-white/70 border-none focus-visible:ring-white"
                  placeholder="Enter your name"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-lg">Email:</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 bg-[#7d1f5e] text-white placeholder:text-white/70 border-none focus-visible:ring-white"
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-lg">Phone Number:</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-12 bg-[#7d1f5e] text-white placeholder:text-white/70 border-none focus-visible:ring-white"
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination" className="text-lg">Travel Destination:</Label>
                <Input
                  id="destination"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="h-12 bg-[#7d1f5e] text-white placeholder:text-white/70 border-none focus-visible:ring-white"
                  placeholder="Enter travel destination"
                />
                {errors.destination && <p className="text-sm text-red-500">{errors.destination}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-lg">Date of Travel:</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-12 justify-start text-left font-normal bg-[#7d1f5e] text-white border-none hover:bg-[#6a1a4f] hover:text-white",
                        !formData.date && "text-white/70"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => setFormData({ ...formData, date })}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="people" className="text-lg">No. of People:</Label>
                <Input
                  id="people"
                  type="number"
                  min="1"
                  value={formData.people}
                  onChange={(e) => setFormData({ ...formData, people: e.target.value })}
                  className="h-12 bg-[#7d1f5e] text-white placeholder:text-white/70 border-none focus-visible:ring-white"
                  placeholder="Number of people"
                />
                {errors.people && <p className="text-sm text-red-500">{errors.people}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-lg">Vacation Type:</Label>
                <Select
                  value={formData.vacationType}
                  onValueChange={(value) => setFormData({ ...formData, vacationType: value })}
                >
                  <SelectTrigger className="h-12 bg-[#7d1f5e] text-white border-none focus:ring-white">
                    <SelectValue placeholder="Select vacation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Honey Moon">Honey Moon</SelectItem>
                    <SelectItem value="Educational Trip">Educational Trip</SelectItem>
                    <SelectItem value="Devotional Trip">Devotional Trip</SelectItem>
                    <SelectItem value="Wedding Trip">Wedding Trip</SelectItem>
                    <SelectItem value="College IV">College IV</SelectItem>
                    <SelectItem value="All India trip">All India trip</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.vacationType && <p className="text-sm text-red-500">{errors.vacationType}</p>}
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gray-800 hover:bg-gray-700 text-white px-12 py-6 text-lg"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Booking;
