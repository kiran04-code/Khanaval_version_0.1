import React from 'react';
import { Bell, Utensils, ShieldCheck, MapPin, ArrowRight, Sparkles, Clock } from 'lucide-react';

const Announcements = () => {
  const announcements = [
    {
      id: 1,
      icon: <Utensils className="w-5 h-5 text-orange-600" />,
      tag: "Live Menu",
      title: "Today's Special Menu Updated",
      description: "Shriram Bhojnalay & 8 others just updated their lunch menu. Paneer Masala & Special Puran Poli available today!",
      date: "Updated 2 mins ago",
      btnText: "Check Menu",
      isLive: true,
      highlight: false
    },
    {
      id: 2,
      icon: <Sparkles className="w-5 h-5 text-orange-500" />,
      tag: "Network Update",
      title: "12 New Verified Messes Near You",
      description: "We've expanded our reach! Discover 12 high-quality, hygiene-certified mess services now open within 0.15 km.",
      date: "Available Now",
      btnText: "Explore Map",
      isLive: false,
      highlight: true
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 bg-white font-sans">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div className="max-w-xl">
          <div className="inline-flex items-center px-3 py-1 rounded-lg bg-orange-100 mb-4">
            <span className="text-orange-600 font-black text-[10px] uppercase tracking-wider">India's Trusted Mess Discovery</span>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Latest Updates & <br />
            <span className="text-orange-500">Daily Highlights</span>
          </h2>
        </div>
        <p className="text-gray-500 text-sm md:max-w-xs leading-relaxed">
          Stay informed about the best homestyle food, daily menus, and safety standards in your neighborhood.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {announcements.map((item) => (
          <div 
            key={item.id} 
            className={`relative flex flex-col rounded-[2.5rem] p-8 transition-all duration-300 border-2 ${
              item.highlight 
              ? 'border-dashed border-orange-400 bg-orange-50/20' 
              : 'border-gray-100 bg-white hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-100'
            }`}
          >
            {/* Live Indicator or Icon */}
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-50">
                {item.icon}
              </div>
              {item.isLive && (
                <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-[10px] font-bold text-green-700 uppercase">Live</span>
                </div>
              )}
            </div>

            <div className="flex-grow">
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-2 block">
                {item.tag}
              </span>
              <h3 className="text-xl font-black text-gray-900 mb-3 leading-tight">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {item.description}
              </p>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
              <div className="flex items-center text-[11px] font-bold text-gray-400">
                <Clock className="w-3 h-3 mr-1" />
                {item.date}
              </div>
              <button className="flex items-center text-xs font-black text-gray-900 hover:text-orange-500 transition-colors">
                {item.btnText} <ArrowRight className="ml-1 w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Announcements;