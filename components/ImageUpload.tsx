import { useState, useCallback } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import * as Icons from "phosphor-react-native";
import { colors, radius } from "@/constants/theme";
import Typo from "./Typo";
import { scale, verticalScale } from "@/utils/styling";
import { getFilePath } from "@/services/imageService";
import { ImageUploadProps } from "@/types";

const ImageUpload = ({ file = null, onSelect, onClear, containerStyle, imageStyle, placeholder = "image" }: ImageUploadProps) => {
  const [isPicking, setIsPicking] = useState(false);

  const pickImage = useCallback(async () => {
    if (isPicking) return;
    setIsPicking(true);

    console.log("pickImage function called"); // Debugging log

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Error", "Sorry, we need camera roll permissions to make this work!");
      setIsPicking(false);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && onSelect) {
      onSelect(result.assets[0].uri);
    }

    setIsPicking(false);
  }, [isPicking, onSelect]);

  return (
    <View>
      {!file && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => pickImage()}
          style={[containerStyle, styles.inputContainer]}
          disabled={isPicking}
        >
          <Icons.UploadSimple size={30} color={colors.neutral200} weight="fill" />
          {placeholder && <Typo>{placeholder}</Typo>}
        </TouchableOpacity>
      )}

      {file && (
        <View style={[styles.image, imageStyle]}>
          <Image style={[styles.image]} source={getFilePath(file)} contentFit="cover" transition={100} />
          <TouchableOpacity
  style={styles.deleteIcon}
  onPress={onClear}
  accessibilityLabel="Delete selected image"
  accessibilityHint="Removes the selected image"
>            <Icons.X size={15} color={colors.black} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({
  inputContainer: {
    height: verticalScale(54),
    backgroundColor: colors.neutral700,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: colors.neutral500,
    borderStyle: "dashed",
    borderRadius: 10,
  },
  image: {
    height: verticalScale(150),
    width: verticalScale(150),
    borderRadius: radius._15,
    borderWidth: 1,
    borderColor: colors.neutral500,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteIcon: {
    position: "absolute",
    top: scale(6),
    right: scale(6),
    shadowColor: colors.neutral500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: colors.white,
    zIndex: 10,
    padding: scale(5),
    borderRadius: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});
