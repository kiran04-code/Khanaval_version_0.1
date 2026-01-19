import { useState, useEffect } from "react";
import { format, parseISO, isSameDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import axios from "axios";
import { useStateContex } from "@/context/State";

type MealType = "breakfast" | "dinner";

interface MenuItem {
  id: string;
  type: MealType;
  time: string;
  image?: string;
}

interface DayMenu {
  date: string;
  items: MenuItem[];
}

export default function MenuManagement() {
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const [menuData, setMenuData] = useState<DayMenu[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({ name: "", isVeg: true });
  const [isBreakfastOpen, setIsBreakfastOpen] = useState(false);
  const [isDinnerOpen, setIsDinnerOpen] = useState(false);
  const { messdata } = Getmymess();
 const {axioseInstace} = useStateContex()
  useEffect(() => {
    setMenuData((prev) =>
      prev.filter((day) => isSameDay(parseISO(day.date), new Date()))
    );
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveItem = async (type: MealType) => {
    const apiPayload = {
      id: messdata?.id,
      date: todayStr,
      type: type,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      image: imagePreview
    };

    const localEntry: MenuItem = {
      id: Date.now().toString(),
      ...apiPayload
    };

    setMenuData((prev) => {
      const todayEntry = prev.find(d => d.date === todayStr);
      if (todayEntry) {
        return prev.map(d => d.date === todayStr ? { ...d, items: [...d.items, localEntry] } : d);
      }
      return [{ date: todayStr, items: [localEntry] }];
    });

    try {
      const response = await axioseInstace.post("addmenu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      });
      if (!response.ok) throw new Error("Sync Error");
    } catch (err) {
      console.error("❌ Failed to sync:", err);
    }

    setImagePreview(null);
    setIsBreakfastOpen(false);
    setIsDinnerOpen(false);
  };

  const handleDelete = (id: string) => {
    setMenuData(prev => prev.map(d => ({
      ...d,
      items: d.items.filter(i => i.id !== id)
    })));
  };

  const todaysItems = menuData.find(d => d.date === todayStr)?.items || [];

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black">Today's Menu</h1>
            <p className="text-slate-400 text-sm font-medium">{format(new Date(), "EEEE, MMM do")}</p>
          </div>
          <Utensils className="h-10 w-10 text-slate-800" />
        </div>
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl flex flex-col justify-center">
          <h3 className="text-blue-900 font-bold text-sm flex items-center gap-1"><Lock className="h-3 w-3" /> Auto-Clean</h3>
          <p className="text-blue-700 text-xs mt-1">Updates are visible to users instantly.</p>
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
          items={todaysItems.filter(i => i.type === "breakfast")}
          onDelete={handleDelete}
          formProps={{ onSave: handleSaveItem, imagePreview, handleImageChange }}
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
          items={todaysItems.filter(i => i.type === "dinner")}
          onDelete={handleDelete}
          formProps={{ onSave: handleSaveItem, imagePreview, handleImageChange }}
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
            <Button size="sm" className={`${colorClass} hover:opacity-90 rounded-xl  text-[10px] font-bold text-white`}>
              <Plus className="w-3 h-3 mr-1" /> ADD MENU
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-[2.5rem] sm:max-w-[400px] w-[350px] p-0 overflow-hidden border-none">
            <MenuAddForm type={type} onSave={() => formProps.onSave(type)} imagePreview={formProps.imagePreview} handleImageChange={formProps.handleImageChange} />
          </DialogContent>
        </Dialog>
      </div>
      <CardContent className="p-4">
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
        <div className="w-full h-64 rounded-[1.5rem] bg-slate-100 overflow-hidden shadow-md">
          {mainDish.image ? (
            <img src={mainDish.image} className="w-full h-full object-cover" alt="Today's Menu" />
          ) : (
            <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-12 h-12 text-slate-300" /></div>
          )}
        </div>
        
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 shadow-sm">
           <Clock className="w-3 h-3 text-slate-600" />
           <span className="text-[10px] font-bold text-slate-700">{mainDish.time}</span>
        </div>

        <Button 
          variant="destructive" 
          size="icon" 
          className="absolute top-3 right-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => onDelete(mainDish.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      
      {items.length > 1 && (
        <div className="text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Previous updates are hidden</p>
        </div>
      )}
    </div>
  );
}

function MenuAddForm({ type, onSave, imagePreview, handleImageChange }: any) {
  return (
    <div className="bg-white px-6 py-8">
      <h3 className="text-xl font-black text-slate-900 mb-5">Update {type} Menu</h3>
      <div className="space-y-6">
        <div className="relative h-56 w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center overflow-hidden transition-all hover:bg-slate-100 group">
          {imagePreview ? (
            <img src={imagePreview} className="h-full w-full object-cover" alt="Preview" />
          ) : (
            <label className="cursor-pointer flex flex-col items-center text-slate-400">
              <div className="bg-white p-4 rounded-2xl shadow-sm mb-3">
                <Upload className="h-6 w-6 text-indigo-500" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">Tap to upload menu image</span>
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          )}
        </div>
        <Button 
          className="w-full h-14 bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-sm shadow-xl transition-transform active:scale-95" 
          onClick={onSave}
        >
          POST {type.toUpperCase()} MENU <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}