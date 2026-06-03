import React, { useState } from "react";
import { FaBuilding, FaUsers, FaMobileAlt, FaUniversity, FaHandsHelping, FaSpinner } from "react-icons/fa";

// Assets
import prayerCenter1 from "../assets/pic20.jpeg";
import prayerCenter2 from "../assets/pic19.jpeg";
import prayerCenter3 from "../assets/pic18.jpeg";
import prayerCenter4 from "../assets/pic10.jpeg";

export default function Project() {
  const images = [prayerCenter1, prayerCenter2, prayerCenter3, prayerCenter4];
  
  // Form State
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    amount: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // REPLACE THIS URL with your Google Apps Script Web App URL
      const SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_URL";
      
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Required for Google Scripts
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      setStatus("success");
      setFormData({ name: "", phone: "", amount: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Error!", error);
      setStatus("error");
    }
  };

  return (
    <div className="bg-gray-200 text-black font-sans selection:bg-amber-100">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute right-0 top-0 w-full lg:w-2/3 h-full overflow-hidden">
          <img 
            src={prayerCenter1} 
            alt="Background" 
            className="w-full h-full object-cover transition-all duration-1000" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent"></div>
        </div>

        <div className="relative z-10 px-6 md:px-20 max-w-7xl mx-auto w-full">
          <span className="text-red-600 uppercase tracking-[0.6em] text-xs font-black mb-6 block">
            Kingdom Expansion
          </span>
          <h1 className="text-6xl md:text-9xl font-black text-black uppercase tracking-tighter leading-[0.85] mb-8">
            THE <span className="text-amber-600">KIAMBAA</span> <br /> 
            <span className="text-blue-600 italic">PRAYER</span> CENTER
          </h1>
          <p className="max-w-md text-zinc-900 text-lg font-light leading-relaxed border-l-4 border-amber-500 pl-6">
            Building a lasting place of prayer, renewal, and spiritual growth for generations to come. 
            A sanctuary rising in the heart of Kiambu.
          </p>
        </div>
      </section>

      {/* 2. GALLERY / PROGRESS */}
      <section className="py-32 px-6 bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h3 className="text-5xl font-black uppercase tracking-tighter">Current Progress</h3>
              <p className="text-amber-500 font-mono tracking-widest text-sm mt-2 uppercase">Est. Completion 2026</p>
            </div>
            <div className="h-px bg-zinc-700 flex-grow mx-10 hidden md:block mb-4"></div>
            <p className="text-red-500 uppercase text-xs tracking-widest font-black">Architecture • Faith • Legacy</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <div key={idx} className="group relative overflow-hidden bg-black aspect-[4/5]">
                <img
                  src={img}
                  alt={`Progress ${idx + 1}`}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600/40 backdrop-blur-sm cursor-pointer">
                  <span className="border-2 border-white px-6 py-2 text-[10px] font-black uppercase tracking-widest">
                    View Detail
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT THE VISION */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-xs font-black tracking-[0.4em] text-red-600 uppercase mb-8 flex items-center gap-4">
              <span className="w-12 h-1 bg-red-600"></span> The Vision
            </h3>
            <p className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-12">
              A dedicated sanctuary for <span className="text-blue-600">fasting, reflection</span> and divine encounter.
            </p>

            <div className="grid sm:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-zinc-100 flex items-center justify-center text-amber-600 text-xl">
                  <FaUsers />
                </div>
                <h5 className="font-black uppercase tracking-widest text-sm">Leadership Hub</h5>
                <p className="text-zinc-900 text-sm leading-relaxed">Equipping the next generation of ministry leaders through specialized training environments.</p>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 bg-zinc-100 flex items-center justify-center text-blue-600 text-xl">
                  <FaBuilding />
                </div>
                <h5 className="font-black uppercase tracking-widest text-sm">Conference Space</h5>
                <p className="text-zinc-900 text-sm leading-relaxed">Hosting Youth & Women regional conventions in a state-of-the-art facility.</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/10 -z-10 rounded-full blur-3xl"></div>
            <img
              src={prayerCenter1}
              alt="Vision"
              className="w-full h-[600px] object-cover shadow-2xl"
            />
            <div className="absolute bottom-0 right-0 bg-gray-200 p-8">
              <p className="text-[10px] font-extrabold tracking-[0.3em] uppercase text-amber-600 mb-2">Investment Status</p>
              <p className="text-2xl font-black text-red-600 italic">100% Kingdom Focused</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SUPPORT SECTION */}
      <section className="bg-zinc-50 py-32 px-6">
        <div className="max-w-5xl mx-auto text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">How to <span className="text-blue-600">Support</span></h2>
          <p className="text-zinc-500 font-light tracking-widest uppercase text-sm">Your contribution brings us closer to completion</p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-blue-600 p-12 border-t-4 border-red-600 shadow-xl hover:shadow-2xl transition-all group text-white">
            <FaUniversity className="text-4xl text-zinc-200 mb-8 group-hover:text-amber-400 transition-colors" />
            <h4 className="text-2xl font-black uppercase tracking-tight mb-8">Bank Transfer</h4>
            <div className="space-y-4 font-mono text-sm">
              <div className="flex justify-between border-b border-white/20 pb-2">
                <span>BANK</span>
                <span className="font-black">EQUITY BANK</span>
              </div>
              <div className="flex justify-between border-b border-white/20 pb-2">
                <span>ACCOUNT</span>
                <span className="font-black underline decoration-amber-500">0570 1809 21337</span>
              </div>
              <div className="flex justify-between">
                <span>BRANCH</span>
                <span className="font-black">KIKUYU TOWN</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-500 p-12 border-t-4 border-blue-600 shadow-xl hover:shadow-2xl transition-all group">
            <FaMobileAlt className="text-4xl text-zinc-200 mb-8 group-hover:text-blue-600 transition-colors" />
            <h4 className="text-2xl font-black uppercase tracking-tight mb-8">M-Pesa Giving</h4>
            <div className="space-y-4 text-zinc-900 font-mono text-sm">
              <div className="flex justify-between border-b border-zinc-100 pb-2">
                <span>PAYBILL</span>
                <span className="font-black">247247</span>
              </div>
              <div className="flex justify-between border-b border-zinc-100 pb-2">
                <span>ACCOUNT</span>
                <span className="font-black underline decoration-blue-600">733227</span>
              </div>
              <div className="flex justify-between">
                <span>NAME</span>
                <span className="font-black uppercase">AFC - DVPT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PLEDGE FORM SECTION */}
      <section className="bg-white py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <div className="sticky top-10">
                <FaHandsHelping className="text-5xl text-red-600 mb-6" />
                <h2 className="text-4xl font-black uppercase tracking-tighter leading-none mb-6">Make a <br/> <span className="text-amber-600">Pledge</span></h2>
                <p className="text-sm text-zinc-500 uppercase tracking-widest leading-loose">
                  Commit to a legacy. Your pledge helps us plan and build with confidence.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="relative border-b-2 border-zinc-200 focus-within:border-blue-600 transition-colors py-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Enter your name"
                    className="w-full bg-transparent border-none focus:ring-0 font-bold text-xl uppercase placeholder:text-zinc-300"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative border-b-2 border-zinc-200 focus-within:border-blue-600 transition-colors py-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="0700 000 000"
                      className="w-full bg-transparent border-none focus:ring-0 font-bold text-xl uppercase placeholder:text-zinc-300"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="relative border-b-2 border-zinc-200 focus-within:border-blue-600 transition-colors py-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Pledge Amount (KES)</label>
                    <input 
                      required
                      type="number" 
                      placeholder="5,000"
                      className="w-full bg-transparent border-none focus:ring-0 font-bold text-xl uppercase placeholder:text-zinc-300"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  disabled={status === "loading"}
                  className={`w-full py-6 font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 ${
                    status === "success" ? "bg-green-600 text-white" : "bg-black text-white hover:bg-blue-600"
                  }`}
                >
                  {status === "loading" && <FaSpinner className="animate-spin" />}
                  {status === "idle" && "Submit Pledge"}
                  {status === "loading" && "Processing..."}
                  {status === "success" && "Pledge Received"}
                  {status === "error" && "Try Again"}
                </button>

                {status === "success" && (
                  <p className="text-center text-green-600 font-bold text-xs uppercase tracking-widest animate-bounce">
                    Thank you for partnering with us!
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-900 text-zinc-500 py-12 px-6 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-col md:row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.5em]">The Kiambaa Prayer Center © 2026</p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
            <span className="text-amber-500 hover:text-white cursor-pointer">Privacy</span>
            <span className="text-amber-500 hover:text-white cursor-pointer">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}