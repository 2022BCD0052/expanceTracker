import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '@/components/Button'
import Typo from '@/components/Typo'
import { colors } from '@/constants/theme'
import { signOut } from 'firebase/auth'
import { auth } from '@/config/firebase'

const Home = () => {
    const handleLogOut =async () => {

        // Log out
        await signOut(auth)
    }
  return (
    <View>
        <Text>Home</Text>
        {/* Home Page Content */}
        {/* Navigation */}
        {/* Dynamic Content */}
        {/* Footer */}
        {/* Loading Screen */}
        {/* Error Screen */}
        {/* Empty Screen */}
        {/* Profile Screen */}
        {/* Settings Screen */}
        <Button onPress={handleLogOut}>
            <Typo color={colors.black}></Typo>
        </Button>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})