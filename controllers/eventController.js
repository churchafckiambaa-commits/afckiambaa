import Event from "../models/eventModel.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// ✅ FIXED: Leave this completely empty. 
// This forces Cloudinary to automatically detect and parse your CLOUDINARY_URL environment variable.
cloudinary.config();

// 📌 Helper function to upload buffer to Cloudinary
const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          console.error("❌ Cloudinary Stream Upload Error:", error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    stream.end(fileBuffer);
  });
};

// 🟩 CREATE EVENT
export const createEvent = async (req, res) => {
  try {
    const { title, date, description, location } = req.body;

    if (!title || !date || !description || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Upload image buffer to Cloudinary
    const uploadResult = await uploadToCloudinary(req.file.buffer, "apostolic_events");

    const newEvent = new Event({
      title,
      date,
      description,
      location,
      image: {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      },
    });

    const savedEvent = await newEvent.save();
    res.status(201).json({ message: "Event created successfully", event: savedEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: error.message });
  }
};

// 🟦 GET ALL EVENTS
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟨 GET SINGLE EVENT
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟧 UPDATE EVENT
export const updateEvent = async (req, res) => {
  try {
    const { title, date, description, location } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    // If user uploaded a new image
    if (req.file) {
      // Delete old Cloudinary image
      if (event.image?.public_id) {
        await cloudinary.uploader.destroy(event.image.public_id);
      }

      // Upload new image buffer
      const uploadResult = await uploadToCloudinary(req.file.buffer, "apostolic_events");
      event.image.url = uploadResult.secure_url;
      event.image.public_id = uploadResult.public_id;
    }

    // Update fields
    event.title = title || event.title;
    event.date = date || event.date;
    event.description = description || event.description;
    if (location !== undefined) event.location = location;

    const updatedEvent = await event.save();
    res.json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: error.message });
  }
};

// 🟥 DELETE EVENT
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Delete Cloudinary image
    if (event.image?.public_id) {
      await cloudinary.uploader.destroy(event.image.public_id);
    }

    await event.deleteOne();

    res.json({ message: "Event and image deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: error.message });
  }
};