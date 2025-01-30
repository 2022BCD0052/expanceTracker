import { CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants";
import { ResponseType } from "@/types";
import axios from "axios";

// Cloudinary setup
const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`; // Replace with your Cloudinary URL

interface ImageFile {
  uri: string;
  type: string;
  fileName: string;
}

interface CloudinaryResponse {
  secure_url: string;
}

// Function to upload image to Cloudinary
export const uploadImageToCloudinary = async (
  file: ImageFile | string,
  folderName: string
): Promise<ResponseType> => {
  try {
    console.log("Received file:", file);

    const formData = new FormData();

    if (typeof file === "string") {
      // Handle base64 string (if the file is a base64 encoded image)
      if (file.startsWith("data:image")) {
        formData.append("file", file); // Directly append base64 string as the file
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        formData.append("folder", folderName); // Add folder name if needed
      }
    } else if (file && file.uri) {
      // If file is a normal image object (with uri, type, and fileName)
      formData.append("file", {
        uri: file.uri,
        type: file.type || "image/jpeg", // Use file's type or default to image/jpeg
        name: file.fileName || file.uri.split("/").pop() || "file.jpg",
      } as any);

      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", folderName); // Add folder name if needed
    }

    console.log("Sending request to Cloudinary with formData:", formData);

    const response = await axios.post<CloudinaryResponse>(cloudinaryUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Response: ", response);
    console.log("Secure URL: ", response?.data?.secure_url);

    if (response.status === 200 && response.data) {
      return {
        success: true,
        data: response?.data?.secure_url,
      };
    }

    return {
      success: false,
      msg: "Failed to upload image",
    };
  } catch (error) {
    console.error("Error uploading image to Cloudinary", error);
    return {
      success: false,
      msg: "Error uploading image to Cloudinary",
    };
  }
};

// Helper function to get profile image based on input
export const getProfileImage = (file: any) => {
  if (file && typeof file === "string") {
    return file;
  }
  if (file && typeof file === "object") {
    return file.uri;
  }

  return require("../assets/images/profile.jpeg");
};
