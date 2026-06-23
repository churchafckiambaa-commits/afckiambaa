import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// The library automatically picks up process.env.CLOUDINARY_URL!
cloudinary.config(); 

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "afc_kiambaa_events", 
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export default upload;