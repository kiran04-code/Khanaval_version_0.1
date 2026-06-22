import type { DashboardSection, QuickActionItem } from "@/components/cloud-kitchen/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type QuickActionsProps = {
    actions: QuickActionItem[];
    onActionClick: (target: DashboardSection) => void;
};

export function QuickActions({ actions, onActionClick }: QuickActionsProps) {
    return (
        <Card className="rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
            <CardHeader>
                <CardTitle className="text-2xl font-black text-slate-950">
                    Quick Actions
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {actions.map((action) => {
                    const Icon = action.icon;

                    return (
                        <button
                            key={action.id}
                            className="flex min-h-[112px] flex-col items-start justify-between rounded-[28px] border border-slate-200 bg-slate-50/80 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:bg-white hover:shadow-lg"
                            onClick={() => onActionClick(action.target)}
                        >
                            <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 p-3 text-white shadow-lg shadow-orange-200">
                                <Icon className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-base font-bold text-slate-950">{action.label}</p>
                                <p className="mt-1 text-sm text-slate-500">{action.helper}</p>
                            </div>
                        </button>
                    );
                })}
            </CardContent>
        </Card>
    );
}
