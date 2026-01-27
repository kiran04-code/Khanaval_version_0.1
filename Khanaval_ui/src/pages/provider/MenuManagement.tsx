import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Trash2,
  Coffee,
  Moon,
  Upload,
  ImageIcon,
  Lock,
  ChevronRight,
  Utensils,
} from "lucide-react";
import { Getmymess } from "@/hooks/PorviderMess";
import { useStateContex } from "@/context/State";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

interface MenuItem {
  _id?: string;
  types: string;
  imageUrl: string;
  CreateAt?: string | null;
  time?: string;
}

interface DayMenu {
  date: string;
  items: MenuItem[];
}

const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1200;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(new File([blob], file.name, { type: "image/jpeg" }));
          }
        }, "image/jpeg", 0.7);
      };
    };
  });
};

export default function MenuManagement() {
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const [menuData, setMenuData] = useState<DayMenu[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<File | null>(null);
  const [isBreakfastOpen, setIsBreakfastOpen] = useState(false);
  const [isDinnerOpen, setIsDinnerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { messdata } = Getmymess();
  const { axioseInstace } = useStateContex();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (messdata?.Menu && Array.isArray(messdata.Menu)) {
      setMenuData([{ date: todayStr, items: messdata.Menu }]);
    }
  }, [messdata, todayStr]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      const compressed = await compressImage(file);
      setImageData(compressed);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setIsLoading(false);
      };
      reader.readAsDataURL(compressed);
    }
  };

  const handleSaveItem = async (type: string) => {
    if (!imageData) return toast({ title: "Upload Image First", variant: "destructive" });
    setIsLoading(true);
    const formData = new FormData();
    formData.append("id", messdata?.id);
    formData.append("date", todayStr);
    formData.append("type", type);
    formData.append("image", imageData);

    try {
      const { data } = await axioseInstace.post("/api/addmenu", formData);
      if (data.success) {
        toast({ title: "Menu Updated" });
        setIsBreakfastOpen(false);
        setIsDinnerOpen(false);
        setImagePreview(null);
        queryClient.invalidateQueries({ queryKey: ["get-mess"] });
      }
    } catch (err) {
      toast({ title: "Upload Failed", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (itemId: string) => {
    try {
      // "types" is the key your backend expects, but we pass the _id string
      const { data } = await axioseInstace.post("/api/deleteMenu", {
        id: messdata.id,
        types: itemId 
      });
      if (data.success) {
        toast({ title: "Menu Deleted" });
        queryClient.invalidateQueries({ queryKey: ["get-mess"] });
      }
    } catch (err) {
      toast({ title: "Delete Failed", variant: "destructive" });
    }
  };

  const todaysItems = menuData[0]?.items || [];

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <div className="grid md:grid-cols-2 gap-8">
        <MenuCard
          title="Breakfast"
          type="breakfast"
          icon={<Coffee className="w-5 h-5 text-white" />}
          colorClass="bg-orange-500"
          isOpen={isBreakfastOpen}
          setIsOpen={setIsBreakfastOpen}
          items={todaysItems.filter(i => i.types === "breakfast")}
          onDelete={handleDelete}
          formProps={{ onSave: handleSaveItem, imagePreview, handleImageChange, isLoading }}
        />
        <MenuCard
          title="Dinner"
          type="dinner"
          icon={<Moon className="w-5 h-5 text-white" />}
          colorClass="bg-indigo-600"
          isOpen={isDinnerOpen}
          setIsOpen={setIsDinnerOpen}
          items={todaysItems.filter(i => i.types === "dinner")}
          onDelete={handleDelete}
          formProps={{ onSave: handleSaveItem, imagePreview, handleImageChange, isLoading }}
        />
      </div>
    </div>
  );
}

function MenuCard({ title, type, icon, colorClass, isOpen, setIsOpen, items, onDelete, formProps }: any) {
  return (
    <Card className="border-none shadow-2xl rounded-[2rem] bg-white overflow-hidden">
      <div className="p-6 flex items-center justify-between border-b">
        <div className="flex items-center gap-3">
          <div className={`${colorClass} p-2 rounded-xl`}>{icon}</div>
          <h2 className="text-sm font-bold text-slate-800 uppercase">{title}</h2>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className={`${colorClass} rounded-xl text-[10px] font-bold text-white`}>
              <Plus className="w-3 h-3 mr-1" /> ADD MENU
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-[2.5rem] sm:max-w-[400px] p-0 overflow-hidden">
            <MenuAddForm
              type={type}
              onSave={() => formProps.onSave(type)}
              imagePreview={formProps.imagePreview}
              handleImageChange={formProps.handleImageChange}
              isLoading={formProps.isLoading}
            />
          </DialogContent>
        </Dialog>
      </div>
      <CardContent className="p-4 px-5">
        <MealDisplay items={items} onDelete={onDelete} />
      </CardContent>
    </Card>
  );
}

function MealDisplay({ items, onDelete }: { items: MenuItem[], onDelete: (id: string) => void }) {
  if (items.length === 0) return <div className="py-12 text-center text-slate-300">No menu uploaded</div>;
  const mainDish = items[items.length - 1];

  return (
    <div className="relative group">
      <div className="w-full h-74 rounded-[1.5rem] bg-slate-100 overflow-hidden">
        <img src={mainDish.imageUrl} className="w-full h-full object-cover" alt="Menu" />
      </div>
      <Button
        variant="destructive"
        size="icon"
        className="absolute top-3 right-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => mainDish._id && onDelete(mainDish._id)}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}

function MenuAddForm({ type, onSave, imagePreview, handleImageChange, isLoading }: any) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="bg-white px-6 py-8">
      <h3 className="text-xl font-black mb-5 text-center uppercase">Update {type}</h3>
      <div 
        onClick={() => inputRef.current?.click()}
        className="relative h-56 bg-slate-50 border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center cursor-pointer overflow-hidden"
      >
        {imagePreview ? <img src={imagePreview} className="h-full w-full object-cover" /> : <Upload className="text-slate-300" />}
        <input type="file" ref={inputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
      </div>
      <Button disabled={isLoading || !imagePreview} className="w-full mt-6 h-14 bg-slate-900 text-white rounded-2xl" onClick={onSave}>
        {isLoading ? "PROCESSING..." : "POST MENU"}
      </Button>
    </div>
  );
}