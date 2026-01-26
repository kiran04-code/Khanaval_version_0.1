import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCurrentUser } from '@/hooks/user-hook';
import { useStateContex } from "@/context/State";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import {
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    QrCode,
    ShieldCheck,
    Loader2,
    Send
} from "lucide-react";

const Pass = () => {
    const { ids } = useParams();
    const navigate = useNavigate();
    const { user } = useCurrentUser();
    const { axioseInstace } = useStateContex();

    // State for request handling
    const [isRequesting, setIsRequesting] = useState(false);
    const [requestSent, setRequestSent] = useState(false);

    // Check subscription (based on your data structure)
    const subscribedMessId = user?.myMess?.messId?.id;
    const isSubscribed = subscribedMessId === ids;

    // Request Handler
    const handleGetPassRequest = async () => {
        if (!user) {
            toast.error("Please login to request a pass");
            return;
        }

        try {
            setIsRequesting(true);
            const { data } = await axioseInstace.post("/api/mess/getpass", {
                messID: ids,
                username: `${user?.first_name} ${user?.last_name}`,
                number: user?.number,
            });

            if (data) {
                toast.success("Request sent successfully!");
                setRequestSent(true);
                navigate("/")
            }
        } catch (error) {
            console.error("Error requesting pass:", error);
            toast.error(error.response?.data?.message || "Failed to send request");
        } finally {
            setIsRequesting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 flex flex-col items-center justify-center font-sans">
            <Card className="w-full max-w-md rounded-[40px] border-none shadow-2xl overflow-hidden bg-white">
                <CardContent className="p-8 text-center">

                    {isSubscribed ? (
                        /* --- CASE 1: USER IS SUBSCRIBED --- */
                        <div className="space-y-6 animate-in fade-in zoom-in duration-500">
                            <div className="w-24 h-24 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto">
                                <ShieldCheck className="w-12 h-12 text-emerald-600" />
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Active Member</h2>
                                <p className="text-slate-500 font-bold text-sm">
                                    Welcome back to <span className="text-emerald-600 font-black">{user?.myMess?.messId?.identity?.name}</span>
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 bg-slate-50 rounded-[24px] p-5 border border-slate-100">
                                <div className="text-left">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Remaining</p>
                                    <span className="text-2xl font-black text-slate-900">{user?.myMess?.RemainingDay} Days</span>
                                </div>
                                <div className="text-left border-l pl-4 border-slate-200">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Plan</p>
                                    <span className="text-2xl font-black text-slate-900">{user?.myMess?.totalDays} Days</span>
                                </div>
                            </div>

                            <Button
                                onClick={() => navigate('/scan-qr')}
                                className="w-full h-16 rounded-[20px] bg-slate-900 hover:bg-black text-white font-black text-lg shadow-xl shadow-slate-200 transition-all active:scale-95 gap-3"
                            >
                                <QrCode className="w-6 h-6" />
                                SCAN QR CODE
                            </Button>
                        </div>
                    ) : (
                        /* --- CASE 2: NOT SUBSCRIBED --- */
                        <div className="space-y-6 animate-in fade-in zoom-in duration-500">
                            <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mx-auto transition-colors duration-500 ${requestSent ? 'bg-emerald-100' : 'bg-orange-100'}`}>
                                {requestSent ? <CheckCircle2 className="w-12 h-12 text-emerald-600" /> : <AlertCircle className="w-12 h-12 text-orange-600" />}
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-2xl font-black text-slate-900">
                                    {requestSent ? "Request Pending" : "No Membership Found"}
                                </h2>
                                <p className="text-slate-500 font-medium px-4">
                                    {requestSent
                                        ? "Your request has been sent to the mess manager. Please wait for approval."
                                        : "You don't have an active subscription for this mess."}
                                </p>
                            </div>

                            <div className="pt-4 space-y-4">
                                {!requestSent ? (
                                    <Button
                                        onClick={handleGetPassRequest}
                                        disabled={isRequesting}
                                        className="w-full h-16 rounded-[20px] bg-orange-500 hover:bg-orange-600 text-white font-black text-lg shadow-lg shadow-orange-100 transition-all active:scale-95 gap-3"
                                    >
                                        {isRequesting ? (
                                            <>
                                                <Loader2 className="w-6 h-6 animate-spin" /> SENDING...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" /> SEND JOIN REQUEST
                                            </>
                                        )}
                                    </Button>
                                ) : (
                                    <Button variant="outline" asChild className="w-full h-14 rounded-2xl border-emerald-200 text-emerald-600 font-bold">
                                        <Link to="/dashboard">Check Other Messes</Link>
                                    </Button>
                                )}

                                <Button variant="ghost" asChild className="text-slate-400 font-bold rounded-xl">
                                    <Link to="/dashboard">Return to Home</Link>
                                </Button>
                            </div>
                        </div>
                    )}

                </CardContent>
            </Card>
        </div>
    );
};

export default Pass;