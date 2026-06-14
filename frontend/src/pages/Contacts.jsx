import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaArrowRight, FaChurch, FaUserTie } from "react-icons/fa";

// Assets
import worshipImg from "../assets/services.jpeg";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" ? value.replace(/\D/g, "") : value
    }));    

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    try {
      const params = new URLSearchParams();
      params.append("name", formData.name);
      params.append("phone", formData.phone);
      params.append("email", formData.email);
      params.append("message", formData.message); 

      await fetch("https://script.google.com/macros/s/AKfycbwvlwVNcWklLS-WH3-RwBU2YRNA3A_5QKEH7d2XzWpl7W86OSABRH3zIUaZOZel5Y9U/exec", {
        method: "POST",
        mode: "no-cors",
        body: params
      });
      setFeedback("Message sent successfully! We'll be in touch soon.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setFeedback("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    } 

  };

  return (
    <div className="bg-gray-200 text-black selection:bg-blue-100">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-zinc-900">
        <img
          src={worshipImg}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
        />
        <div className="relative z-10 text-center px-6">
          <span className="text-amber-500 uppercase tracking-[0.5em] text-xs font-black block mb-4">
            Connect With Us
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter">
            Get In <span className="text-blue-600 italic">Touch.</span>
          </h1>
        </div>
      </section>

      {/* 2. CONTACT CONTENT */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-20">

          {/* LEFT SIDE: CONTACT INFO */}
          <div className="lg:col-span-5 space-y-16">
            <div>
              <h2 className="text-xs font-black tracking-[0.3em] uppercase mb-10 text-red-600 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-red-600"></span> Contact Information
              </h2>
              
              <div className="space-y-12">
                {/* Office Location */}
                <div className="flex gap-6">
                  <FaMapMarkerAlt className="text-2xl text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-black uppercase tracking-widest text-xs mb-2">Location</h4>
                    <p className="text-zinc-500 text-sm leading-relaxed uppercase">
                      Apostolic Faith Church Kiambaa,<br />
                      Muguga, Kiambu County, Kenya
                    </p>
                  </div>
                </div>

                {/* Church Office Phone */}
                <div className="flex gap-6">
                  <FaPhoneAlt className="text-2xl text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-black uppercase tracking-widest text-xs mb-2">Church Office</h4>
                    <a href="tel:+254722850169" className="text-xl font-light hover:text-red-600 transition-colors">
                      +254 722 850 169
                    </a>
                  </div>
                </div>

               

                {/* Email Address */}
                <div className="flex gap-6">
                  <FaEnvelope className="text-2xl text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-black uppercase tracking-widest text-xs mb-2">Email</h4>
                    <a href="mailto:kiambaaafc@gmail.com" className="text-xl font-light hover:text-red-600 transition-colors">
                      kiambaaafc@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

             {/* PASTOR'S NUMBER SECTION */}
                <div className="flex gap-6 p-6 bg-white border-l-4 border-amber-500 shadow-sm transition-transform hover:-translate-y-1">
                  <FaUserTie className="text-2xl text-amber-600 mt-1" />
                  <div>
                    <h4 className="font-black uppercase tracking-widest text-[10px] mb-2 text-zinc-400">Pastoral Support</h4>
                    <a href="tel:+254722650165" className="text-2xl font-black tracking-tighter hover:text-blue-600 transition-colors">
                      +254 722 650 165
                    </a>
                    <p className="text-[10px] uppercase font-bold text-zinc-400 mt-1">Available for counseling & prayer</p>
                  </div>
                </div>

            {/* SOCIALS */}
            <div className="pt-10 border-t border-zinc-300">
              <h4 className="font-black uppercase tracking-[0.2em] text-[10px] mb-6">Digital Presence</h4>
              <div className="flex gap-6 text-2xl">
                <a href="https://facebook.com/Afckiambaa" className="text-blue-600 hover:text-black transition-all"><FaFacebookF /></a>
                <a href="https://instagram.com/afckiambaa_" className="text-red-600 hover:text-black transition-all"><FaInstagram /></a>
                <a href="https://tiktok.com/@afckiambaa_254" className="text-black hover:text-blue-600 transition-all"><FaTiktok /></a>
                <a href="https://youtube.com/@a.f.c.kiambaa" className="text-red-600 hover:text-black transition-all"><FaYoutube /></a>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: FORM */}
          <div className="lg:col-span-7 bg-amber-500 p-8 md:p-16 shadow-2xl">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-10 text-black">
              Send a <span className="text-white italic">Message</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative border-b-2 border-black/20 focus-within:border-black transition-all">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/60">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent py-3 focus:outline-none text-lg font-bold placeholder-black/30"
                    placeholder="John Doe"
                  />
                </div>
                <div className="relative border-b-2 border-black/20 focus-within:border-black transition-all">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/60">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent py-3 focus:outline-none text-lg font-bold placeholder-black/30"
                    placeholder="+254..."
                  />
                </div>
              </div>

              <div className="relative border-b-2 border-black/20 focus-within:border-black transition-all">
                <label className="text-[10px] font-black uppercase tracking-widest text-black/60">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent py-3 focus:outline-none text-lg font-bold placeholder-black/30"
                  placeholder="email@example.com"
                />
              </div>

              <div className="relative border-b-2 border-black/20 focus-within:border-black transition-all">
                <label className="text-[10px] font-black uppercase tracking-widest text-black/60">Your Message *</label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent py-3 focus:outline-none text-lg font-bold resize-none placeholder-black/30"
                  placeholder="How can we help or pray for you?"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-6 font-black uppercase tracking-[0.3em] text-xs transition-all duration-500 ${
                  loading ? "bg-zinc-800 text-white cursor-not-allowed" : "bg-black text-white hover:bg-blue-600"
                }`}
              >
                {loading ? "Processing Transmission..." : "Deliver Message"}
              </button>

              {feedback && (
                <div className={`text-center font-black uppercase tracking-widest text-[10px] p-4 ${feedback.includes('Success') ? 'text-green-900' : 'text-red-900'}`}>
                  {feedback}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* 3. CAMPUSES / OTHER CHURCHES SECTION */}
      <section className="bg-zinc-900 py-24 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-2/3 space-y-6">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
              Part of a <br /> <span className="text-red-600">Greater Family.</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
              Apostolic Faith Church Kiambaa is part of the Muguga Parish. Beyond our local doors, we have several sister campuses across the region dedicated to spreading the Gospel.
            </p>
          </div>
          <div className="md:w-1/3">
            <Link 
              to="/campuses" 
              className="group flex items-center justify-center gap-4 bg-blue-600 text-white p-10 font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-500 w-full text-center"
            >
              <FaChurch className="text-3xl" />
              <span>Explore Our Campuses</span>
              <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. MAP SECTION */}
      <section className="grayscale hover:grayscale-0 transition-all duration-1000 border-t border-zinc-100">
        <iframe
          title="Apostolic Faith Church Kiambaa Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.88931114561!2d36.64366631475394!3d-1.2364746991004812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f232490520639%3A0xc07616f73752e511!2sApostolic%20Faith%20Church%20Kiambaa!5e0!3m2!1sen!2ske!4v1647432000000!5m2!1sen!2ske"
          width="100%"
          height="500"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </section>

    </div>
  );
}