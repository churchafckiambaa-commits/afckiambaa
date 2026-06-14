import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://afckiambaa-as5f.onrender.com/api/events");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(data || []);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Unable to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-amber-400 flex items-center justify-center">
      <div className="text-xs font-black uppercase tracking-[0.5em] text-blue-900 animate-pulse">Gathering Moments...</div>
    </div>
  );

  return (
    <div className="bg-gray-200 min-h-screen font-sans antialiased text-blue-950 pb-32">
      
      {/* --- HERO HEADER --- */}
      <section className="py-24 px-6 border-b border-zinc-300 bg-amber-400">
        <div className="container mx-auto">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-black text-red-700 uppercase tracking-[0.4em] block mb-4"
          >
            Calendar of Grace
          </motion.span>
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none text-blue-950">
              Upcoming <br />
              <span className="italic font-serif text-red-800 normal-case tracking-normal">Events</span>
            </h1>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-800/60 mb-2">
              {new Date().toLocaleString("default", { month: "long", year: "numeric" })}
            </p>
          </div>
        </div>
      </section>

      {/* --- EVENTS LIST --- */}
      <section className="container mx-auto px-6 mt-20">
        {events.length > 0 ? (
          <div className="grid gap-32">
            {events.map((event, index) => {
              const date = new Date(event.date);
              const day = date.getDate().toString().padStart(2, "0");
              const month = date.toLocaleString("default", { month: "short" }).toUpperCase();
              const year = date.getFullYear();

              return (
                <motion.div 
                  key={event._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group grid lg:grid-cols-12 gap-12 items-start"
                >
                  {/* Date Column - Deep Blue Text */}
                  <div className="lg:col-span-1 flex flex-row lg:flex-col items-center justify-center border-l-4 border-red-700 pl-4 py-2">
                    <span className="text-5xl font-black tracking-tighter text-blue-950">{day}</span>
                    <span className="text-[10px] font-bold text-red-700 uppercase tracking-widest rotate-0 lg:-rotate-90 lg:mt-10 origin-center whitespace-nowrap">
                      {month} • {year}
                    </span>
                  </div>

                  {/* Image Column */}
                  <div className="lg:col-span-5 relative overflow-hidden bg-blue-900 shadow-2xl">
                    <img
                      src={event.image?.url || "/placeholder.png"}
                      alt={event.title}
                      className="w-full h-[450px] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-blue-950/20 group-hover:bg-transparent transition-colors" />
                  </div>

                  {/* Details Column - Deep Blue Accents */}
                  <div className="lg:col-span-6 flex flex-col justify-center h-full">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-blue-950 mb-6 group-hover:text-red-800 transition-colors">
                      {event.title}
                    </h2>
                    <p className="text-blue-900/80 text-lg leading-relaxed font-medium mb-10 max-w-xl">
                      {event.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-8 border-t border-zinc-300 pt-8">
                      <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-red-700 text-lg" />
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-950">
                          {event.location || "Main Sanctuary"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaCalendarAlt className="text-red-700 text-lg" />
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-950">
                          {date.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="py-40 text-center border-2 border-dashed border-zinc-400">
            <p className="text-blue-900/40 font-bold uppercase tracking-[0.3em] text-xs">No Scheduled Events</p>
          </div>
        )}
      </section>
    </div>
  );
}