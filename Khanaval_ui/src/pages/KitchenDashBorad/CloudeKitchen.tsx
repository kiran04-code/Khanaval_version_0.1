import React from "react";
import {
    LayoutDashboard,
    ShoppingBag,
    UtensilsCrossed,
    MessageSquare,
    User,
    Phone,
    Plus,
    Bell,
    LogOut,
} from "lucide-react";

import { KitchenProviderdata } from "@/hooks/Provider";
import { Link } from "react-router-dom";

const CloudeKitchen = () => {
    const { kitchenprovider } = KitchenProviderdata();

    return (
        <div className="min-h-screen bg-slate-100 flex">
            {/* Sidebar */}
            <aside className="w-72 bg-white shadow-lg border-r hidden md:flex flex-col">
                <div className="p-6 border-b">
                    <Link to="/" className="md:w-[200px] w-[185px] md:h-fit">
                        <img src="/logo.png" alt="logo" className="w-full h-auto" />
                    </Link>
                    <p className="text-sm text-slate-500">
                        Kitchen Dashboard
                    </p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-orange-50 text-orange-600 font-semibold">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </button>

                    <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-slate-100">
                        <ShoppingBag size={20} />
                        Orders
                    </button>

                    <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-slate-100">
                        <UtensilsCrossed size={20} />
                        Menu Items
                    </button>

                    <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-slate-100">
                        <MessageSquare size={20} />
                        Messages
                    </button>

                    <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-slate-100">
                        <Bell size={20} />
                        Notifications
                    </button>
                </nav>

                <div className="p-4 border-t">
                    <button className="flex items-center gap-3 text-red-500 font-medium">
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Welcome 👋
                        </h1>
                        <p className="text-slate-500">
                            Manage your kitchen efficiently
                        </p>
                    </div>

                    <button className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 font-semibold">
                        <Plus size={18} />
                        Add Menu Item
                    </button>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-3xl shadow-md p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-5 items-center">
                        <div className="h-20 w-20 rounded-full bg-orange-100 flex items-center justify-center">
                            <User className="text-orange-600" size={40} />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold">
                                {kitchenprovider?.providerName}
                            </h2>

                            <div className="flex items-center gap-2 text-slate-500 mt-1">
                                <Phone size={16} />
                                {kitchenprovider?.phoneNumber}
                            </div>

                            <span className="inline-block mt-3 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                                {kitchenprovider?.role}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-5 mb-8">

                    <div className="bg-white rounded-3xl p-6 shadow-md">
                        <h3 className="text-slate-500">Today's Orders</h3>
                        <p className="text-4xl font-bold mt-2">25</p>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-md">
                        <h3 className="text-slate-500">Pending</h3>
                        <p className="text-4xl font-bold mt-2 text-yellow-500">
                            8
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-md">
                        <h3 className="text-slate-500">Completed</h3>
                        <p className="text-4xl font-bold mt-2 text-green-500">
                            17
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-md">
                        <h3 className="text-slate-500">Revenue</h3>
                        <p className="text-4xl font-bold mt-2 text-orange-600">
                            ₹5,600
                        </p>
                    </div>

                </div>

                {/* Orders + Messages */}
                <div className="grid lg:grid-cols-2 gap-6">

                    {/* Orders */}
                    <div className="bg-white rounded-3xl p-6 shadow-md">
                        <div className="flex justify-between mb-5">
                            <h2 className="font-bold text-xl">
                                Recent Orders
                            </h2>
                        </div>

                        <div className="space-y-4">

                            <div className="border rounded-xl p-4">
                                <h3 className="font-semibold">
                                    Chicken Biryani × 2
                                </h3>
                                <p className="text-sm text-slate-500">
                                    Order #12345
                                </p>
                            </div>

                            <div className="border rounded-xl p-4">
                                <h3 className="font-semibold">
                                    Veg Thali × 1
                                </h3>
                                <p className="text-sm text-slate-500">
                                    Order #12346
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Messages */}
                    <div className="bg-white rounded-3xl p-6 shadow-md">
                        <h2 className="font-bold text-xl mb-5">
                            Customer Messages
                        </h2>

                        <div className="space-y-4">

                            <div className="border rounded-xl p-4">
                                <h3 className="font-semibold">
                                    Rahul Sharma
                                </h3>
                                <p className="text-slate-500 text-sm">
                                    Is today's special available?
                                </p>
                            </div>

                            <div className="border rounded-xl p-4">
                                <h3 className="font-semibold">
                                    Priya Patil
                                </h3>
                                <p className="text-slate-500 text-sm">
                                    Please reduce spice level.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default CloudeKitchen;