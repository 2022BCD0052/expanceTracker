import { CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants";
import { ResponseType } from "@/types";
import axios from "axios";

// Cloudinary setup
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

interface ImageFile {
  uri: string;
  type?: string;
  fileName?: string;
}

interface CloudinaryResponse {
  secure_url: string;
}

export const uploadImageToCloudinary = async (
  file: ImageFile | string,
  folderName: string
): Promise<ResponseType> => {
  try {
    if (!file) {
      return { success: false, msg: "No file provided", data: null };
    }

    console.log("Uploading file:", file);

    const formData = new FormData();
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", folderName); // Specify the folder in Cloudinary

    if (typeof file === "string") {
      // Handle Base64 string
      if (file.startsWith("data:image")) {
        formData.append("file", file);
      } else {
        return { success: false, msg: "Invalid base64 format", data: null };
      }
    } else if (file.uri) {
      // Fetch the image as Blob (required in React Native)
      const response = await fetch(file.uri);
      const blob = await response.blob();

      formData.append("file", {
        uri: file.uri,
        type: file.type || "image/jpeg",
        name: file.fileName || file.uri.split("/").pop() || "file.jpg",
      } as any);
    }

    console.log("Sending request to Cloudinary...");

    const response = await axios.post<CloudinaryResponse>(CLOUDINARY_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status === 200 && response.data?.secure_url) {
      console.log("Upload successful:", response.data.secure_url);
      return { success: true, data: response.data.secure_url };
    }

    return { success: false, msg: "Failed to upload image" };

  } catch (error: any) {
    console.error("Error uploading image to Cloudinary:", error.message || error);
    return { success: false, msg: "Error uploading image to Cloudinary" };
  }
};


// Helper function to get a profile image path
export const getProfileImage = (file: any): string => {
  if (file && typeof file === "string") return file;
  if (file && typeof file === "object") return file.uri;
  return require("../assets/images/profile.jpeg"); // Default profile image
};

// Helper function to get file path
export const getFilePath = (file: any): string | null => {
  if (file && typeof file === "string") return file;
  if (file && typeof file === "object") return file.uri;
  return null;
};
