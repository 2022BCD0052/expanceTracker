import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors } from '@/constants/theme'

const wallet = () => {
  return (
    <ScreenWrapper style={{backgroundColor:colors.black}}>
      <Text>wallet</Text>
    </ScreenWrapper>
  )
}

export default wallet

const styles = StyleSheet.create({})