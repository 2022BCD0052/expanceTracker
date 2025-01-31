import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import CustonTabs from '@/components/CustonTabs'

const _layout = () => {

  return (
  < >
    <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
    <Tabs tabBar={CustonTabs} screenOptions={{ headerShown: false }}>
      {/* Add your screens here */}
      <Tabs.Screen name="index" options={{ title: "index" }} />
      <Tabs.Screen name="statistics" options={{ title: "statistics" }} />
      <Tabs.Screen name="wallet" options={{ title: "wallet" }} />
      <Tabs.Screen name="profile" options={{ title: "profile" }} />
    </Tabs>
  </>
  )
}

export default _layout

const styles = StyleSheet.create({})