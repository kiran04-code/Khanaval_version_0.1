import type { KitchenOrder, OrderStatus } from "@/components/cloud-kitchen/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type OrdersTableProps = {
    orders: KitchenOrder[];
};

const statusTone: Record<OrderStatus, string> = {
    pending: "bg-orange-100 text-orange-700",
    preparing: "bg-sky-100 text-sky-700",
    delivered: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-rose-100 text-rose-700",
};

export function OrdersTable({ orders }: OrdersTableProps) {
    return (
        <Card className="rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
            <CardHeader>
                <CardTitle className="text-2xl font-black text-slate-950">
                    Recent Orders
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="hidden overflow-hidden rounded-[24px] border border-slate-200 md:block">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50">
                            <tr className="text-sm font-semibold text-slate-500">
                                <th className="px-5 py-4">Order ID</th>
                                <th className="px-5 py-4">Customer</th>
                                <th className="px-5 py-4">Amount</th>
                                <th className="px-5 py-4">Status</th>
                                <th className="px-5 py-4">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-t border-slate-200 text-sm text-slate-700"
                                >
                                    <td className="px-5 py-4 font-semibold text-slate-950">{order.id}</td>
                                    <td className="px-5 py-4">{order.customer}</td>
                                    <td className="px-5 py-4 font-semibold">{order.amount}</td>
                                    <td className="px-5 py-4">
                                        <span
                                            className={cn(
                                                "rounded-full px-3 py-1 text-xs font-semibold",
                                                statusTone[order.status],
                                            )}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">{order.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="grid gap-3 md:hidden">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-4"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-sm font-semibold text-slate-950">{order.id}</p>
                                    <p className="mt-1 text-sm text-slate-600">{order.customer}</p>
                                </div>
                                <span
                                    className={cn(
                                        "rounded-full px-3 py-1 text-xs font-semibold",
                                        statusTone[order.status],
                                    )}
                                >
                                    {order.status}
                                </span>
                            </div>
                            <div className="mt-4 flex items-center justify-between text-sm">
                                <span className="font-semibold text-slate-900">{order.amount}</span>
                                <span className="text-slate-500">{order.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
