import React, { useState } from 'react';
import { Send, Smile, Meh, Frown, CheckCircle2, ArrowRight } from "lucide-react";
import { useStateContex } from '@/context/State';

const FeedbackForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    rating: 0,
    fullName: '',
    email: '',
    topic: 'General Feedback',
    message: ''
  });
 const {axioseInstace} = useStateContex()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const setRating = (val) => setFormData(prev => ({ ...prev, rating: val }));

  const handleSubmit = async(e) => {
    e.preventDefault();
    const  {data} = await axioseInstace.post("/api/getFeedBack",{
          formData
    })
    if(data.success){
        setSubmitted(true);
    }else{
        alert(`${data.message}`)
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-white">
        <div className="relative mb-8">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse"></div>
            <div className="relative w-20 h-20 md:w-32 md:h-32 bg-slate-950 text-white rounded-3xl flex items-center justify-center rotate-6">
                <CheckCircle2 size={40} className="md:w-12 md:h-12" />
            </div>
        </div>
        <h2 className="text-4xl md:text-8xl font-black tracking-tighter mb-4 text-slate-900 leading-none">SENT.</h2>
        <p className="text-slate-500 font-medium max-w-sm mx-auto">Thanks for helping us improve Khanaval.</p>
        <button onClick={() => setSubmitted(false)} className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
          Go Back <ArrowRight size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col lg:flex-row">
      
      {/* Sidebar/Header - Responsive height */}
      <section className="w-full lg:w-[40%] bg-slate-950 p-8 md:p-16 lg:p-20 text-white relative flex flex-col justify-center lg:sticky lg:top-0 lg:max-h-screen">
        <div className="relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4">Feedback</p>
          <h1 className="text-5xl md:text-6xl lg:text-[6vw] font-black leading-[0.9] tracking-tighter mb-6">
            TELL US<br className="hidden lg:block" /> EVERYTHING<span className="text-primary">.</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xs font-medium">
            Your insights drive our roadmap. Share your thoughts with the team.
          </p>
        </div>
      </section>

      {/* Form Area - Responsive Padding */}
      <section className="w-full lg:w-[60%] p-6 md:p-16 lg:p-24">
        <div className="max-w-xl mx-auto lg:mx-0">
          <form onSubmit={handleSubmit} className="space-y-10 md:space-y-16">
            
            {/* Experience Rating - Responsive Grid */}
            <div className="space-y-6">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Experience</label>
              <div className="grid grid-cols-3 gap-3 md:gap-6">
                <RatingButton icon={<Frown />} label="Poor" active={formData.rating === 1} onClick={() => setRating(1)} />
                <RatingButton icon={<Meh />} label="Good" active={formData.rating === 2} onClick={() => setRating(2)} />
                <RatingButton icon={<Smile />} label="Perfect" active={formData.rating === 3} onClick={() => setRating(3)} />
              </div>
            </div>

            {/* Inputs - Responsive Stack */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <ModernInput label="Name" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="John Doe" />
              <ModernInput label="Email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" type="email" />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Topic</label>
              <select 
                name="topic" value={formData.topic} onChange={handleInputChange}
                className="w-full bg-transparent border-b border-slate-200 py-3 text-lg font-bold outline-none focus:border-primary transition-all"
              >
                <option>General Feedback</option>
                <option>Technical Bug</option>
              </select>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Message</label>
              <textarea 
                name="message" value={formData.message} onChange={handleInputChange} rows="3" 
                placeholder="What can we do better?"
                className="w-full bg-slate-50 rounded-2xl p-6 text-lg font-medium outline-none focus:bg-white focus:ring-1 focus:ring-slate-100 transition-all resize-none"
              />
            </div>

            <button 
              type="submit"
              disabled={!formData.rating || !formData.fullName}
              className="w-full md:w-auto flex items-center justify-between gap-8 px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs tracking-widest hover:bg-primary disabled:opacity-20 transition-all"
            >
              SEND FEEDBACK <Send size={16} />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

// Simplified Rating Button for responsiveness
const RatingButton = ({ icon, label, active, onClick }) => (
  <button
    type="button" onClick={onClick}
    className={`flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl border-2 transition-all gap-2 ${
      active ? 'bg-primary border-primary text-white shadow-lg' : 'bg-white border-slate-100 text-slate-300 hover:border-slate-200'
    }`}
  >
    {React.cloneElement(icon, { size: 24, strokeWidth: 2 })}
    <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

const ModernInput = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{label}</label>
    <input 
      {...props}
      className="w-full bg-transparent border-b border-slate-200 py-2 text-lg font-bold outline-none focus:border-primary transition-all"
    />
  </div>
);

export default FeedbackForm;