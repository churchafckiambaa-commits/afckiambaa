import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function EventPreview() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://afckiambaa-as5f.onrender.com/api/events");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents((data.events || []).slice(0, 3));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <section className="bg-base-100 py-16 px-6 md:px-20 font-montserrat">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-left mb-12">
        <h2 className="text-2xl md:text-4xl font-bold mb-3 text-primary">
          Upcoming Events
        </h2>
        <p className="text-base-content/70 text-sm md:text-lg max-w-2xl">
          Stay connected with our upcoming events, conferences, and special
          gatherings.
        </p>
      </div>

      {/* Responsive Carousel / Grid */}
      <div
        className="
          flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4
          md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:snap-none
          max-w-6xl mx-auto
        "
      >
        {events.length > 0 ? (
          events.map((event) => {
            const imageUrl = event.image
              ? `https://afckiambaa-as5f.onrender.com/${event.image.replace(/\\/g, "/")}`
              : "/placeholder.jpg";

            return (
              <div
                key={event._id}
                className="
                  flex-shrink-0 w-[85%] sm:w-[70%] snap-center
                  md:w-auto md:flex-shrink md:snap-none
                  bg-base-200 border border-base-300 rounded-2xl shadow
                  hover:shadow-lg transition-all duration-300
                "
              >
                {/* Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={event.title}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                    crossOrigin="anonymous"
                  />
                </div>

                {/* Text */}
                <div className="p-2 text-left">
                  <h3 className="font-semibold text-lg mb-2 text-base-content">
                    {event.title}
                  </h3>
                  <p className="text-sm text-base-content/70 mb-1 line-clamp-2">
                    {event.description}
                  </p>
                  <p className="text-xs text-base-content/60 mb-0.5">
                    📅{" "}
                    {new Date(event.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <Link
                    to={`/events/eventDetails?id=${event._id}`}
                    className="link link-primary text-sm font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-base-content/60 col-span-3">
            No upcoming events at the moment.
          </p>
        )}
      </div>

      {/* View All Button */}
      <div className="text-center mt-10">
        <Link to="/events" className="btn btn-outline btn-primary">
          View All Events
        </Link>
      </div>
    </section>
  );
}
