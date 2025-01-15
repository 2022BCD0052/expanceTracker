import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BackButtonProps } from '@/types'
import { useRouter } from 'expo-router';
import { CaretLeft } from 'phosphor-react-native';
import { verticalScale } from '@/utils/styling';
import { colors } from '@/constants/theme';

const BackButton = ({
    style,
    iconSize = 26
}:BackButtonProps) => {
    const router = useRouter();
  return (
  <TouchableOpacity style={[styles.button,style]} onPress={() => router.back()}>

<View>
            <CaretLeft size={verticalScale(iconSize)} weight="bold" color={colors.white}/>

</View>


  </TouchableOpacity>
  )
}

export default BackButton

const styles = StyleSheet.create({
    button :{
        width : 30,
        height : 30,
        borderRadius : 15,
        backgroundColor : 'rgba(0,0,0,0.1)'
    }
})