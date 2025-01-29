import { firestore } from "@/config/firebase";
import  {ResponseType, UserDataType} from "@/types";
import { doc, updateDoc } from "firebase/firestore";


export const UpdateUser = async(  
 uid : string,
  updateData : UserDataType) : Promise<ResponseType> => {
    // update the user data

    
    try {
        // update the user data
        const useRef = doc(firestore, "users", uid);
        if (!updateData) {
            throw new Error("updateData cannot be null");
        }
        const filteredUpdateData = Object.fromEntries(
            Object.entries(updateData).filter(([_, v]) => v !== null)
        );
        await updateDoc(useRef, filteredUpdateData);
        console.log("User data updated:", updateData);
        return {
            success: true,
            msg: "User data updated",};
        
    } catch (error) {
        console.log("Error updating user data", error);
        return {
            success: false,
            msg: "Error updating user data",};

        
    }

}