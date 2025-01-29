import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '@/components/Button'
import Typo from '@/components/Typo'
import { colors } from '@/constants/theme'
import { signOut } from 'firebase/auth'
import { auth } from '@/config/firebase'
import { useAuth } from '@/context/authContext'
import ScreenWrapper from '@/components/ScreenWrapper'

const Home = () => {
  const {user}  = useAuth();
  console.log("user",user);
    const handleLogOut =async () => {

        // Log out
        await signOut(auth)
    }
  return (
    <ScreenWrapper>
        <Text></Text>

        {/* Home Page Content */}
        {/* Navigation */}
        {/* Dynamic Content */}
        {/* Footer */}
        {/* Loading Screen */}
        {/* Error Screen */}
        {/* Empty Screen */}
        {/* Profile Screen */}

        {/* Settings Screen */}
      
    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({})