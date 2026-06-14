import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTrash, FaArrowLeft, FaCheckCircle, FaRegCircle, FaUser, FaPhoneAlt } from "react-icons/fa";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://afckiambaa-as5f.onrender.com/api/messages";

  const fetchMessages = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this message?")) return;

    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const toggleReplied = (id) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg._id === id ? { ...msg, replied: !msg.replied } : msg
      )
    );
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <span className="text-xs font-black uppercase tracking-[0.5em] animate-pulse">Syncing Inquiries...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 text-zinc-900 font-sans antialiased pb-20">
      {/* Navigation */}
      <nav className="border-b border-zinc-400 px-6 py-6 bg-gray-200 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/admin/dashboard" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-red-700 transition-colors">
            <FaArrowLeft /> Dashboard
          </Link>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">Communication Logs</span>
        </div>
      </nav>

      <main className="container mx-auto px-6 mt-16">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            Visitor <br />
            <span className="italic font-serif text-red-800 normal-case tracking-normal">Inquiries</span>
          </h1>
          <p className="mt-4 text-zinc-600 font-medium">Manage and track responses to community outreach.</p>
        </header>

        {messages.length === 0 ? (
          <div className="py-32 border-2 border-dashed border-zinc-400 text-center">
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">The inbox is currently empty.</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-zinc-300 p-1 border-t-8 border-red-700 shadow-2xl">
            <table className="w-full bg-gray-200 text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-400">
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-red-700">Sender</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-red-700">Message</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-red-700">Status</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-red-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-300">
                {messages.map((msg) => (
                  <motion.tr 
                    key={msg._id}
                    className={`transition-colors duration-300 ${msg.replied ? "bg-zinc-300/50" : "hover:bg-gray-200/40"}`}
                  >
                    {/* Sender Info */}
                    <td className="p-6 align-top w-64">
                      <div className="flex flex-col gap-1">
                        <span className="font-black text-sm uppercase tracking-tight text-zinc-900 flex items-center gap-2">
                          <FaUser className="text-[10px] text-red-800" /> {msg.name}
                        </span>
                        <span className="text-[11px] font-bold text-zinc-500 flex items-center gap-2">
                          <FaPhoneAlt className="text-[9px]" /> {msg.phone}
                        </span>
                        <span className="text-[9px] text-zinc-100 font-bold mt-2 italic">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </td>

                    {/* Message Body */}
                    <td className="p-6 align-top">
                      <p className="text-sm font-medium text-zinc-800 leading-relaxed max-w-md">
                        {msg.message}
                      </p>
                    </td>

                    {/* Status Toggle */}
                    <td className="p-6 align-top">
                      <button 
                        onClick={() => toggleReplied(msg._id)}
                        className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${
                          msg.replied ? "text-green-700" : "text-zinc-100 hover:text-red-700"
                        }`}
                      >
                        {msg.replied ? <FaCheckCircle /> : <FaRegCircle />}
                        {msg.replied ? "Replied" : "Pending"}
                      </button>
                    </td>

                    {/* Delete Action */}
                    <td className="p-6 align-top">
                      <button 
                        onClick={() => deleteMessage(msg._id)}
                        className="text-zinc-100 hover:text-red-700 transition-colors p-2"
                        title="Delete Permanently"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}