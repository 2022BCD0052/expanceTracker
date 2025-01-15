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
const Login = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = React.useState(false);
  const handleSubmit = async()=>{
    if(emailRef.current && passwordRef.current){
      console.log(emailRef.current,passwordRef.current)
    }else{
      alert("Please fill all the fields")
    }
 
  }
  return (
    <View style={styles.container}>
      <BackButton />
      <View style={{ gap: 5, marginTop: spacingY._20 }}>
        <Typo size={30} fontWeight={"800"}>
          Hey,
        </Typo>
        <Typo size={30} fontWeight={"800"}>
          Welcome back
        </Typo>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Typo size={16} color={colors.textLight}>
          Login me to track all your expanses
        </Typo>
        <Input
          placeholder=" Enter Your Email"
          onChange={(event) => (emailRef.current = event.nativeEvent.text)}
          icon={<Icons.Envelope size={verticalScale(26)} />}
        />

        <Input
          placeholder=" Enter Your Password"
          secureTextEntry={true}
          onChange={(event) => (passwordRef.current = event.nativeEvent.text)}
          icon={<Icons.Lock size={verticalScale(26)} />}
        />
        <Typo style={styles.forgotPassword} size={12} fontWeight={"500"}>          Forgot Password?
        </Typo>
        <Button loading={isLoading} style={{ }} onPress={handleSubmit}>
          <Typo fontWeight={"700"} size={21} color={colors.black}>
            Login
          </Typo>
        </Button>

      </View>
      {/* footer style */}
      <View style={styles.footer}>
        <Typo size={15} color={colors.white}>
          Don't have an account?
        </Typo>
        <Pressable onPress={() => router.push("/(auth)/register")} >
          <Typo size={16} color={colors.primary}>
            Sign up
          </Typo>
        </Pressable>

      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30, // Corrected gap property to spacingY._30
    paddingHorizontal: spacingX._20, // Corrected paddingHorizontal property to spacingX._20
  },
  welcomeText: {
    fontSize: verticalScale(20),
    fontWeight: "bold",
    color: colors.text,
  },
  form: {
    gap: spacingY._20, // Corrected gap property to spacingY._20
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
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    height: verticalScale(50),
    gap: spacingY._10,
    elevation: 5,
    alignItems: "center",
    shadowColor: "white",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});
