import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/common/StatsCard";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  IndianRupee,
  Users,
  CreditCard,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type TimeRange = "daily" | "weekly" | "monthly";

const dailyData = [
  { name: "Mon", revenue: 1200, orders: 45 },
  { name: "Tue", revenue: 1800, orders: 62 },
  { name: "Wed", revenue: 1400, orders: 51 },
  { name: "Thu", revenue: 2200, orders: 78 },
  { name: "Fri", revenue: 1900, orders: 67 },
  { name: "Sat", revenue: 2800, orders: 95 },
  { name: "Sun", revenue: 2400, orders: 82 },
];

const weeklyData = [
  { name: "Week 1", revenue: 12000, orders: 420 },
  { name: "Week 2", revenue: 15000, orders: 510 },
  { name: "Week 3", revenue: 13500, orders: 465 },
  { name: "Week 4", revenue: 18000, orders: 605 },
];

const monthlyData = [
  { name: "Jan", revenue: 42000, orders: 1450 },
  { name: "Feb", revenue: 38000, orders: 1320 },
  { name: "Mar", revenue: 45000, orders: 1580 },
  { name: "Apr", revenue: 52000, orders: 1780 },
  { name: "May", revenue: 48000, orders: 1650 },
  { name: "Jun", revenue: 55000, orders: 1890 },
];

const paymentMethods = [
  { name: "UPI", value: 65, color: "hsl(var(--primary))" },
  { name: "Card", value: 20, color: "hsl(var(--accent))" },
  { name: "Cash", value: 15, color: "hsl(var(--muted-foreground))" },
];

const recentTransactions = [
  { id: 1, customer: "Rahul Sharma", amount: 3000, type: "subscription", date: "Today" },
  { id: 2, customer: "Priya Patel", amount: 150, type: "meal", date: "Today" },
  { id: 3, customer: "Amit Kumar", amount: 3000, type: "subscription", date: "Yesterday" },
  { id: 4, customer: "Neha Singh", amount: 150, type: "meal", date: "Yesterday" },
  { id: 5, customer: "Vikram Rao", amount: 3000, type: "subscription", date: "2 days ago" },
];

export default function EarningsDashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>("daily");

  const getData = () => {
    switch (timeRange) {
      case "daily":
        return dailyData;
      case "weekly":
        return weeklyData;
      case "monthly":
        return monthlyData;
      default:
        return dailyData;
    }
  };

  const stats = [
    {
      icon: <Wallet className="w-5 h-5" />,
      value: "₹45,000",
      label: "This Month",
      trend: { value: 12, isPositive: true },
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      value: "₹1,500",
      label: "Today's Earnings",
      trend: { value: 8, isPositive: true },
    },
    {
      icon: <Users className="w-5 h-5" />,
      value: "156",
      label: "Active Subscribers",
      trend: { value: 5, isPositive: true },
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      value: "₹3,000",
      label: "Avg. Subscription",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatsCard key={i} {...stat} />
        ))}
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        {(["daily", "weekly", "monthly"] as TimeRange[]).map((range) => (
          <Button
            key={range}
            variant={timeRange === range ? "default" : "soft"}
            size="sm"
            onClick={() => setTimeRange(range)}
            className="capitalize"
          >
            {range}
          </Button>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card variant="elevated" className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-foreground">Revenue Trend</h3>
                <p className="text-sm text-muted-foreground capitalize">{timeRange} overview</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="flex items-center gap-1 text-accent">
                  <ArrowUpRight className="w-4 h-4" />
                  +12.5%
                </span>
                <span className="text-muted-foreground">vs last period</span>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getData()}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    tickFormatter={(value) => `₹${value >= 1000 ? `${value / 1000}k` : value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, "Revenue"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card variant="elevated">
          <CardContent className="p-6">
            <h3 className="font-bold text-foreground mb-6">Payment Methods</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethods}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {paymentMethods.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value}%`, "Share"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {paymentMethods.map((method) => (
                <div key={method.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: method.color }}
                    />
                    <span className="text-sm text-foreground">{method.name}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{method.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Chart */}
      <Card variant="elevated">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-foreground">Orders Overview</h3>
              <p className="text-sm text-muted-foreground capitalize">{timeRange} order count</p>
            </div>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="name"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [value, "Orders"]}
                />
                <Bar dataKey="orders" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card variant="elevated">
        <CardContent className="p-6">
          <h3 className="font-bold text-foreground mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === "subscription"
                        ? "bg-primary/10 text-primary"
                        : "bg-accent/10 text-accent"
                    }`}
                  >
                    {transaction.type === "subscription" ? (
                      <Users className="w-5 h-5" />
                    ) : (
                      <IndianRupee className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{transaction.customer}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {transaction.type} • {transaction.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-accent font-medium">
                  <ArrowUpRight className="w-4 h-4" />
                  ₹{transaction.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
