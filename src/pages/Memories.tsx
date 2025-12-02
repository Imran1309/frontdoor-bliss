import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Upload, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import AuthDialog from "@/components/AuthDialog";
import karnatakaDiaries from "@/assets/go-2.jpg";
import coorg from "@/assets/bg-falls.jpg";
import goldenTemple from "@/assets/wd.jpg";

interface Memory {
  image: string;
  title: string;
  description: string;
}

const Memories = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userMemories, setUserMemories] = useState<Memory[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    setIsAuthenticated(!!currentUser);
  }, []);

  const defaultMemories = [
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

  const allMemories = [...userMemories, ...defaultMemories];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select an image or video file",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !newTitle.trim()) {
      toast({
        title: "Missing information",
        description: "Please add a title and select a photo/video",
        variant: "destructive",
      });
      return;
    }

    const newMemory: Memory = {
      image: previewUrl,
      title: newTitle,
      description: newDescription,
    };

    setUserMemories([newMemory, ...userMemories]);
    
    // Reset form
    setUploadDialogOpen(false);
    setNewTitle("");
    setNewDescription("");
    setSelectedFile(null);
    setPreviewUrl("");
    
    toast({
      title: "Memory added!",
      description: "Your new memory has been added successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-400 via-purple-300 via-green-300 to-cyan-400 relative">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-red-600 hover:text-red-700 transition-colors"
          aria-label="Go back"
          title="Go back"
        >
          <ArrowLeft size={40} strokeWidth={3} />
        </button>
        <h1 className="text-5xl font-bold text-[#5a1a45] font-serif">Memories</h1>
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAuthDialogOpen(true)}
              className="text-gray-700 hover:text-gray-900"
            >
              <User className="h-4 w-4 mr-2" />
              Account
            </Button>
          )}
          <button
            type="button"
            onClick={() => {
              if (!isAuthenticated) {
                setAuthDialogOpen(true);
              } else {
                setUploadDialogOpen(true);
              }
            }}
            className="text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Add memory"
            title="Add memory"
          >
            <Plus size={40} strokeWidth={2.5} className="border-2 border-gray-700 rounded-full" />
          </button>
        </div>
      </div>

      {/* Memory Cards */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {allMemories.map((memory, index) => (
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

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Memory</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter memory title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Share your experience..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="memory-file">Photo or Video</Label>
              <input
                id="memory-file"
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileSelect}
                title="Choose a photo or video"
                placeholder="Choose a photo or video"
                aria-label="Choose a photo or video"
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                {selectedFile ? selectedFile.name : "Choose file"}
              </Button>
              {previewUrl && (
                <div className="mt-2 rounded-lg overflow-hidden">
                  {selectedFile?.type.startsWith('image/') ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover" />
                  ) : (
                    <video src={previewUrl} className="w-full h-48 object-cover" controls />
                  )}
                </div>
              )}
            </div>
            <Button onClick={handleUpload} className="w-full">
              Add Memory
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Auth Dialog */}
      <AuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        onAuthenticated={() => {
          setIsAuthenticated(true);
          setUploadDialogOpen(true);
        }}
      />
    </div>
  );
};

export default Memories;
