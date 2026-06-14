import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCloudUploadAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function CreateEvent() {
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventData.title || !eventData.date || !eventData.location || !eventData.description || !image) {
      setMessage("Please fill in all fields and select an image.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Unauthorized. Please log in first.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const formData = new FormData();
      formData.append("title", eventData.title);
      formData.append("date", eventData.date);
      formData.append("location", eventData.location);
      formData.append("description", eventData.description);
      formData.append("image", image);

      await axios.post("https://afckiambaa-as5f.onrender.com/api/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Event created successfully!");
      setEventData({ title: "", date: "", location: "", description: "" });
      setImage(null);
    } catch (error) {
      console.error("Error creating event:", error);
      setMessage("Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const labelStyle = "block text-xs font-black uppercase tracking-[0.2em] text-zinc-900 mb-2";
  const inputStyle = "w-full bg-transparent border-b-2 border-zinc-400 py-3 px-2 focus:border-red-700 outline-none transition-colors text-zinc-900 font-medium placeholder:text-zinc-100";

  return (
    <div className="min-h-screen bg-gray-200 text-zinc-900 font-sans antialiased pb-20">
      {/* Navigation */}
      <nav className="border-b border-zinc-400 px-6 py-6 bg-gray-200">
        <Link to="/admin/dashboard" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-red-700 transition-colors">
          <FaArrowLeft /> Back to Dashboard
        </Link>
      </nav>

      <main className="container mx-auto px-6 mt-16 max-w-4xl">
        <header className="mb-12">
          <span className="text-[10px] font-bold text-red-700 uppercase tracking-[0.5em] block mb-2">New Entry</span>
          <h1 className="text-5xl font-black tracking-tighter uppercase">Create <span className="italic font-serif text-red-800 normal-case tracking-normal">Event</span></h1>
        </header>

        <div className="bg-zinc-300 p-1 border-t-8 border-red-700 shadow-2xl">
          <form onSubmit={handleSubmit} className="bg-gray-200 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              
              {/* Left Column: Details */}
              <div className="space-y-8">
                <div>
                  <label className={labelStyle}>Event Title</label>
                  <input type="text" name="title" value={eventData.title} onChange={handleChange} placeholder="e.g. Sunday Youth Revival" className={inputStyle} required />
                </div>

                <div>
                  <label className={labelStyle}>Event Date</label>
                  <input type="date" name="date" value={eventData.date} onChange={handleChange} className={inputStyle} required />
                </div>

                <div>
                  <label className={labelStyle}>Location</label>
                  <input type="text" name="location" value={eventData.location} onChange={handleChange} placeholder="Main Sanctuary, Kiambaa" className={inputStyle} required />
                </div>
              </div>

              {/* Right Column: Description & Image */}
              <div className="space-y-8">
                <div>
                  <label className={labelStyle}>Description</label>
                  <textarea name="description" value={eventData.description} onChange={handleChange} rows="4" placeholder="Brief details about the event..." className={`${inputStyle} resize-none`} required />
                </div>

                <div>
                  <label className={labelStyle}>Event Poster</label>
                  <div className="relative border-2 border-dashed border-zinc-400 p-6 text-center hover:border-red-700 transition-colors">
                    <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required />
                    <FaCloudUploadAlt className="mx-auto text-2xl text-zinc-100 mb-2" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                      {image ? image.name : "Click to upload image"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 flex flex-col items-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-64 py-5 bg-zinc-900 text-white text-xs font-bold uppercase tracking-[0.3em] hover:bg-red-700 transition-all duration-500 shadow-xl disabled:bg-zinc-500"
              >
                {loading ? "Publishing..." : "Publish Event"}
              </button>

              {message && (
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className={`mt-6 text-xs font-black uppercase tracking-widest ${message.includes("success") ? "text-green-700" : "text-red-700"}`}
                >
                  {message}
                </motion.p>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreateEvent;