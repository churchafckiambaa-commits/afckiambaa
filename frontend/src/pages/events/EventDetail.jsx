import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import EventShare from "../../components/Events/EventShare";

export default function EventDetails() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get("id");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`https://afckiambaa-as5f.onrender.com/api/events/${eventId}`);
        if (!res.ok) throw new Error("Failed to fetch event details.");
        const data = await res.json();

        // ✅ Your backend likely sends { success: true, event: {...} }
        setEvent(data.event || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchEvent();
  }, [eventId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh] bg-base-200 text-center">
        <p className="text-error text-lg mb-4">
          {error || "Event not found."}
        </p>
        <Link to="/events" className="btn btn-primary">
          Back to Events
        </Link>
      </div>
    );
  }

  // 🗓️ Extract date parts
  const eventDate = new Date(event.date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleString("default", { month: "short" });
  const year = eventDate.getFullYear();

  const imageUrl = event.image
    ? `https://afckiambaa-as5f.onrender.com/${event.image.replace(/\\/g, "/")}`
    : "/placeholder.jpg";

  return (
    <div className="min-h-screen bg-base-200 pt-30 py-16 px-6 md:px-20 font-montserrat">
      <div className="max-w-5xl mx-auto bg-base-100 shadow-xl rounded-2xl overflow-hidden">
        {/* Desktop layout */}
        <div className="hidden md:flex items-center justify-between p-8 md:p-10 gap-8">
          {/* 🖼️ Image */}
          <div className="shrink-0 w-[300px] h-[300px] overflow-hidden rounded-xl shadow-md">
            <img
              src={imageUrl}
              alt={event.title}
              className="object-cover w-full h-full"
              crossOrigin="anonymous"
            />
          </div>

          {/* 📅 Date */}
          <div className="flex flex-col items-center justify-center text-center text-primary font-bold">
            <span className="text-6xl leading-none">{day}</span>
            <span className="text-2xl uppercase tracking-wide">{month}</span>
            <span className="text-lg text-white---content/70">{year}</span>
          </div>

          {/* 📰 Event Details */}
          <div className="flex-1 text-left space-y-4">
            <h1 className="text-3xl font-semibold text-primary">
              {event.title}
            </h1>
            <p className="text-white-- text-white---content leading-relaxed">
              {event.description}
            </p>
            <div className="text-sm text-gray-500">
              📍 {event.location || "Apostolic Faith Church Kiambaa"}
            </div>
            <Link
              to="/events"
              className="inline-block mt-3 text-primary hover:underline text-sm font-medium"
            >
              ← Back to All Events
            </Link>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden p-6 text-center">
          <div className="w-full h-64 overflow-hidden rounded-xl mb-6">
            <img
              src={imageUrl}
              alt={event.title}
              className="object-cover w-full h-full"
              crossOrigin="anonymous"
            />
          </div>

          <div className="text-primary font-bold mb-4">
            <div className="text-5xl leading-none">{day}</div>
            <div className="text-xl uppercase tracking-wide">{month}</div>
            <div className="text-sm text-white---content/70">{year}</div>
          </div>

          <h1 className="text-3xl font-semibold text-primary mb-3">
            {event.title}
          </h1>
          <p className="text-white-- text-white---content leading-relaxed mb-4">
            {event.description}
          </p>

          <div className="text-sm text-gray-500 mb-6">
            📍 {event.location || "Apostolic Faith Church Kiambaa"}
          </div>

          <Link
            to="/events"
            className="inline-block text-primary hover:underline text-sm font-medium"
          >
            ← Back to All Events
          </Link>
        </div>
      </div>

      {/* 🔗 Share buttons */}
      <div className="max-w-5xl mx-auto mt-8">
        <EventShare />
      </div>
    </div>
  );
}
