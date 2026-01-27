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
  Clock
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

// --- HELPER: Image Compression ---
const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1200; // Limit resolution for mobile
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            }
          },
          "image/jpeg",
          0.7 // Compression quality (70%)
        );
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
    const file = e.target.files?.[0] || null;
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
    if (!imageData) {
      return toast({ title: "Please Upload Menu Image First", variant: "destructive" });
    }
    const isDuplicate = messdata?.Menu?.some((item: any) => item.types === type);

    if (isDuplicate) {
      return toast({
        title: "Menu Already Exists",
        description: `Please delete the current ${type} menu first.`,
        variant: "destructive"
      });
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("id", messdata?.id);
    formData.append("date", todayStr);
    formData.append("type", type);
    formData.append("time", new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    formData.append("image", imageData);

    try {
      const { data } = await axioseInstace.post("/api/addmenu", formData);
      if (data.success) {
        toast({ title: `${type.toUpperCase()} Menu Updated Successfully` });
        setIsBreakfastOpen(false);
        setIsDinnerOpen(false);
        setImagePreview(null);
        setImageData(null);
        queryClient.invalidateQueries({ queryKey: ["get-mess"] });
      }
    } catch (err) {
      toast({ title: "Upload Failed", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (menuId: string) => {
    const { data } = await axioseInstace.post("/api/deleteMenu", {
      id: messdata.id,
      types: menuId
    });
    if (data.success) {
      toast({ title: "Menu deleted successfully." });
      queryClient.invalidateQueries({ queryKey: ["get-mess"] });
    }
  };

  const todaysItems = menuData[0]?.items || [];

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white">Today's Menu</h1>
            <p className="text-slate-400 text-sm font-medium">{format(new Date(), "EEEE, MMM do")}</p>
          </div>
          <Utensils className="h-10 w-10 text-slate-700" />
        </div>
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl flex flex-col justify-center">
          <h3 className="text-blue-900 font-bold text-sm flex items-center gap-1"><Lock className="h-3 w-3" /> Auto-Clean</h3>
          <p className="text-blue-700 text-xs mt-1">Compressed for mobile speed.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <MenuCard
          title="Breakfast"
          type="breakfast"
          icon={<Coffee className="w-5 h-5 text-white" />}
          colorClass="bg-orange-500"
          headerBg="bg-orange-50/50"
          borderColor="border-orange-100"
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
          headerBg="bg-indigo-50/50"
          borderColor="border-indigo-100"
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

function MenuCard({ title, type, icon, colorClass, headerBg, borderColor, isOpen, setIsOpen, items, onDelete, formProps }: any) {
  return (
    <Card className="border-none shadow-2xl rounded-[2rem] bg-white overflow-hidden">
      <div className={`p-6 ${headerBg} flex items-center justify-between border-b ${borderColor}`}>
        <div className="flex items-center gap-3">
          <div className={`${colorClass} p-2 rounded-xl`}>{icon}</div>
          <h2 className="text-[14px] font-bold text-slate-800 uppercase tracking-tight">{title}</h2>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className={`${colorClass} hover:opacity-90 rounded-xl text-[10px] font-bold text-white`}>
              <Plus className="w-3 h-3 mr-1" /> ADD MENU
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-[2.5rem] sm:max-w-[400px] w-[90vw] p-0 overflow-hidden border-none shadow-2xl">
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
  if (items.length === 0) return (
    <div className="py-12 text-center text-slate-300 italic text-sm border-2 border-dashed border-slate-50 rounded-[2rem]">
      No menu uploaded
    </div>
  );

  const mainDish = items[items.length - 1];

  return (
    <div className="space-y-4">
      <div className="relative group">
        <div className="w-full h-74 rounded-[1.5rem] bg-slate-100 overflow-hidden shadow-md">
          {mainDish.imageUrl ? (
            <img src={mainDish.imageUrl} className="w-full h-full object-cover" alt="Menu" />
          ) : (
            <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-12 h-12 text-slate-300" /></div>
          )}
        </div>
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-3 right-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => onDelete(mainDish.types)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

function MenuAddForm({ type, onSave, imagePreview, handleImageChange, isLoading }: any) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-white px-6 py-8">
      <h3 className="text-xl font-black text-slate-900 mb-5 text-center">Update {type} Menu</h3>
      <div className="space-y-6">
        <div 
          onClick={() => inputRef.current?.click()}
          className="relative h-56 w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center overflow-hidden cursor-pointer"
        >
          {imagePreview ? (
            <img src={imagePreview} className="h-full w-full object-cover" alt="Preview" />
          ) : (
            <div className="flex flex-col items-center text-slate-400 p-4 text-center">
              <div className="bg-white p-4 rounded-2xl shadow-sm mb-3">
                <Upload className="h-6 w-6 text-indigo-500" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">Tap to upload image</span>
            </div>
          )}
          <input 
            type="file" 
            ref={inputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleImageChange} 
          />
        </div>
        <Button
          disabled={isLoading || !imagePreview}
          className="w-full h-14 bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-sm shadow-xl"
          onClick={onSave}
        >
          {isLoading ? "PROCESSING..." : `POST ${type.toUpperCase()} MENU`}
          {!isLoading && <ChevronRight className="ml-1 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}