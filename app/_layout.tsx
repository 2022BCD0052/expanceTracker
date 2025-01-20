import { AuthProvider } from "@/context/authContext";
import { Stack } from "expo-router";
import { Text, View } from "react-native";

function StackLayout() {
  return (
<Stack screenOptions={{headerShown :false }}></Stack>
  );
}


export default function RootLayout() {
  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  )
    

}