import {  ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { scale, verticalScale } from '@/utils/styling'
import ScreenWrapper from '@/components/ScreenWrapper'
import ModalWrapper from '@/components/ModalWrapper'
import Header from '@/components/Header'
import BackButton from '@/components/BackButton'
import { getProfileImage } from '@/services/imageService'
import { User } from 'phosphor-react-native'
import { Image } from 'expo-image'

const profileModal = () => {
  return (
    <ModalWrapper>
        <View style={styles.container}>
            <Header
            title=" Update Profile"
            leftIcon={<BackButton />}
            style={{ marginBottom: spacingY._10 }}
            />
            {/* <ProfileForm /> */}
            <ScrollView
            contentContainerStyle={styles.form}
            
            >
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Image
                    source={getProfileImage('null')}
                    style={styles.avatar}
                    contentFit='cover'
                    transition={100}
                    
                  />
                </View>
            

              </View>
            </ScrollView>
          
          </View>
    </ModalWrapper>
  )
}

export default profileModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: spacingX._20,
        paddingVertical: spacingY._20,
      },
    footer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: spacingX._20,
        gap: scale(12),
        paddingTop: spacingY._15,
        borderTopColor: colors.neutral700,
        marginBottom: spacingY._5,
        borderTopWidth: 1,
      },
      
      form: {
        gap: spacingY._30,
        marginTop: spacingY._15,
      },
      
      avatarContainer: {
        position: "relative",
        alignSelf: "center",
      },
      
      avatar: {
        alignSelf: "center",
        backgroundColor: colors.neutral300,
        height: verticalScale(135),
        width: verticalScale(135),
        borderRadius: 200,
        borderWidth: 1,
        borderColor: colors.neutral500,
        // overflow: "hidden",
        // position: "relative",
      },
    editIcon: {
      position: "absolute",
      bottom: spacingY._5,
      right: spacingY._7,
      borderRadius: 100,
      backgroundColor: colors.neutral100,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 4,
      padding: spacingY._7, // Fixed spacing issue here
    },
    inputContainer: {
      gap: spacingY._10, // Fixed misplaced closing bracket
    },
  });
  