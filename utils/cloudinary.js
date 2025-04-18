import { v2 as cloudinary } from "cloudinary";

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Fungsi untuk upload gambar ke Cloudinary
export const uploadImage = async (filePath, fileName) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: fileName, // Nama file gambar di Cloudinary
    });
    return result; // Kembalikan hasil upload (URL dan data lainnya)
  } catch (error) {
    throw new Error("Cloudinary upload failed: " + error.message);
  }
};

// Fungsi untuk generate URL gambar yang telah diupload dan dioptimasi
export const generateOptimizedUrl = (publicId) => {
  return cloudinary.url(publicId, {
    fetch_format: "auto", // Format gambar otomatis (webp, jpg, dll)
    quality: "auto", // Kualitas gambar otomatis
  });
};
