import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import ApiError from "../../errors/apiError.js";

dotenv.config();

const requireCloudinaryConfig = () => {
  if (!process.env.CLOUD_API_NAME || !process.env.CLOUD_API_KEY || !process.env.CLOUD_API_SECRET) {
    throw new ApiError(500, "Cloudinary configuration is required.");
  }
};

cloudinary.config({
  cloud_name: process.env.CLOUD_API_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const uploadImage = async (imageData, options = {}) => {
  requireCloudinaryConfig();

  try {
    const uploadResult = await cloudinary.uploader.upload(imageData, {
      folder: options.folder ?? process.env.CLOUD_API_FOLDER ?? "blog-posts",
      resource_type: "image",
      overwrite: true,
      transformation: [
        { quality: "auto" },
        { fetch_format: "auto" },
      ],
      ...options,
    });

    return {
      publicId: uploadResult.public_id,
      url: uploadResult.secure_url,
      width: uploadResult.width,
      height: uploadResult.height,
      format: uploadResult.format,
      bytes: uploadResult.bytes,
      folder: uploadResult.folder,
      originalFilename: uploadResult.original_filename,
      mimeType: uploadResult.resource_type === "image" ? `image/${uploadResult.format}` : uploadResult.resource_type,
    };
  } catch (error) {
    console.error("[Cloudinary] Upload failed:", error);
    throw new ApiError(500, "Failed to upload image to Cloudinary.");
  }
};

export const deleteImage = async (publicId) => {
  requireCloudinaryConfig();

  if (!publicId) {
    return null;
  }

  try {
    return await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
  } catch (error) {
    console.error("[Cloudinary] Delete failed:", error);
    throw new ApiError(500, "Failed to delete image from Cloudinary.");
  }
};
