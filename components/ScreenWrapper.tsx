import { Dimensions, Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScreenWrapperProps } from '@/types'
import { colors } from '@/constants/theme'

const {height} = Dimensions.get('window')
const ScreenWrapper = ({style,children}:ScreenWrapperProps) => {
    let paddingTop = Platform.OS=='ios'? height * 0.06 :50;
  return (
    <View 
    style={[{
        paddingTop,
        backgroundColor: colors.neutral900,
        ...style
      
    },styles.container]}
    >
        <StatusBar barStyle={'light-content'}/>
        {children}
    </View>
  )   
}

export default ScreenWrapper

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})