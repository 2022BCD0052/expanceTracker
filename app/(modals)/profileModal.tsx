import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { UserDataType } from "@/types";
import * as ImagePicker from 'expo-image-picker';
const profileModal = () => {
  const { user, updateUserData } = useAuth();
  const [userData, setUserData] = useState<UserDataType>({
    name: "",
    image: null,
  });
  const [Loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setUserData({
        name: user?.name || "",
        image: user?.image || null,
      });
    }
    setLoading(false);
  }, [user]); // dependency array add kiya

  const onPickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Error", "Sorry, we need camera roll permissions to make this work!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      if (userData) {
        setUserData({
          ...userData,
          image: result.assets[0].uri,
        });
      }
    }
  };



  const handleSubmit = async () => {
    if (!userData || !userData.name.trim()) {
      Alert.alert("Error", "Name is required");
      return;
    }

    setLoading(true);
    try {
      const response = await UpdateUser(user?.uid || "", userData);
      if (response.success) {
        updateUserData(user?.uid || "");
        Alert.alert("Success", "Profile updated successfully");
      } else {
        Alert.alert("Error", "Error updating profile");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title=" Update Profile"
          leftIcon={<UserCircle />}
          style={{ marginBottom: spacingY._10 }}
        />
        {/* <ProfileForm /> */}
        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Image
                source={getProfileImage(userData?.image)}
                style={styles.avatar}
                contentFit="cover"
                transition={100}
              />
              <TouchableOpacity
                style={styles.editIcon}
                onPress={onPickImage

                }
              >
                <Icons.Pencil size={20} color={colors.neutral800} />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Typo color={colors.neutral800}>Name</Typo>
              <Input
                placeholder="Name"
                value={userData?.name || ""}
                onChangeText={(value) => {
                  if (userData) {
                    setUserData({
                      ...userData,
                      name: value,
                      image: userData.image,
                    });
                  }
                }}
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

export default profileModal;

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
    // overflow: "hidden",
    // position: "relative",
  },
  editIcon: {
    position: "absolute",
    bottom: spacingY._5,
    right: spacingY._7,
    borderRadius: 100,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: spacingY._7, // Fixed spacing issue here
  },
  inputContainer: {
    gap: spacingY._10, // Fixed misplaced closing bracket
  },
});
