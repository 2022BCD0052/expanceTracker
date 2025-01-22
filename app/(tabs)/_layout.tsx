import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import CustonTabs from '@/components/CustonTabs'

const _layout = () => {
  return (
    <Tabs tabBar={CustonTabs}  screenOptions={{headerShown: false}}>
      {/* Add your screens here */}
   <Tabs.Screen name="index" options={{title:"index"}} />
    <Tabs.Screen name="statics" options={{title:"statics"}} />
    <Tabs.Screen name="wallet" options={{title:"wallet"}} />
    <Tabs.Screen name="profile" options={{title:"profile"}} />


    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})