import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Typo from './Typo'
import { AlignLeft } from 'phosphor-react-native'
import { HeaderProps } from '@/types'

export default function Header( { title ="",leftIcon,style}:HeaderProps) {
  return (
    <View style={styles.container}>
        {
            leftIcon && <View style={styles.leftIcon}></View>
        }
{
    <Typo size={22} fontWeight='600' style={{textAlign:'center' ,
        width : leftIcon ? '80%' : '100%', 

    }}>
        {title}
    </Typo>
}

      <Typo>Header</Typo>
    </View>
  )
}

const styles = StyleSheet.create({
    container :{
        width : '100%',
        alignItems : 'center',
        flexDirection : 'row',
    },
    leftIcon : {
        alignSelf : 'flex-start',
    },
    rightIcon : {},

}) 