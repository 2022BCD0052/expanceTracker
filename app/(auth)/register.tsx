import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { verticalScale } from "@/utils/styling";
import { colors, spacingX, spacingY } from "@/constants/theme";
import BackButton from "@/components/BackButton";
import Typo from "@/components/Typo";
import Input from "@/components/Input";
import * as Icons from "phosphor-react-native";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";
import ScreenWrapper from "@/components/ScreenWrapper";

const Register = () => {
  const router = useRouter();
  const nameRef = useRef<string>("");
  const emailRef = useRef<string>("");
  const passwordRef = useRef<string>("");
  const [isLoading, setIsLoading] = React.useState(false);

  const { register: registerUser } = useAuth();

  const handleSubmit = async () => {
    if (!emailRef.current || !passwordRef.current || !nameRef.current) {
      alert("Please fill all the fields");
      return;
    }

    setIsLoading(true);
    const res = await registerUser(emailRef.current, passwordRef.current, nameRef.current);
    setIsLoading(false);
    console.log("result", res);
      

    if (res.success) {
      router.push("/(auth)/welcome");
    } else {
      alert(res.msg || "An error occurred during registration. Please try again.");
    }
  };

  return (
    <ScreenWrapper>
    <View style={styles.container}>
      <BackButton  />
      <View style={{ gap: 5, marginTop: spacingY._20 }}>
        <Typo size={30} fontWeight={"800"}>
          Let's,
        </Typo>
        <Typo size={30} fontWeight={"800"}>
          Get Started
        </Typo>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Typo size={16} color={colors.textLight}>
          Create an account to track all your expenses
        </Typo>
        <Input
          placeholder="Enter Your Name"
          onChange={(event) => (nameRef.current = event.nativeEvent.text)}
          icon={<Icons.User size={verticalScale(26)} />}
        />
        <Input
          placeholder="Enter Your Email"
          onChange={(event) => (emailRef.current = event.nativeEvent.text)}
          icon={<Icons.Envelope size={verticalScale(26)} />}
        />
        <Input
          placeholder="Enter Your Password"
          secureTextEntry={true}
          onChange={(event) => (passwordRef.current = event.nativeEvent.text)}
          icon={<Icons.Lock size={verticalScale(26)} />}
        />
        <Typo style={styles.forgotPassword} size={12} fontWeight={"500"}>
          Forgot Password?
        </Typo>
        <Button loading={isLoading} onPress={handleSubmit}>
          <Typo fontWeight={"700"} size={21} color={colors.black}>
            Sign Up
          </Typo>
        </Button>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Typo size={15} color={colors.white}>
          Already have an account?
        </Typo>
        <Pressable onPress={() => router.push("/(auth)/login")}>
          <Typo size={16} color={colors.primary}>
            Sign In
          </Typo>
        </Pressable>
      </View>
    </View>
    </ScreenWrapper>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  form: {
    gap: spacingY._20,
  },
  forgotPassword: {
    fontSize: verticalScale(15),
    textAlign: "center",
    marginTop: spacingY._10,
    marginBottom: spacingY._20,
    fontWeight: "500",
    color: colors.white,
    opacity: 0.97,
    alignSelf: "flex-end",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: verticalScale(50),
    gap: spacingX._10,
    shadowColor: "white",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});
