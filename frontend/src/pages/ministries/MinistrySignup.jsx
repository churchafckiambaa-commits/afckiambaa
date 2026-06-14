import React, { useState } from "react";
import { FaSignature, FaPhoneAlt, FaCross, FaQuoteLeft, FaHandHoldingHeart, FaChurch, FaEnvelope, FaChevronRight } from "react-icons/fa";

// Assets
import image1 from "../../assets/hero3.jpeg"; 
import image2 from "../../assets/hero33.jpg"; 
import image3 from "../../assets/youth4.jpg"; 
import image4 from "../../assets/heronew2.jpeg"; 

export default function MinistrySignup() {
  // FIXED: State keys now match your HTML input "name" properties perfectly
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    areaOfService: "", // Changed from ministry to areaOfService to match your select element
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phoneNumber" ? value.replace(/\D/g, "") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    try {
      // FIXED: Sending data as a JSON payload object
      const payload = {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        ministry: formData.areaOfService, // Extracts the correct value from state
      };

      // Your exact Google Apps Script Web App URL
      await fetch("https://script.google.com/macros/s/AKfycbx9I4EGzs0Cu315JlkcCv8iMT2plUDofTumAkRizIRyKmSqByhHSmbAUusuYPwHu6_O/exec", {
        method: "POST",
        mode: "no-cors", 
        headers: {
          "Content-Type": "text/plain", // Keeps cross-origin fetch simple
        },
        body: JSON.stringify(payload), // Send data cleanly structured
      });

      setSubmitted(true);
      setFormData({ 
        fullName: "", 
        phoneNumber: "", 
        email: "",
        areaOfService: "" // Reset accurately
      });
    } catch (error) {
      console.error("Error:", error);
      setFeedback("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    } 
  };

  const inputClasses = "w-full p-6 bg-zinc-900 border border-zinc-800 text-white text-sm font-bold placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition-all focus:ring-1 focus:ring-amber-500";

  return (
    <div className="bg-black text-white selection:bg-amber-500 selection:text-black">
      
      {/* 1. SACRED HERO */}
      <section className="relative pt-48 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 grayscale blur-sm">
            <img src={image1} alt="Church Vision" className="object-cover h-full w-full" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="text-amber-500 uppercase tracking-[0.4em] text-xs font-black inline-block mb-8 border-l-4 border-amber-500 pl-4">
            Kingdom Laborers Needed
          </span>
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter uppercase leading-[0.8] mb-8">
            SERVE <br /> <span className="text-zinc-800 outline-text">THE</span> <br /> <span className="text-white">CALL.</span>
          </h1>
          <p className="text-zinc-400 text-xl font-light max-w-xl leading-relaxed italic border-l border-zinc-800 pl-6">
            "As each has received a gift, use it to serve one another, as good stewards of God's varied grace." 
            <span className="text-amber-500 not-italic block mt-4 text-sm font-bold uppercase tracking-widest">— 1 Peter 4:10</span>
          </p>
        </div>
      </section>

      {/* 2. CORE VALUES GRID */}
      <section className="grid md:grid-cols-4 gap-2 bg-zinc-950 p-2">
        <div className="h-100 overflow-hidden relative group">
            <img src={image2} className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-all duration-700" alt="Service" />
        </div>
        <div className="h-100 bg-zinc-900 p-10 flex flex-col justify-end border-t-4 border-amber-500">
            <FaCross className="text-amber-500 text-4xl mb-6" />
            <h3 className="font-black text-2xl leading-none uppercase tracking-tighter text-white">Find Your <br /> Purpose.</h3>
        </div>
        <div className="h-100 overflow-hidden relative group">
            <img src={image3} className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-all duration-700" alt="Worship" />
        </div>
        <div className="h-100 bg-amber-600 p-10 flex flex-col justify-between text-black">
            <span className="font-bold uppercase text-xs tracking-widest">Est. 2026 Vision</span>
            <p className="text-2xl font-black leading-tight uppercase">Every member a minister. Every hand a blessing.</p>
        </div>
      </section>

      {/* 3. SIGNUP INTERFACE */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-5 space-y-12">
            <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">
              JOIN THE <br /> <span className="text-amber-500 italic">MINISTRY.</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
                The church is not a building; it is a body. Whether you are gifted in hospitality, 
                technical arts, or intercession, there is a place for your unique contribution 
                to the Kingdom of God.
            </p>
            
            <div className="space-y-6">
                <div className="flex items-center gap-6 group">
                    <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center rounded-full group-hover:bg-amber-500 transition-colors">
                      <FaHandHoldingHeart className="text-amber-500 group-hover:text-black" />
                    </div>
                    <span className="font-black uppercase tracking-widest text-xs">Stewardship of Gifts</span>
                </div>
                <div className="flex items-center gap-6 group">
                    <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center rounded-full group-hover:bg-amber-500 transition-colors">
                      <FaChurch className="text-amber-500 group-hover:text-black" />
                    </div>
                    <span className="font-black uppercase tracking-widest text-xs">Community Impact</span>
                </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div className="bg-zinc-950 p-10 md:p-16 border border-zinc-800 relative z-10">
              {submitted ? (
                <div className="text-center py-10 space-y-8">
                  <h3 className="text-6xl font-black text-amber-500 tracking-tighter uppercase">Blessings.</h3>
                  <p className="text-xl text-zinc-300">Your willingness to serve has been recorded. A ministry leader will reach out to you shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="px-8 py-4 bg-amber-500 text-black font-black uppercase text-xs tracking-widest hover:bg-white transition-colors">Return</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {feedback && <p className="text-red-500 text-sm font-bold uppercase tracking-wider">{feedback}</p>}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Legal Name</label>
                    <div className="relative group">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-amber-500 transition-colors"><FaSignature /></span>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="FIRST & LAST NAME"
                        className={`${inputClasses} pl-16`}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Contact Number</label>
                      <div className="relative group">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-amber-500 transition-colors"><FaPhoneAlt /></span>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          placeholder="07XX XXX XXX"
                          className={`${inputClasses} pl-16`}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Email Address</label>
                      <div className="relative group">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-amber-500 transition-colors"><FaEnvelope /></span>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="EMAIL@DOMAIN.COM"
                          className={`${inputClasses} pl-16`}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Preferred Department</label>
                    <select
                      name="areaOfService"
                      value={formData.areaOfService}
                      onChange={handleChange}
                      className={`${inputClasses} appearance-none cursor-pointer`}
                      required
                    >
                      <option value="">SELECT A MINISTRY</option>
                      <option value="Intercession">Prayer & Intercession</option>
                      <option value="Ushering">Ushering & Protocol</option>
                      <option value="Worship">Praise & Worship</option>
                      <option value="Media">Media & Communications</option>
                      <option value="Sunday School">Children's Ministry</option>
                      <option value="Outreach">Evangelism & Outreach</option>
                      <option value="Sanctuary">Sanctuary Maintenance</option>
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="group w-full py-6 bg-white text-black text-sm font-black tracking-[0.4em] uppercase hover:bg-amber-500 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {loading ? "RECORDING..." : (
                      <>
                        Commit to Service <FaChevronRight className="group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOOTER QUOTE */}
      <section className="h-[50vh] relative overflow-hidden flex items-center justify-center">
        <img src={image4} alt="Church Community" className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale" />
        <div className="relative z-10 text-center px-6">
            <FaQuoteLeft className="text-amber-500 text-4xl mx-auto mb-8 opacity-50" />
            <h2 className="text-white text-2xl md:text-5xl font-black uppercase tracking-widest max-w-4xl leading-tight">
                "Work heartily, as for the Lord and not for men."
            </h2>
            <p className="mt-6 text-zinc-500 font-bold uppercase tracking-[0.3em]">Colossians 3:23</p>
        </div>
      </section>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1px #3f3f46;
          color: transparent;
        }
      `}</style>
    </div>
  );
}