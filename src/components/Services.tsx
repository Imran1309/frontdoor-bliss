import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Great+Vibes&family=Dancing+Script:wght@500&family=UnifrakturCook:wght@700&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);
  }, []);

  const packages = [
    { title: "Honey Moon", img: "/src/assets/honey image.jpg" },
    { title: "Educational Trip", img: "/src/assets/isro.jpg" },
    { title: "Devotional Trip", img: "/src/assets/dev.jpg" },
    { title: "Wedding Trip", img: "/src/assets/wd.jpg" },
    { title: "College IV", img: "/src/assets/college iv.jpg" },
    { title: "All India trip", img: "/src/assets/india (1).jpg" },
  ];

  return (
    <section id="packages" className="py-4 relative overflow-hidden">
      <div
        className="min-h-screen text-center p-4"
        style={{
          background:
            "linear-gradient(to bottom, #ff66b3, #ffa64d, #66ffb3, #ff66b3, #66d9ff)",
        }}
      >
        {/* ⭐ NEW ARROW DESIGN */}
        <div className="flex items-start mt-8 ml-4 mb-10">
          <div
            className="w-16 h-16 bg-yellow-400 rounded-xl shadow-xl flex items-center justify-center cursor-pointer hover:bg-yellow-500 transition-all"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="text-[#7a0010] w-10 h-10" />
          </div>
        </div>

        {/* ⭐ Heading */}
        <h1
          className="text-6xl text-[#b30000] mb-10"
          style={{
            fontFamily: "'Great Vibes', 'Dancing Script', cursive",
            fontWeight: 600,
            letterSpacing: "1px",
          }}
        >
          Our Packages
        </h1>

        {/* ⭐ Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center px-4">
          {packages.map((pkg) => (
            <div key={pkg.title} className="flex flex-col items-center space-y-4">
              <img
                src={pkg.img}
                alt={pkg.title}
                className="w-56 h-56 rounded-full object-cover border-4 border-pink-200 shadow-md"
              />

              {/* Button wrapper */}
              <div
                className="bg-[#7a0010] text-[#ffb3d9] rounded-2xl px-6 py-2 text-2xl shadow-lg"
                style={{
                  fontFamily:
                    "'UnifrakturCook', 'Great Vibes', 'Dancing Script', cursive",
                  fontWeight: 700,
                }}
              >
                <Button
                  size="lg"
                  onClick={() =>
                    navigate(`/booking?package=${encodeURIComponent(pkg.title)}`)
                  }
                  className="w-72 bg-transparent hover:bg-transparent text-white rounded-full text-xl py-6 font-serif italic border-none"
                >
                  {pkg.title}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
