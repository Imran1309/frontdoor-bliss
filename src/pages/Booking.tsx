import { useState, useEffect, FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bookingSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address"),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15),
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

  interface FormData {
    name: string;
    email: string;
    phone: string;
    destination: string;
    date?: Date | undefined;
    people: string;
    vacationType: string;
  }

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    destination: "",
    date: undefined,
    people: "",
    vacationType: packageType || "",
  });
 const [errors, setErrors] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(60); // 1 minute in seconds

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

 

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErr: Partial<Record<keyof FormData, string>> = {};
        err.errors.forEach((eItem) => {
          const key = eItem.path[0] as keyof FormData;
          newErr[key] = eItem.message;
        });
        setErrors(newErr);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-20 bg-gradient-to-b from-yellow-500 to-blue-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* BACK BUTTON FIXED */}
          <div className="flex items-center justify-start mb-10">
            <div
              className="bg-yellow-500 p-3 rounded-2xl shadow-lg cursor-pointer hover:bg-red-600 transition-all"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={60} className="text-red-900" />
            </div>
          </div>

          <div className="max-w-3xl mx-auto  rounded-lg shadow-xl p-8">
            <h1 className="text-4xl font-bold text-center mb-2">Book Your Trip</h1>
            <p className="text-center text-black mb-8">
              Fill in the details below and we'll get back to you shortly
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* NAME */}
              <div className="space-y-2">
                <Label className="text-lg">Name:</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="h-12 bg-yellow-500 text-black placeholder-black/70 border-none"
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* EMAIL */}
              <div className="space-y-2">
                <Label className="text-lg">Email:</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="h-12 bg-yellow-500 text-black placeholder-black/70 border-none"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* PHONE */}
              <div className="space-y-2">
                <Label className="text-lg">Phone Number:</Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="h-12 bg-yellow-500 text-black placeholder-black/70 border-none"
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* DESTINATION */}
              <div className="space-y-2">
                <Label className="text-lg">Travel Destination:</Label>
                <Input
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData({ ...formData, destination: e.target.value })
                  }
                  className="h-12 bg-yellow-500 text-black placeholder-black/70 border-none"
                  placeholder="Enter travel destination"
                />
                {errors.destination && (
                  <p className="text-sm text-red-500">{errors.destination}</p>
                )}
              </div>

              {/* DATE PICKER */}
              <div className="space-y-2">
                <Label className="text-lg">Date of Travel:</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-12 bg-yellow-500 justify-start text-black border-none",
                        !formData.date && "text-black/70"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date
                        ? format(formData.date, "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => setFormData({ ...formData, date })}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && (
                  <p className="text-sm text-red-500">{errors.date}</p>
                )}
              </div>

              {/* PEOPLE */}
              <div className="space-y-2">
                <Label className="text-lg">No. of People:</Label>
                <Input
                  type="number"
                  min="1"
                  value={formData.people}
                  onChange={(e) =>
                    setFormData({ ...formData, people: e.target.value })
                  }
                  className="h-12 bg-yellow-500 text-black placeholder-black/70 border-none"
                  placeholder="Number of people"
                />
                {errors.people && (
                  <p className="text-sm text-red-500">{errors.people}</p>
                )}
              </div>

              {/* VACATION TYPE */}
              <div className="space-y-2">
                <Label className="text-lg">Vacation Type:</Label>
                <Select
                  value={formData.vacationType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, vacationType: value })
                  }
                >
                  <SelectTrigger className="h-12 bg-yellow-500 text-black border-none">
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
                {errors.vacationType && (
                  <p className="text-sm text-red-500">{errors.vacationType}</p>
                )}
              </div>

              {/* SUBMIT */}
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-yellow-400 hover:bg-gray-700 text-black px-12 py-6 text-lg"
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
