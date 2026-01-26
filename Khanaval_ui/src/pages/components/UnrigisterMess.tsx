import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    QrCode, Utensils, Wallet,
    ArrowRight, Store, Users,
    CheckCircle2, PhoneCall, HelpCircle,
    Languages, CalendarCheck
} from "lucide-react";

export default function MobileUnregisteredState() {
    const navigate = useNavigate();
    const [lang, setLang] = useState<"en" | "hi">("en");

    const content = {
        en: {
            title: "Run Your Mess From Your Mobile",
            sub: "Smart tools for the modern mess owner",
            btn: "Setup My Mess Now",
            help: "Confused? Get Help",
            call: "CALL",
            support: "Contact our support team",
            benefits: [
                {
                    icon: CalendarCheck,
                    title: "Subscription Requests",
                    desc: "Approve or reject new monthly students from your phone.",
                    color: "text-purple-600", bg: "bg-purple-50"
                },
                {
                    icon: Utensils,
                    title: "Daily Menu",
                    desc: "Update food items once. All students see it instantly.",
                    color: "text-orange-600", bg: "bg-orange-50"
                },
                {
                    icon: QrCode,
                    title: "Quick Attendance",
                    desc: "Students scan QR code to eat. No more paper registers.",
                    color: "text-blue-600", bg: "bg-blue-50"
                },
                {
                    icon: Wallet,
                    title: "Track Money",
                    desc: "See cash and online payments collected today clearly.",
                    color: "text-emerald-600", bg: "bg-emerald-50"
                },
            ]
        },
        hi: {
            title: "अपना मेस मोबाइल से चलाएं",
            sub: "आधुनिक मेस मालिकों के लिए स्मार्ट टूल",
            btn: "अभी मेस सेटअप करें",
            help: "मदद चाहिए?",
            call: "कॉल करें",
            support: "हमारी टीम से बात करें",
            benefits: [
                {
                    icon: CalendarCheck,
                    title: "नए छात्रों की रिक्वेस्ट",
                    desc: "नए छात्रों की मंथली रिक्वेस्ट को एक्सेप्ट या रिजेक्ट करें।",
                    color: "text-purple-600", bg: "bg-purple-50"
                },
                {
                    icon: Utensils,
                    title: "डेली मेनू (खाना)",
                    desc: "आज का खाना अपडेट करें। सभी छात्र अपने फोन पर देख पाएंगे।",
                    color: "text-orange-600", bg: "bg-orange-50"
                },
                {
                    icon: QrCode,
                    title: "डिजिटल हाजिरी",
                    desc: "छात्र QR कोड स्कैन करके खाना खाएंगे। रजिस्टर की जरूरत नहीं।",
                    color: "text-blue-600", bg: "bg-blue-50"
                },
                {
                    icon: Wallet,
                    title: "कमाई का हिसाब",
                    desc: "आज कितना कैश और ऑनलाइन पैसा आया, सब मोबाइल पर देखें।",
                    color: "text-emerald-600", bg: "bg-emerald-50"
                },
            ]
        }
    };

    const t = content[lang];

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <div className="absolute top-4 right-4 z-20">
                <button
                    onClick={() => setLang(lang === "en" ? "hi" : "en")}
                    className="flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/40 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm active:scale-90 transition-transform"
                >
                    <Languages className="w-4 h-4" />
                    {lang === "en" ? "हिन्दी में देखें" : "See in English"}
                </button>
            </div>
            <div className="bg-orange-600 px-6 py-12 rounded-b-[2.5rem] text-white shadow-lg relative overflow-hidden">
                <Utensils className="absolute -right-6 -bottom-6 w-32 h-32 text-orange-500/30 rotate-12" />

                <div className="relative z-10 flex flex-col items-center">
                    <div className="bg-white p-3 rounded-2xl shadow-md mb-4">
                        <Store className="w-8 h-8 text-orange-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-center leading-tight">
                        {t.title}
                    </h1>
                    <p className="text-orange-100 text-center mt-2 text-xs font-medium">
                        {t.sub}
                    </p>
                </div>
            </div>

            <div className="flex-1 px-5 py-8">
                <div className="space-y-4">
                    {t.benefits.map((item, i) => (
                        <div key={i} className="flex gap-4 items-center p-4 border border-slate-100 bg-slate-50/30 rounded-2xl shadow-sm">
                            <div className={`${item.bg} ${item.color} p-3 rounded-xl shrink-0`}>
                                <item.icon className="w-6 h-6" />
                            </div>
                            <div className="space-y-0.5">
                                <h3 className="text-[15px] font-bold text-slate-900 leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-slate-500 font-medium leading-normal">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                    
                <div className="mt-10 mb-6">
                    <Button
                        onClick={() => navigate("/provider/messsResgiter")}
                        className="w-full h-16 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-lg font-bold shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
                    >
                        {t.btn}
                        <ArrowRight className="w-5 h-5" />
                    </Button>

                    <div className="flex items-center justify-center gap-4 mt-4 opacity-50">
                        <div className="flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-[10px] font-bold text-slate-600">100% Safe</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-[10px] font-bold text-slate-600">Easy Setup</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Support Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 sticky bottom-0">
                <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="bg-orange-100 p-2 rounded-full">
                            <HelpCircle className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-slate-900">{t.help}</p>
                            <p className="text-[10px] text-slate-500">{t.support}</p>
                        </div>
                    </div>
                    <a
                        href="tel:+918788113738"
                        className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 border border-emerald-100 active:scale-95"
                    >
                        <PhoneCall className="w-3.5 h-3.5" />
                        {t.call}
                    </a>
                </div>
            </div>
        </div>
    );
}