import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

// Image imports
import tamilnadu from "@/assets/Tn.jpg";
import kerala from "@/assets/kerala.jpg";
import karnataka from "@/assets/mysore.jpg";
import goa from "@/assets/goa.jpg";
import delhi from "@/assets/delhi.jpg";
import maharashtra from "@/assets/mumbai.jpg";
import andhra from "@/assets/andhara.jpg";
import telangana from "@/assets/telangana.jpg";
import jammu from "@/assets/jammu.jpg";
import puducherry from "@/assets/py.jpg";
import gujarat from "@/assets/gujarath.jpg";
import rajasthan from "@/assets/Rajasthan.png";
import ladakh from "@/assets/ladakh.jpg";
import madhya from "@/assets/andhara.jpg"; // maybe wrong? image reused
import assam from "@/assets/assam.jpg";
import andaman from "@/assets/An.jpg";
import uttarpradesh from "@/assets/up.jpg";
import bihar from "@/assets/bihar.jpg";
import jharkhand from "@/assets/jaharkand.jpg";
import sikkim from "@/assets/sikkim.jpg";
import meghalaya from "@/assets/Megahalaya.jpg";
import arunachal from "@/assets/arunachal.jpg";
import nagaland from "@/assets/Nagaland.jpg";
import manipur from "@/assets/Manipur.jpg";
import himachal from "@/assets/himachal.jpg";
import westBengal from "@/assets/westBengal.jpg";
import odisha from "@/assets/odisha.jpg";
import chattisgarh from "@/assets/chattisgarh.jpg";
import punjab from "@/assets/punjab.jpg";
import tripura from "@/assets/tripura.jpg";
import mizoram from "@/assets/mizo.jpg";
import haryana from "@/assets/haryana.jpg";

const States = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const statesData = [
    { name: "Tamil Nadu", image: tamilnadu },
    { name: "Kerala", image: kerala },
    { name: "Karnataka", image: karnataka },
    { name: "Goa", image: goa },
    { name: "Delhi", image: delhi },
    { name: "Maharashtra", image: maharashtra },
    { name: "Andhra Pradesh", image: andhra },
    { name: "Telangana", image: telangana },
    { name: "Jammu & Kashmir", image: jammu },
    { name: "Puducherry", image: puducherry },
    { name: "Gujarat", image: gujarat },
    { name: "Rajasthan", image: rajasthan },
    { name: "Ladakh", image: ladakh },
    { name: "Madhya Pradesh", image: madhya },
    { name: "Assam", image: assam },
    { name: "Andaman & Nicobar", image: andaman },
    { name: "Uttar Pradesh", image: uttarpradesh },
    { name: "Bihar", image: bihar },
    { name: "Jharkhand", image: jharkhand },
    { name: "Sikkim", image: sikkim },
    { name: "Meghalaya", image: meghalaya },
    { name: "Arunachal Pradesh", image: arunachal },
    { name: "Nagaland", image: nagaland },
    { name: "Manipur", image: manipur },
    { name: "Himachal Pradesh", image: himachal },
    { name: "West Bengal", image: westBengal },
    { name: "Odisha", image: odisha },
    { name: "Chhattisgarh", image: chattisgarh },
    { name: "Punjab", image: punjab },
    { name: "Tripura", image: tripura },
    { name: "Mizoram", image: mizoram },
    { name: "Haryana", image: haryana },
  ];

  const itemsPerPage = 16;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentStates = statesData.slice(indexOfFirst, indexOfLast);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-600 via-red-300 to-cyan-300 p-10">
      <div className="max-w-10xl mx-auto px-10">

        {/* BACK BUTTON */}
        <div className="flex items-center justify-start mb-10">
          <div
            className="bg-yellow-500 p-3 rounded-2xl shadow-lg cursor-pointer hover:bg-red-600 transition-all"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={60} className="text-red-900" />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-6xl font-extrabold text-red-900 text-center drop-shadow-2xl">
          Indian States
        </h1>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {currentStates.map((state, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer group hover:scale-105 transition-transform"
            >
              <div className="w-full h-56 rounded-2xl shadow-2xl overflow-hidden relative">
                <img
                  src={state.image}
                  alt={state.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all"
                />
                  <p className="mt-4 text-2xl font-bold text-pink-400 underline"
                 style={{
                   fontFamily: "cursive",
                   textShadow: "2px 2px 4px black"
                 }}>
                {state.name}
              </p>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center">
                  <p className="text-2xl text-yellow-300 font-bold">Explore</p>
                  <p className="text-xl text-yellow-300 underline mt-3">
                    {state.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <Pagination className="mt-10">
          <PaginationContent>
            {[1, 2].map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                  className={`cursor-pointer text-black font-bold w-12 h-12 flex items-center justify-center rounded-2xl text-lg transition-all
                    ${
                      currentPage === page
                        ? "bg-yellow-500 hover:bg-red-700"
                        : "bg-yellow-600 hover:bg-red-700"
                    }`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default States;
