import React from "react";
import { AuthProvider } from "@/context/authContext";
import { Stack } from "expo-router";
import { StatusBar } from "react-native"; 

function StackLayout() {
  return (
    <>
    
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(modals)/profileModal" options={{ presentation: "modal" }} />
        <Stack.Screen name="(modals)/walletModal" options={{ presentation: "modal" }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  );
}
