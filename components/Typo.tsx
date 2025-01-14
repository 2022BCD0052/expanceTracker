import { StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'
import { TypoProps } from '@/types'
import { verticalScale } from '@/utils/styling'

const Typo = (
    {
        size,
        color=colors.text,
        style,
        children,
        fontWeight= '400',
        textProps={}
    }:TypoProps) => {
        const textStyle : TextStyle={
            fontSize: size ?verticalScale(size):verticalScale(18),
            color,
            fontWeight,
        }

  return (
    <Text {...textProps} style={[textStyle,style]}>
        {children}
    </Text>
    
  )
}

export default Typo

const styles = StyleSheet.create({})