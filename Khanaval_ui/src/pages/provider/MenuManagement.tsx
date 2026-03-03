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
  Type,
  ChevronLeft,
  Utensils,
} from "lucide-react";
import { Getmymess } from "@/hooks/PorviderMess";
import { useStateContex } from "@/context/State";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

interface MenuItem {
  _id?: string;
  types: string;
  imageUrl?: string | null;
  menuText?: string;
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
  const [menuText, setMenuText] = useState("");
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
    if (!imageData) return toast({ title: "Please provide an image", variant: "destructive" });
    setIsLoading(true);
    const formData = new FormData();
    formData.append("id", messdata?.id);
    formData.append("date", todayStr);
    formData.append("type", type);
    formData.append("image", imageData);
    try {
      const { data } = await axioseInstace.post("/api/addmenu", formData);
      if (data.success) {
        toast({ title: "Image Menu Posted" });
        setIsBreakfastOpen(false);
        setIsDinnerOpen(false);
        resetForm();
        queryClient.invalidateQueries({ queryKey: ["get-mess"] });
      }
    } catch (err) {
      toast({ title: "Upload Failed", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const updatedMenuText = async (type: string) => {
    if (!menuText.trim()) return toast({ title: "Please type a menu", variant: "destructive" });
    setIsLoading(true);
    try {
      const { data } = await axioseInstace.post("api/mess/UpdateMenu", { 
        MenuText: menuText, 
        messId: messdata?.id,
        type: type 
      })
      if (data.success) {
        toast({ title: "Text Menu Updated" });
        setIsBreakfastOpen(false);
        setIsDinnerOpen(false);
        resetForm();
        queryClient.invalidateQueries({ queryKey: ["get-mess"] });
      }
    } catch (error) {
      toast({ title: "Update Failed", variant: "destructive" });
    } finally {
        setIsLoading(false);
    }
  }

  const resetForm = () => {
    setImagePreview(null);
    setImageData(null);
    setMenuText("");
  };

  const handleDelete = async (itemId: string) => {
    try {
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
          title="Lunch"
          type="breakfast"
          icon={<Coffee className="w-5 h-5 text-white" />}
          colorClass="bg-orange-500"
          isOpen={isBreakfastOpen}
          setIsOpen={setIsBreakfastOpen}
          items={todaysItems.filter(i => i.types === "breakfast")}
          onDelete={handleDelete}
          formProps={{ onSave: handleSaveItem, onSaveText: updatedMenuText, imagePreview, handleImageChange, isLoading, menuText, setMenuText, resetForm }}
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
          formProps={{ onSave: handleSaveItem, onSaveText: updatedMenuText, imagePreview, handleImageChange, isLoading, menuText, setMenuText, resetForm }}
        />
      </div>
    </div>
  );
}

function MenuCard({ title, type, icon, colorClass, isOpen, setIsOpen, items, onDelete, formProps }: any) {
  return (
    <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden transition-all hover:shadow-orange-100">
      <div className="p-7 flex items-center justify-between border-b border-slate-50">
        <div className="flex items-center gap-4">
          <div className={`${colorClass} p-2.5 rounded-2xl shadow-lg shadow-inherit`}>{icon}</div>
          <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">{title}</h2>
        </div>
        <Dialog open={isOpen} onOpenChange={(val) => { setIsOpen(val); if (!val) formProps.resetForm(); }}>
          <DialogTrigger asChild>
            <Button size="sm" className={`${colorClass} rounded-2xl text-[11px] font-black text-white px-5 hover:scale-105 transition-transform`}>
              <Plus className="w-3.5 h-3.5 mr-1.5 stroke-[3px]" /> ADD MENU
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-[2.5rem] sm:max-w-[420px] p-0 overflow-hidden border-none">
            <MenuAddForm
              type={type}
              onSave={() => formProps.onSave(type)}
              onSaveText={() => formProps.onSaveText(type)}
              imagePreview={formProps.imagePreview}
              handleImageChange={formProps.handleImageChange}
              isLoading={formProps.isLoading}
              menuText={formProps.menuText}
              setMenuText={formProps.setMenuText}
              colorClass={colorClass}
            />
          </DialogContent>
        </Dialog>
      </div>
      <CardContent className="p-6">
        <MealDisplay items={items} onDelete={onDelete} />
      </CardContent>
    </Card>
  );
}

function MenuAddForm({ type, onSave, onSaveText, imagePreview, handleImageChange, isLoading, menuText, setMenuText }: any) {
  const [step, setStep] = useState<"choice" | "image" | "text">("choice");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-white p-8 min-h-[400px] flex flex-col justify-center">
      {step !== "choice" && (
        <button onClick={() => setStep("choice")} className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-black text-slate-900 uppercase italic leading-none">Update {type}</h3>
        <p className="text-slate-400 text-[10px] font-bold mt-2 tracking-widest uppercase">Choose display method</p>
      </div>

      {step === "choice" ? (
        <div className="grid gap-4">
          <button onClick={() => setStep("image")} className="group flex items-center p-5 rounded-[1.5rem] border-2 border-slate-100 hover:border-slate-900 hover:bg-slate-900 transition-all text-left">
            <div className="p-3 rounded-xl bg-slate-50 group-hover:bg-white/10 text-slate-900 group-hover:text-white mr-4">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="font-black text-slate-900 group-hover:text-white uppercase text-sm">Upload Photo</p>
              <p className="text-xs text-slate-400 group-hover:text-slate-300">Share a picture of the meal</p>
            </div>
          </button>

          <button onClick={() => setStep("text")} className="group flex items-center p-5 rounded-[1.5rem] border-2 border-slate-100 hover:border-slate-900 hover:bg-slate-900 transition-all text-left">
            <div className="p-3 rounded-xl bg-slate-50 group-hover:bg-white/10 text-slate-900 group-hover:text-white mr-4">
              <Type className="w-6 h-6" />
            </div>
            <div>
              <p className="font-black text-slate-900 group-hover:text-white uppercase text-sm">Text Based Menu</p>
              <p className="text-xs text-slate-400 group-hover:text-slate-300">Type out the menu items</p>
            </div>
          </button>
        </div>
      ) : step === "image" ? (
        <div className="space-y-6">
          <div onClick={() => inputRef.current?.click()} className="relative h-56 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer overflow-hidden group hover:border-slate-400 transition-all">
            {imagePreview ? <img src={imagePreview} className="h-full w-full object-cover" alt="Preview" /> : (
              <div className="text-center">
                <Upload className="w-10 h-10 text-slate-300 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Click to browse photo</p>
              </div>
            )}
            <input type="file" ref={inputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
          </div>
          <Button disabled={isLoading || !imagePreview} className="w-full h-14 bg-slate-900 text-white rounded-2xl font-black italic tracking-wider" onClick={onSave}>
            {isLoading ? "PROCESSING..." : "POST PHOTO"}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <textarea
            value={menuText}
            onChange={(e) => setMenuText(e.target.value)}
            placeholder="Example: Rajma Chawal, Salad, Pickle, Curd..."
            className="w-full h-44 p-6 rounded-[2rem] bg-slate-50 border-2 border-slate-100 focus:border-slate-900 focus:outline-none text-slate-700 font-medium resize-none transition-all placeholder:text-slate-300"
          />
          <Button disabled={isLoading || !menuText.trim()} className="w-full h-14 bg-slate-900 text-white rounded-2xl font-black italic tracking-wider" onClick={onSaveText}>
            {isLoading ? "PROCESSING..." : "POST TEXT MENU"}
          </Button>
        </div>
      )}
    </div>
  );
}

function MealDisplay({ items, onDelete }: { items: MenuItem[], onDelete: (id: string) => void }) {
  if (items.length === 0) return (
    <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[2rem]">
      <Utensils className="w-10 h-10 text-slate-200 mb-3" />
      <p className="text-slate-300 font-black uppercase text-[10px] tracking-widest">No Menu Set</p>
    </div>
  );

  const mainDish = items[items.length - 1];

  return (
    <div className="relative group">
      <div className="w-full min-h-[280px] rounded-[2rem] bg-slate-50 overflow-hidden shadow-inner flex flex-col">
        {/* UPDATED LOGIC: If imageUrl is null or empty, show menuText */}
        {mainDish.imageUrl ? (
          <img src={mainDish.imageUrl} className="w-full h-full object-cover" alt="Menu" />
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-white to-slate-50 border border-slate-100 min-h-[280px]">
             <Utensils className="w-8 h-8 text-slate-200 mb-4" />
             <p className="text-2xl font-bold text-slate-800 leading-tight tracking-tight italic">
               "{mainDish.menuText || 'No description available'}"
             </p>
             <div className="mt-4 w-12 h-1 bg-slate-200 rounded-full" />
          </div>
        )}
      </div>
      <Button
        variant="destructive"
        size="icon"
        className="absolute top-4 right-4 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-xl"
        onClick={() => mainDish._id && onDelete(mainDish._id)}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}