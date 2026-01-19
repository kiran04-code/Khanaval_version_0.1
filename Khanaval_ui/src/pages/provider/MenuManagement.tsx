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
  Utensils
} from "lucide-react";
import { Getmymess } from "@/hooks/PorviderMess";

type MealType = "breakfast" | "dinner";

interface MenuItem {
  id: string;
  type: MealType;
  time:string;
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
  const {messdata} = Getmymess()
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
      id:messdata?.id,
      date: todayStr,
      type: type,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
      image: imagePreview
    };

    console.log("📤 API SEND TEST:", apiPayload);

    const localEntry: MenuItem = {
      id: Date.now().toString(),
      ...apiPayload
    };

    setMenuData((prev) => {
      const todayEntry = prev.find(d => d.date === todayStr);
      if (todayEntry) {
        return prev.map(d => d.date === todayStr ? { ...d, items: [...d.items, localEntry] } : d);
      }
      return [...prev, { date: todayStr, items: [localEntry] }];
    });

    try {
      const response = await fetch("/addmenu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      });
      if (!response.ok) throw new Error("Sync Error");
    } catch (err) {
      console.error("❌ Failed to sync with server:", err);
    }
    setNewItem({ name: "", isVeg: true });
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black">Today's Daily Menu</h1>
            <p className="text-slate-400 text-sm font-medium">{format(new Date(), "EEEE, MMM do")}</p>
          </div>
          <Utensils className="h-10 w-10 text-slate-700" />
        </div>
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl flex flex-col justify-center">
          <h3 className="text-blue-900 font-bold text-sm flex items-center gap-1"><Lock className="h-3 w-3" /> Auto-Clean</h3>
          <p className="text-blue-700 text-xs mt-1">This system only manages the current day's service.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">

        <Card className="border-none shadow-2xl rounded-[2rem] bg-white overflow-hidden">
          <div className="p-6 bg-orange-50/50 flex items-center justify-between border-b border-orange-100">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 p-2 rounded-xl"><Coffee className="w-5 h-5 text-white" /></div>
              <h2 className="text-lg font-bold text-slate-800 uppercase tracking-tight">Breakfast</h2>
            </div>
            <Dialog open={isBreakfastOpen} onOpenChange={setIsBreakfastOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600 rounded-xl px-2 text-xs font-bold"><Plus className="w-3 h-3 mr-1" /> ADD DISH</Button>
              </DialogTrigger>
              <DialogContent className="rounded-[2rem] sm:max-w-[400px] ">
                <MenuAddForm type="breakfast" onSave={() => handleSaveItem("breakfast")} newItem={newItem} setNewItem={setNewItem} imagePreview={imagePreview} handleImageChange={handleImageChange} />
              </DialogContent>
            </Dialog>
          </div>
          <CardContent className="p-6 px-2">
            <MealList items={todaysItems.filter(i => i.type === "breakfast")} onDelete={handleDelete} />
          </CardContent>
        </Card>

        <Card className="border-none shadow-2xl rounded-[2rem] bg-white overflow-hidden">
          <div className="p-6 bg-indigo-50/50 flex items-center justify-between border-b border-indigo-100">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl"><Moon className="w-5 h-5 text-white" /></div>
              <h2 className="text-lg font-bold text-slate-800 uppercase tracking-tight">Dinner</h2>
            </div>
            <Dialog open={isDinnerOpen} onOpenChange={setIsDinnerOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-4 text-xs font-bold"><Plus className="w-3 h-3 mr-1" /> ADD DISH</Button>
              </DialogTrigger>
              <DialogContent className="rounded-[2rem] sm:max-w-[400px]  w-[300px] ">
                <MenuAddForm type="dinner" onSave={() => handleSaveItem("dinner")} newItem={newItem} setNewItem={setNewItem} imagePreview={imagePreview} handleImageChange={handleImageChange} />
              </DialogContent>
            </Dialog>
          </div>
          <CardContent className="p-6">
            <MealList items={todaysItems.filter(i => i.type === "dinner")} onDelete={handleDelete} />
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
function MealList({ items, onDelete }: { items: MenuItem[], onDelete: (id: string) => void }) {
  if (items.length === 0) return <div className="py-12 text-center text-slate-300 italic text-sm border-2 border-dashed border-slate-50 rounded-2xl">Empty Menu</div>;
  return (
    <div className="space-y-4">
      {items.map(item => (
        <div key={item.id} className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl group border border-transparent hover:border-slate-200 hover:bg-white transition-all">
          <div className="h-14 w-14 rounded-xl bg-slate-200 overflow-hidden shadow-inner flex-shrink-0">
            {item.image ? <img src={item.image} className="h-full w-full object-cover" alt="" /> : <ImageIcon className="m-auto h-6 w-6 text-slate-400 mt-4" />}
          </div>
          <Button variant="ghost" size="icon" className="text-slate-300 hover:text-red-500 rounded-full h-8 w-8" onClick={() => onDelete(item.id)}><Trash2 className="w-4 h-4" /></Button>
        </div>
      ))}
    </div>
  );
}


function MenuAddForm({ type, onSave, newItem, setNewItem, imagePreview, handleImageChange }: any) {
  return (
    <div>
      <div className="space-y-5 pt-10 ">
        <div className="relative h-44 w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center overflow-hidden transition-all hover:bg-slate-100 group">
          {imagePreview ? (
            <img src={imagePreview} className="h-full w-full object-cover" alt="Preview" />
          ) : (
            <label className="cursor-pointer flex flex-col items-center text-slate-400">
              <div className="bg-white p-3 rounded-2xl shadow-sm mb-2"><Upload className="h-5 h-5 text-indigo-500" /></div>
              <span className="text-xs font-bold uppercase tracking-tighter">Select Dish Image</span>
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          )}
        </div>
        <Button className="w-full h-14 bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-sm" onClick={onSave}>
          ADD TO {type.toUpperCase()} <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}