import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Typo from './Typo'
import { AlignLeft } from 'phosphor-react-native' // Import icon if necessary
import { HeaderProps } from '@/types'

export default function Header({ title = "", leftIcon, style }: HeaderProps) {
  return (
    <View style={[styles.container, style]}>
      {
        leftIcon && (
          <View style={styles.leftIcon}>
            {leftIcon} {/* Render the passed leftIcon */}
          </View>
        )
      }
      <Typo size={22} fontWeight="600" style={{
        textAlign: 'center',
        width: leftIcon ? '80%' : '100%', // Adjust width if there's a left icon
      }}>
        {title}
      </Typo>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent:"space-between",
    alignItems: 'center',
    flexDirection: 'row',
    
    paddingHorizontal: 10, // Optional padding for spacing
  },
  leftIcon: {
    position: 'absolute',
    // left: 10, // Align the icon to the left
    zIndex: 1, // Make sure the icon is above the text
  },
  rightIcon: {},
})
