import { useState } from "react";
import { format, addDays, startOfWeek } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Pencil,
  Trash2,
  Utensils,
  Coffee,
  Moon,
} from "lucide-react";

type MealType = "breakfast" | "lunch" | "dinner";

interface MenuItem {
  id: string;
  name: string;
  type: MealType;
  isVeg: boolean;
}

interface DayMenu {
  date: string;
  items: MenuItem[];
}

const initialMenuData: DayMenu[] = [
  {
    date: format(new Date(), "yyyy-MM-dd"),
    items: [
      { id: "1", name: "Poha with Jalebi", type: "breakfast", isVeg: true },
      { id: "2", name: "Dal Rice, Roti, Sabzi", type: "lunch", isVeg: true },
      { id: "3", name: "Paneer Curry, Rice, Salad", type: "dinner", isVeg: true },
    ],
  },
  {
    date: format(addDays(new Date(), 1), "yyyy-MM-dd"),
    items: [
      { id: "4", name: "Paratha with Curd", type: "breakfast", isVeg: true },
      { id: "5", name: "Rajma Chawal, Roti", type: "lunch", isVeg: true },
      { id: "6", name: "Chicken Curry, Rice", type: "dinner", isVeg: false },
    ],
  },
];

const mealIcons = {
  breakfast: Coffee,
  lunch: Utensils,
  dinner: Moon,
};

const mealLabels = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
};

export default function MenuManagement() {
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [menuData, setMenuData] = useState<DayMenu[]>(initialMenuData);
  const [selectedDay, setSelectedDay] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", type: "lunch" as MealType, isVeg: true });

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));

  const getDayMenu = (date: string) => {
    return menuData.find((d) => d.date === date)?.items || [];
  };

  const handlePrevWeek = () => setCurrentWeekStart(addDays(currentWeekStart, -7));
  const handleNextWeek = () => setCurrentWeekStart(addDays(currentWeekStart, 7));

  const handleAddItem = () => {
    if (!newItem.name.trim()) return;

    const existingDay = menuData.find((d) => d.date === selectedDay);
    const newMenuItem: MenuItem = {
      id: Date.now().toString(),
      ...newItem,
    };

    if (existingDay) {
      setMenuData(menuData.map((d) =>
        d.date === selectedDay ? { ...d, items: [...d.items, newMenuItem] } : d
      ));
    } else {
      setMenuData([...menuData, { date: selectedDay, items: [newMenuItem] }]);
    }

    setNewItem({ name: "", type: "lunch", isVeg: true });
    setIsAddDialogOpen(false);
  };

  const handleEditItem = () => {
    if (!editingItem || !editingItem.name.trim()) return;

    setMenuData(menuData.map((d) =>
      d.date === selectedDay
        ? { ...d, items: d.items.map((item) => (item.id === editingItem.id ? editingItem : item)) }
        : d
    ));
    setEditingItem(null);
  };

  const handleDeleteItem = (itemId: string) => {
    setMenuData(menuData.map((d) =>
      d.date === selectedDay
        ? { ...d, items: d.items.filter((item) => item.id !== itemId) }
        : d
    ));
  };

  const selectedDayItems = getDayMenu(selectedDay);
  const groupedItems = {
    breakfast: selectedDayItems.filter((i) => i.type === "breakfast"),
    lunch: selectedDayItems.filter((i) => i.type === "lunch"),
    dinner: selectedDayItems.filter((i) => i.type === "dinner"),
  };

  return (
    <div className="space-y-6">
      {/* Calendar Navigation */}
      <Card variant="elevated">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Weekly Menu Calendar</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handlePrevWeek}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium min-w-[140px] text-center">
                {format(currentWeekStart, "MMM d")} - {format(addDays(currentWeekStart, 6), "MMM d, yyyy")}
              </span>
              <Button variant="ghost" size="icon" onClick={handleNextWeek}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day) => {
              const dateStr = format(day, "yyyy-MM-dd");
              const isSelected = dateStr === selectedDay;
              const isToday = dateStr === format(new Date(), "yyyy-MM-dd");
              const hasItems = getDayMenu(dateStr).length > 0;

              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDay(dateStr)}
                  className={`p-3 rounded-xl text-center transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : isToday
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  <p className="text-xs font-medium opacity-70">{format(day, "EEE")}</p>
                  <p className="text-lg font-bold">{format(day, "d")}</p>
                  {hasItems && !isSelected && (
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mx-auto mt-1" />
                  )}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected Day Menu */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            {format(new Date(selectedDay), "EEEE, MMMM d")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {selectedDayItems.length} items planned
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Menu Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium text-foreground">Item Name</label>
                <Input
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="e.g., Dal Rice, Roti"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Meal Type</label>
                <div className="flex gap-2 mt-2">
                  {(["breakfast", "lunch", "dinner"] as MealType[]).map((type) => (
                    <Button
                      key={type}
                      type="button"
                      variant={newItem.type === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewItem({ ...newItem, type })}
                    >
                      {mealLabels[type]}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Type</label>
                <div className="flex gap-2 mt-2">
                  <Button
                    type="button"
                    variant={newItem.isVeg ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNewItem({ ...newItem, isVeg: true })}
                  >
                    🟢 Veg
                  </Button>
                  <Button
                    type="button"
                    variant={!newItem.isVeg ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNewItem({ ...newItem, isVeg: false })}
                  >
                    🔴 Non-Veg
                  </Button>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <DialogClose asChild>
                  <Button variant="outline" className="flex-1">Cancel</Button>
                </DialogClose>
                <Button onClick={handleAddItem} className="flex-1">Add Item</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Menu Items by Meal */}
      <div className="grid md:grid-cols-3 gap-4">
        {(["breakfast", "lunch", "dinner"] as MealType[]).map((mealType) => {
          const Icon = mealIcons[mealType];
          const items = groupedItems[mealType];

          return (
            <Card key={mealType} variant="interactive">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Icon className="w-4 h-4 text-primary" />
                  {mealLabels[mealType]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {items.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4 text-center">
                    No items added
                  </p>
                ) : (
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg group"
                      >
                        <div className="flex items-center gap-2">
                          <Badge variant={item.isVeg ? "veg" : "non-veg"} className="w-5 h-5 p-0 justify-center">
                            {item.isVeg ? "🟢" : "🔴"}
                          </Badge>
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => setEditingItem(item)}
                              >
                                <Pencil className="w-3 h-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Menu Item</DialogTitle>
                              </DialogHeader>
                              {editingItem && (
                                <div className="space-y-4 pt-4">
                                  <div>
                                    <label className="text-sm font-medium">Item Name</label>
                                    <Input
                                      value={editingItem.name}
                                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                                      className="mt-1"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Meal Type</label>
                                    <div className="flex gap-2 mt-2">
                                      {(["breakfast", "lunch", "dinner"] as MealType[]).map((type) => (
                                        <Button
                                          key={type}
                                          variant={editingItem.type === type ? "default" : "outline"}
                                          size="sm"
                                          onClick={() => setEditingItem({ ...editingItem, type })}
                                        >
                                          {mealLabels[type]}
                                        </Button>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Type</label>
                                    <div className="flex gap-2 mt-2">
                                      <Button
                                        variant={editingItem.isVeg ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setEditingItem({ ...editingItem, isVeg: true })}
                                      >
                                        🟢 Veg
                                      </Button>
                                      <Button
                                        variant={!editingItem.isVeg ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setEditingItem({ ...editingItem, isVeg: false })}
                                      >
                                        🔴 Non-Veg
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="flex gap-2 pt-4">
                                    <DialogClose asChild>
                                      <Button variant="outline" className="flex-1">Cancel</Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                      <Button onClick={handleEditItem} className="flex-1">Save</Button>
                                    </DialogClose>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive hover:text-destructive"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
