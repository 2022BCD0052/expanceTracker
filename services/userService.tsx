import { firestore } from "@/config/firebase";
import  {ResponseType} from "@/types";
import { doc, updateDoc } from "firebase/firestore";
import { uploadImageToCloudinary } from "./imageService";

export type UserDataType = {
    name: string;
    image: { uri: string } | null;
  } | null;
  
export const UpdateUser = async (
    uid: string,
    updatedData: UserDataType
  ): Promise<ResponseType> => {
    try {

        if (updatedData?.image && updatedData?.image?.uri){
            const imageUpload = await uploadImageToCloudinary(updatedData.image.uri, "profile");
            if (imageUpload.success) {
              updatedData.image = imageUpload.data;
            } else {
              return { success: false, msg: imageUpload.msg || "Error uploading image" };
            }

        }
      const userRef = doc(firestore, "users", uid);
      const filteredUpdateData = Object.fromEntries(
        Object.entries(updatedData || {}).filter(([_, v]) => v !== null)
      );
      await updateDoc(userRef, filteredUpdateData);
  
      return { success: true, msg: "Updated successfully" };
    } catch (error: any) {
      console.log("Error updating user: ", error);
      return { success: false, msg: error?.message || "Error updating user" };
    }
  };










// export const UpdateUser = async(  
//  uid : string,
//   updateData : UserDataType) : Promise<ResponseType> => {
//     // update the user data

    
//     try {
//         // update the user data
//         const useRef = doc(firestore, "users", uid);
//         if (!updateData) {
//             throw new Error("updateData cannot be null");
//         }
//         const filteredUpdateData = Object.fromEntries(
//             Object.entries(updateData).filter(([_, v]) => v !== null)
//         );
//         await updateDoc(useRef, filteredUpdateData);
//         console.log("User data updated:", updateData);
//         return {
//             success: true,
//             msg: "User data updated",};
        
//     } catch (error) {
//         console.log("Error updating user data", error);
//         return {
//             success: false,
//             msg: "Error updating user data",};

        
//     }

// }