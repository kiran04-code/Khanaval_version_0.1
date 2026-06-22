import type { DashboardStat } from "@/components/cloud-kitchen/types";
import { Card, CardContent } from "@/components/ui/card";

type DashboardStatsProps = {
    stats: DashboardStat[];
};

export function DashboardStats({ stats }: DashboardStatsProps) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <Card
                        key={stat.id}
                        className="rounded-[28px] border border-slate-200/80 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.1)]"
                    >
                        <CardContent className="p-5">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                    <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                                        {stat.value}
                                    </p>
                                </div>
                                <div className={`rounded-2xl bg-gradient-to-br p-3 ${stat.accentClassName}`}>
                                    <Icon className="h-5 w-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
