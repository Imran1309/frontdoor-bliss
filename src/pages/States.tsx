import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import states1 from "@/assets/states-1.png";
import states2 from "@/assets/states-2.png";

const States = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const statesData = [
    { name: "Tamil Nadu", imageSet: 1, position: 1 },
    { name: "Kerala", imageSet: 1, position: 2 },
    { name: "Karnataka", imageSet: 1, position: 3 },
    { name: "Goa", imageSet: 1, position: 4 },
    { name: "Uttar Pradesh", imageSet: 1, position: 5 },
    { name: "Delhi", imageSet: 1, position: 6 },
    { name: "Andhra Pradesh", imageSet: 1, position: 7 },
    { name: "Telangana", imageSet: 1, position: 8 },
    { name: "Jammu & Kashmir", imageSet: 1, position: 9 },
    { name: "Puducherry", imageSet: 1, position: 10 },
    { name: "Gujarat", imageSet: 1, position: 11 },
    { name: "Rajasthan", imageSet: 1, position: 12 },
    { name: "Ladakh", imageSet: 1, position: 13 },
    { name: "Maharashtra", imageSet: 1, position: 14 },
    { name: "Madhya Pradesh", imageSet: 1, position: 15 },
    { name: "Assam", imageSet: 1, position: 16 },
    { name: "Andaman & Nicobar", imageSet: 2, position: 1 },
    { name: "Bihar", imageSet: 2, position: 2 },
    { name: "Jharkhand", imageSet: 2, position: 3 },
    { name: "Sikkim", imageSet: 2, position: 4 },
    { name: "Meghalaya", imageSet: 2, position: 5 },
    { name: "Arunachal Pradesh", imageSet: 2, position: 6 },
    { name: "Nagaland", imageSet: 2, position: 7 },
    { name: "Manipur", imageSet: 2, position: 8 },
    { name: "Himachal Pradesh", imageSet: 2, position: 9 },
    { name: "West Bengal", imageSet: 2, position: 10 },
    { name: "Odisha", imageSet: 2, position: 11 },
    { name: "Chhattisgarh", imageSet: 2, position: 12 },
    { name: "Punjab", imageSet: 2, position: 13 },
    { name: "Tripura", imageSet: 2, position: 14 },
    { name: "Mizoram", imageSet: 2, position: 15 },
    { name: "Haryana", imageSet: 2, position: 16 }
  ];

  const getImageStyle = (imageSet: number, position: number) => {
    const row = Math.ceil(position / 4);
    const col = ((position - 1) % 4) + 1;
    
    // Calculate the crop position based on grid layout (4 columns)
    const xPercent = ((col - 1) * 25);
    const yPercent = ((row - 1) * 25);
    
    return {
      backgroundImage: `url(${imageSet === 1 ? states1 : states2})`,
      backgroundSize: '400%',
      backgroundPosition: `${xPercent}% ${yPercent}%`
    };
  };

  const currentStates = statesData.filter(state => state.imageSet === currentPage);

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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {currentStates.map((state, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer transform transition-transform hover:scale-105"
            >
              <div 
                className="w-full aspect-[4/3] rounded-2xl shadow-lg overflow-hidden mb-2"
                style={getImageStyle(state.imageSet, state.position)}
              />
              <p className="text-center font-serif text-lg text-gray-800 underline">
                {state.name}
              </p>
            </div>
          ))}
        </div>

        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationLink 
                onClick={() => setCurrentPage(1)}
                isActive={currentPage === 1}
                className="cursor-pointer"
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink 
                onClick={() => setCurrentPage(2)}
                isActive={currentPage === 2}
                className="cursor-pointer"
              >
                2
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default States;
