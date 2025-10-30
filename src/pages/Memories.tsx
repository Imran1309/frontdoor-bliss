import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import karnatakaDiaries from "@/assets/go-2.jpg";
import coorg from "@/assets/falls-2.jpg";
import goldenTemple from "@/assets/go-3.jpg";

const Memories = () => {
  const navigate = useNavigate();

  const memories = [
    {
      image: karnatakaDiaries,
      title: "Karnataka Diaries :",
      description: "*we will share our experience our last 2days trip by our mahendra college students Mysore-coorg.\n*. The excited lotz of fun and college memories",
    },
    {
      image: coorg,
      title: "Coorg:",
      description: "*Scotland of India is a beautiful hill station famous for its coffee plantations, misty hills, waterfalls, and rich culture.\nA perfect getaway for nature and peace lovers.",
    },
    {
      image: goldenTemple,
      title: "Golden -Temple:",
      description: "*The Golden Temple of Karnataka, also known as Namdroling Monastery, is located in Bylakuppe, near Coorg.\n* It's a stunning Tibetan Buddhist monastery with golden statues, colorful murals, and peaceful surroundings — a serene place that reflects Tibetan culture and spirituality",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-400 via-purple-300 via-green-300 to-cyan-400 relative">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <button 
          onClick={() => navigate(-1)}
          className="text-red-600 hover:text-red-700 transition-colors"
        >
          <ArrowLeft size={40} strokeWidth={3} />
        </button>
        <h1 className="text-5xl font-bold text-[#5a1a45] font-serif">Memories</h1>
        <button className="text-gray-700 hover:text-gray-900 transition-colors">
          <Plus size={40} strokeWidth={2.5} className="border-2 border-gray-700 rounded-full" />
        </button>
      </div>

      {/* Memory Cards */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {memories.map((memory, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-purple-900 to-purple-950 rounded-3xl p-6 shadow-2xl border-4 border-purple-800 flex flex-col"
            >
              {/* Image */}
              <div className="rounded-2xl overflow-hidden mb-4 h-48">
                <img
                  src={memory.image}
                  alt={memory.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 mb-4">
                <h3 className="text-white text-xl font-semibold mb-2">{memory.title}</h3>
                <p className="text-white text-sm whitespace-pre-line leading-relaxed">
                  {memory.description}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-auto">
                <Button
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold"
                >
                  Review
                </Button>
                <Button
                  className="flex-1 bg-cyan-400 hover:bg-cyan-500 text-black rounded-lg font-semibold"
                >
                  For enquiry
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Memories;
