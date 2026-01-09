import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  Users,
  Phone,
  Mail,
  Calendar,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  UserPlus,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

type SubscriberStatus = "all" | "active" | "expiring" | "expired";
type PlanType = "all" | "monthly" | "quarterly";

interface Subscriber {
  id: number;
  name: string;
  email: string;
  phone: string;
  plan: "monthly" | "quarterly";
  status: "active" | "expiring" | "expired";
  startDate: string;
  endDate: string;
  mealsLeft: number;
  totalMeals: number;
  avatar: string;
}

const mockSubscribers: Subscriber[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@email.com",
    phone: "+91 98765 43210",
    plan: "monthly",
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    mealsLeft: 22,
    totalMeals: 30,
    avatar: "RS",
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya@email.com",
    phone: "+91 98765 43211",
    plan: "quarterly",
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    mealsLeft: 78,
    totalMeals: 90,
    avatar: "PP",
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit@email.com",
    phone: "+91 98765 43212",
    plan: "monthly",
    status: "expiring",
    startDate: "2024-01-01",
    endDate: "2024-01-05",
    mealsLeft: 3,
    totalMeals: 30,
    avatar: "AK",
  },
  {
    id: 4,
    name: "Neha Singh",
    email: "neha@email.com",
    phone: "+91 98765 43213",
    plan: "monthly",
    status: "expired",
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    mealsLeft: 0,
    totalMeals: 30,
    avatar: "NS",
  },
  {
    id: 5,
    name: "Vikram Rao",
    email: "vikram@email.com",
    phone: "+91 98765 43214",
    plan: "quarterly",
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    mealsLeft: 85,
    totalMeals: 90,
    avatar: "VR",
  },
  {
    id: 6,
    name: "Ananya Gupta",
    email: "ananya@email.com",
    phone: "+91 98765 43215",
    plan: "monthly",
    status: "active",
    startDate: "2024-01-10",
    endDate: "2024-02-10",
    mealsLeft: 28,
    totalMeals: 30,
    avatar: "AG",
  },
  {
    id: 7,
    name: "Karthik Iyer",
    email: "karthik@email.com",
    phone: "+91 98765 43216",
    plan: "monthly",
    status: "expiring",
    startDate: "2024-01-01",
    endDate: "2024-01-03",
    mealsLeft: 2,
    totalMeals: 30,
    avatar: "KI",
  },
  {
    id: 8,
    name: "Deepa Menon",
    email: "deepa@email.com",
    phone: "+91 98765 43217",
    plan: "quarterly",
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    mealsLeft: 82,
    totalMeals: 90,
    avatar: "DM",
  },
];

const getStatusBadge = (status: Subscriber["status"]) => {
  switch (status) {
    case "active":
      return (
        <Badge variant="success" className="gap-1">
          <CheckCircle className="w-3 h-3" />
          Active
        </Badge>
      );
    case "expiring":
      return (
        <Badge variant="warning" className="gap-1">
          <Clock className="w-3 h-3" />
          Expiring Soon
        </Badge>
      );
    case "expired":
      return (
        <Badge variant="destructive" className="gap-1">
          <XCircle className="w-3 h-3" />
          Expired
        </Badge>
      );
  }
};

export default function SubscriberManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<SubscriberStatus>("all");
  const [planFilter, setPlanFilter] = useState<PlanType>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [subscribers, setSubscribers] = useState<Subscriber[]>(mockSubscribers);
  const [newSubscriber, setNewSubscriber] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "monthly" as "monthly" | "quarterly",
  });
  const { toast } = useToast();

  const filteredSubscribers = subscribers.filter((subscriber) => {
    const matchesSearch =
      subscriber.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscriber.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscriber.phone.includes(searchQuery);

    const matchesStatus = statusFilter === "all" || subscriber.status === statusFilter;
    const matchesPlan = planFilter === "all" || subscriber.plan === planFilter;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  const stats = {
    total: subscribers.length,
    active: subscribers.filter((s) => s.status === "active").length,
    expiring: subscribers.filter((s) => s.status === "expiring").length,
    expired: subscribers.filter((s) => s.status === "expired").length,
  };

  const handleAddSubscriber = () => {
    if (!newSubscriber.name.trim() || !newSubscriber.email.trim() || !newSubscriber.phone.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const today = new Date();
    const endDate = new Date(today);
    if (newSubscriber.plan === "monthly") {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setMonth(endDate.getMonth() + 3);
    }

    const totalMeals = newSubscriber.plan === "monthly" ? 30 : 90;
    const initials = newSubscriber.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const subscriber: Subscriber = {
      id: Date.now(),
      name: newSubscriber.name.trim(),
      email: newSubscriber.email.trim(),
      phone: newSubscriber.phone.trim(),
      plan: newSubscriber.plan,
      status: "active",
      startDate: today.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      mealsLeft: totalMeals,
      totalMeals,
      avatar: initials,
    };

    setSubscribers([subscriber, ...subscribers]);
    setNewSubscriber({ name: "", email: "", phone: "", plan: "monthly" });
    setIsAddModalOpen(false);

    toast({
      title: "Subscriber Added",
      description: `${subscriber.name} has been added successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          variant="interactive"
          className={`cursor-pointer ${statusFilter === "all" ? "ring-2 ring-primary" : ""}`}
          onClick={() => setStatusFilter("all")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          variant="interactive"
          className={`cursor-pointer ${statusFilter === "active" ? "ring-2 ring-accent" : ""}`}
          onClick={() => setStatusFilter("active")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.active}</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          variant="interactive"
          className={`cursor-pointer ${statusFilter === "expiring" ? "ring-2 ring-warning" : ""}`}
          onClick={() => setStatusFilter("expiring")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.expiring}</p>
                <p className="text-xs text-muted-foreground">Expiring</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          variant="interactive"
          className={`cursor-pointer ${statusFilter === "expired" ? "ring-2 ring-destructive" : ""}`}
          onClick={() => setStatusFilter("expired")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.expired}</p>
                <p className="text-xs text-muted-foreground">Expired</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card variant="elevated">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={planFilter} onValueChange={(v) => setPlanFilter(v as PlanType)}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plans</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="soft" size="icon">
                <Download className="w-4 h-4" />
              </Button>
              <Button className="gap-2" onClick={() => setIsAddModalOpen(true)}>
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Add</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscribers List */}
      <div className="space-y-3">
        {filteredSubscribers.length === 0 ? (
          <Card variant="elevated">
            <CardContent className="p-12 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2">No subscribers found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        ) : (
          filteredSubscribers.map((subscriber) => (
            <Card key={subscriber.id} variant="interactive">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Avatar & Name */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
                      {subscriber.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground truncate">{subscriber.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        <span className="truncate">{subscriber.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        <span>{subscriber.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Plan & Status */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                    <div className="text-sm">
                      <p className="text-muted-foreground text-xs">Plan</p>
                      <p className="font-medium text-foreground capitalize">{subscriber.plan}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground text-xs">Meals Left</p>
                      <p className="font-medium text-foreground">
                        {subscriber.mealsLeft}/{subscriber.totalMeals}
                      </p>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground text-xs">Valid Till</p>
                      <p className="font-medium text-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(subscriber.endDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                    <div>{getStatusBadge(subscriber.status)}</div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="shrink-0">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Extend Plan</DropdownMenuItem>
                        <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Cancel Subscription
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        subscriber.status === "expired"
                          ? "bg-destructive"
                          : subscriber.status === "expiring"
                          ? "bg-yellow-500"
                          : "bg-accent"
                      }`}
                      style={{
                        width: `${(subscriber.mealsLeft / subscriber.totalMeals) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Add Subscriber Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-primary" />
              Add New Subscriber
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter subscriber name"
                value={newSubscriber.name}
                onChange={(e) =>
                  setNewSubscriber({ ...newSubscriber, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={newSubscriber.email}
                onChange={(e) =>
                  setNewSubscriber({ ...newSubscriber, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={newSubscriber.phone}
                onChange={(e) =>
                  setNewSubscriber({ ...newSubscriber, phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Subscription Plan *</Label>
              <Select
                value={newSubscriber.plan}
                onValueChange={(v) =>
                  setNewSubscriber({
                    ...newSubscriber,
                    plan: v as "monthly" | "quarterly",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly (30 meals)</SelectItem>
                  <SelectItem value="quarterly">Quarterly (90 meals)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSubscriber}>
              <UserPlus className="w-4 h-4 mr-2" />
              Add Subscriber
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
