import { Star } from "lucide-react";

import type { ReviewItem } from "@/components/cloud-kitchen/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ReviewsSectionProps = {
    reviews: ReviewItem[];
};

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
    return (
        <Card className="rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
            <CardHeader>
                <CardTitle className="text-2xl font-black text-slate-950">
                    Recent Reviews
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 lg:grid-cols-3">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="rounded-[26px] border border-slate-200 bg-slate-50/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h3 className="text-base font-bold text-slate-950">
                                    {review.customer}
                                </h3>
                                <div className="mt-2 flex items-center gap-1 text-amber-500">
                                    {Array.from({ length: review.rating }).map((_, index) => (
                                        <Star key={index} className="h-4 w-4 fill-current" />
                                    ))}
                                </div>
                            </div>
                            <div className="rounded-2xl bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                                {review.rating}.0
                            </div>
                        </div>
                        <p className="mt-4 text-sm leading-6 text-slate-600">
                            {review.comment}
                        </p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
