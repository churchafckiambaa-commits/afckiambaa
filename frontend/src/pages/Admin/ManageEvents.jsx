import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTrash, FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://afckiambaa-as5f.onrender.com/api/events");
      setEvents(res.data || []);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized. Please log in.");
      return;
    }

    try {
      await axios.delete(`https://afckiambaa-as5f.onrender.com/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter((event) => event._id !== id));
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("Failed to delete event.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 text-zinc-900 font-sans antialiased pb-20">
      {/* Navigation */}
      <nav className="border-b border-zinc-400 px-6 py-6 bg-gray-200 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/admin/dashboard" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-red-700 transition-colors">
            <FaArrowLeft /> Dashboard
          </Link>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">Event Records</span>
        </div>
      </nav>

      <main className="container mx-auto px-6 mt-16">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            Manage <br />
            <span className="italic font-serif text-red-800 normal-case tracking-normal">Existing Events</span>
          </h1>
          <p className="mt-4 text-zinc-600 font-medium">Review, monitor, and remove events from the public feed.</p>
        </header>

        {loading ? (
          <div className="py-20 text-center text-xs font-bold uppercase tracking-widest animate-pulse">Loading Archives...</div>
        ) : events.length === 0 ? (
          <div className="py-20 border-2 border-dashed border-zinc-400 text-center">
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">No active events found in the database.</p>
            <Link to="/admin/create-event" className="mt-4 inline-block text-red-700 font-black border-b-2 border-red-700 pb-1">Create One Now</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event, index) => (
              <motion.div 
                key={event._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group flex flex-col md:flex-row items-center gap-8 bg-gray-200 border border-zinc-300 p-6 hover:border-red-700 transition-all duration-500 shadow-sm hover:shadow-xl"
              >
                {/* Event Image */}
                <div className="w-full md:w-40 h-28 flex-shrink-0 overflow-hidden bg-zinc-300">
                  <img
                    src={event.image?.url || "https://via.placeholder.com/150"}
                    alt={event.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>

                {/* Event Details */}
                <div className="flex-grow text-center md:text-left">
                  <span className="text-[9px] font-black text-red-700 uppercase tracking-[0.2em] mb-1 block">
                    {event.location || "General Location"}
                  </span>
                  <h3 className="text-2xl font-black tracking-tight text-zinc-900 uppercase leading-tight mb-2">
                    {event.title || "Untitled Event"}
                  </h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                    <span className="flex items-center gap-2"><FaCalendarAlt className="text-red-800" /> {event.date ? new Date(event.date).toLocaleDateString() : "TBD"}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex-shrink-0 w-full md:w-auto">
                  <button 
                    onClick={() => handleDelete(event._id)}
                    className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-red-800 transition-all shadow-lg"
                  >
                    <FaTrash className="text-[10px]" /> Remove Event
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default ManageEvents;