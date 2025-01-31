import { ResponseType, WalletType } from "@/types";
import { uploadImageToCloudinary } from "./imageService";
import { doc, Firestore } from "firebase/firestore";
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

    // Add or update the wallet data in the database (API call / Database operation)
    if(!walletToSave.id) {
        // Create a new wallet
        walletToSave.amount = 0;
        walletToSave.created = new Date();
        walletToSave.totalIncome = 0;
        walletToSave.totalExpenses = 0;
    }
    const walletRef = walletData?.id?doc(firestore, `wallets/${walletData.id}`):doc(collection(firestore, "wallets"));
    
    // Proceed with saving the wallet data (API call / Database operation)
    // Example: const response = await saveWalletToDB(walletToSave);

    return {
      success: true,
      msg: "Wallet successfully created or updated",
      data: walletToSave,
    };

  } catch (error: any) {
    console.log("Error creating or updating wallet:", error);
    return {
      success: false,
      msg: error.message || "An unexpected error occurred",
    };
  }
};
function collection(firestore: Firestore, arg1: string): import("@firebase/firestore").CollectionReference<unknown, import("@firebase/firestore").DocumentData> {
    throw new Error("Function not implemented.");
}

