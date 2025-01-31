import { Alert, ScrollView, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { scale, verticalScale } from "@/utils/styling";
import ScreenWrapper from "@/components/ScreenWrapper";
import ModalWrapper from "@/components/ModalWrapper";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import Typo from "@/components/Typo";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import ImageUpload from "@/components/ImageUpload";
import { createOrUpdateWallet } from "@/services/walletService";

const WalletModal = () => {
  const { user, updateUserData } = useAuth();
  const [wallet, setWallet] = useState<{ name: string; image: string | null }>({
    name: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const router = useRouter();

  // Request permission once when the component mounts
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setPermissionGranted(status === "granted");
    })();
  }, []);

  const handleSubmit = useCallback(async () => {
    const { name, image } = wallet;
    if (!name.trim() || !image) {
      Alert.alert("Error", "Wallet name and image are required.");
      return;
    }

    setLoading(true);
    const data = { name, image, uid: user?.uid || "" };

    try {
      const res = await createOrUpdateWallet(data);
      if (res.success) {
        Alert.alert("Success", "Wallet updated successfully");
        router.back();
      } else {
        Alert.alert("Error", "Error updating wallet");
        console.error("Wallet update error:", res.msg);
      }
    } catch (error) {
      console.error("Wallet Update Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [wallet, user, router]);

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
            
            <View style={styles.inputContainer}>
              <Typo color={colors.white}>Wallet Name</Typo>
              <Input
                placeholder="Enter wallet name"
                value={wallet.name}
                onChangeText={(value) =>
                  setWallet((prev) => ({ ...prev, name: value }))
                }
              />
            </View>
            

            <View style={styles.inputContainer}>
              <View>
                <Typo color={colors.white}>Wallet Icon</Typo>
              </View>
              <ImageUpload
                file={wallet.image}
                onSelect={(uri) =>
                  setWallet((prev) => ({ ...prev, image: uri }))
                } 
                onClear={() => setWallet((prev) => ({ ...prev, image: null }))}
                placeholder="Select an image"
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            style={{ flex: 1 }}
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
          >
            <Typo color={colors.black} fontWeight="700">
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
    justifyContent: "space-between",
},
  inputContainer: {
    gap: spacingY._10,
  },
});
