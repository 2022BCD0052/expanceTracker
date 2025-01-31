import { ResponseType, WalletType } from "@/types";
import { uploadImageToCloudinary } from "./imageService";
import { doc, setDoc, updateDoc, collection } from "firebase/firestore";
import { firestore } from "@/config/firebase";

export const createOrUpdateWallet = async (
  walletData: Partial<WalletType>
): Promise<ResponseType> => {
  try {
    let walletToSave = { ...walletData };

    // If an image is present, upload it to Cloudinary
    if (walletData.image) {
      const imageUploadRes = await uploadImageToCloudinary(walletData.image, "wallets");

      if (!imageUploadRes.success) {
        return {
          success: false,
          msg: imageUploadRes.msg || "Failed to upload wallet icon",
        };
      }

      // Assign the uploaded image URL
      walletToSave.image = imageUploadRes.data;
    }

    // Check if wallet exists, if not, initialize default values
    let walletRef;
    if (!walletToSave.id) {
      // Create a new wallet
      walletToSave.amount = 0;
      walletToSave.created = new Date();
      walletToSave.totalIncome = 0;
      walletToSave.totalExpenses = 0;

      // Generate a new document reference
      walletRef = doc(collection(firestore, "wallets"));
      walletToSave.id = walletRef.id; // Assign generated ID
    } else {
      // Reference existing wallet document
      walletRef = doc(firestore, `wallets/${walletToSave.id}`);
    }

    // Save or update wallet data in Firestore
    if (!walletData.id) {
      await setDoc(walletRef, walletToSave); // Create new document
    } else {
      await updateDoc(walletRef, walletToSave); // Update existing document
    }

    return {
      success: true,
      msg: "Wallet successfully created or updated",
      data: walletToSave,
    };

  } catch (error: any) {
    console.error("Error creating or updating wallet:", error);
    return {
      success: false,
      msg: error.message || "An unexpected error occurred",
    };
  }
};
