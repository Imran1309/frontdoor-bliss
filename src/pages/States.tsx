import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const States = () => {
  const navigate = useNavigate();

  const states = [
    "Tamil Nadu", "Kerala", "Karnataka", "Goa",
    "Uttar Pradesh", "Delhi", "Andhra Pradesh", "Telangana",
    "Jammu & Kashmir", "Puducherry", "Gujarat", "Rajasthan",
    "Ladakh", "Maharashtra", "Madhya Pradesh", "Assam",
    "Andaman & Nicobar", "Bihar", "Jharkhand", "Sikkim",
    "Meghalaya", "Arunachal Pradesh", "Nagaland", "Manipur",
    "Himachal Pradesh", "West Bengal", "Odisha", "Chhattisgarh",
    "Punjab", "Tripura", "Mizoram", "Haryana"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-400 via-purple-400 to-cyan-400 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="text-red-600 hover:text-red-700"
          >
            <ArrowLeft className="h-8 w-8" />
          </Button>
          
          <h1 className="text-5xl font-bold text-center flex-1">States</h1>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="border-2 border-orange-400 rounded-lg">
              <span className="text-orange-400">⊞</span>
            </Button>
            <Button variant="ghost" size="icon" className="border-2 border-orange-400 rounded-lg">
              <span className="text-orange-400">⊡</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {states.map((state, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer transform transition-transform hover:scale-105"
            >
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-blue-300 to-green-300 rounded-2xl shadow-lg overflow-hidden mb-2">
                <div className="w-full h-full flex items-center justify-center text-white text-sm font-semibold p-4 text-center">
                  {state}
                </div>
              </div>
              <p className="text-center font-serif text-lg text-gray-800 underline">
                {state}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default States;
