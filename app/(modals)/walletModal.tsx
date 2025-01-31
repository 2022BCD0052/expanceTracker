import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { scale, verticalScale } from "@/utils/styling";
import ScreenWrapper from "@/components/ScreenWrapper";
import ModalWrapper from "@/components/ModalWrapper";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import { getProfileImage } from "@/services/imageService";
import { User, UserCircle } from "phosphor-react-native";
import { Image } from "expo-image";
import Typo from "@/components/Typo";
import * as Icons from "phosphor-react-native";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useAuth } from "@/context/authContext";
import { UpdateUser } from "@/services/userService";
import { useRouter } from "expo-router";
import { UserDataType, WalletType } from "@/types";
import * as ImagePicker from "expo-image-picker";
import ImageUpload from "@/components/ImageUpload";
import { createOrUpdateWallet } from "@/services/walletService";

const WalletModal = () => {
  const { user, updateUserData } = useAuth();
  const [Wallet, setWallet] = useState<WalletType>({
    name: "",
    image: null,
  });
  const [Loading, setLoading] = useState(false);
  const router = useRouter();

  // Image picker (uncomment if needed)
  const [isPicking, setIsPicking] = React.useState(false);

  const pickImage = async () => {
    if (isPicking) return; // Prevent duplicate execution
    setIsPicking(true);
  
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Error", "Sorry, we need camera roll permissions to make this work!");
      setIsPicking(false);
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Fix media type format
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setWallet({ ...Wallet, image: result.assets[0].uri });
    }
  
    setIsPicking(false);
  };
  
  // Inside button
  <TouchableOpacity onPress={pickImage} disabled={isPicking}>
    <Text>Select Image</Text>
  </TouchableOpacity>
  

  const handleSubmit = async () => {
    let { name, image } = Wallet; 

    if (!name.trim() || !image) {
      Alert.alert("Error", "Wallet name is required");
      return;
    }
    const data :WalletType={
      name,
      image,
      uid: user?.uid || "",

    }
    // todo include other fields if needed
    const res = await createOrUpdateWallet(data);
    setLoading(false);
    if (res.success) {
      console.log("Wallet updated:", Wallet);
      console.log(res.data);
      Alert.alert("Success", "Wallet updated successfully");
      router.back();
    } else {
      Alert.alert("Error", "Error updating wallet");
      console.log("Error updating wallet:", res.msg);
    }

    setLoading(true);
    try {
      const response = await UpdateUser(user?.uid || "", Wallet);
      if (response.success) {
        updateUserData(user?.uid || "");
        Alert.alert("Success", "Wallet updated successfully");
      } else {
        Alert.alert("Error", "Error updating wallet");
      }
    } catch (error) {
      console.error("Wallet Update Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title="Wallet Account"
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />
        
        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.avatarContainer}>
            {/* Image picker button */}

            <View style={styles.inputContainer}>
              <Typo color={colors.white}>WalletName</Typo>
              <Input
                placeholder="Name"
                value={Wallet.name}
                onChangeText={(value) => setWallet({ ...Wallet, name: value })}
              />
            </View>
            <View style={styles.inputContainer}>
              <Typo color={colors.white}>Wallet Icon</Typo>
              {/* image component */}
              <ImageUpload
                file={Wallet.image}
                onSelect={()=> pickImage() }
                
                onClear={() => setWallet({ ...Wallet, image: null })}
                placeholder="image"
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          
          <Button style={{ flex: 1 }} onPress={handleSubmit}>
            <Typo color={colors.black} fontWeight={"700"}>
              Update
            </Typo>
          </Button>
          
        </View>
        
      </View>
      
    </ModalWrapper>
  );
};

export default WalletModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._20,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingTop: spacingY._15,
    borderTopColor: colors.neutral700,
    marginBottom: spacingY._5,
    borderTopWidth: 1,
  },

  form: {
    gap: spacingY._30,
    width: "100%",
    marginBottom: spacingY._30,
    marginTop: spacingY._15,
  },

  avatarContainer: {
    position: "relative",
    alignSelf: "center",
  },

  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.neutral500,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    gap: spacingY._10,
  },
});
