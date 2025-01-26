import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Header from '@/components/Header'
import BackButton from '@/components/BackButton'
import Typo from '@/components/Typo'
import { useAuth } from '@/context/authContext'

const profile = () => {
  const {user} = useAuth()
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header 
        title='Profile'
        leftIcon={<BackButton  iconSize={26}  />}
        style={{marginVertical : spacingY._10}}

        />
        {/* user info  */}
        <View style={styles.userInfo}>
          {/* avator */}
          <View></View>
          {/* user image */}
          {/* name and email */}
          <View style={styles.nameContainer}>
            <Typo size={24} fontWeight={"600"} color={colors.neutral100}> {user?.name}</Typo>
          </View>
          <View style={styles.nameContainer}>
            <Typo size={15} fontWeight={"600"} color={colors.neutral400}> {user?.email}</Typo>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  userInfo: {
    marginTop: verticalScale(30),
    alignItems: "center",
    gap: spacingY._15,
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
    // overflow: "hidden", // Uncomment if needed
    // position: "absolute",
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 8,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding : 5,
  },
 
  nameContainer: {
    alignItems: "center",
    gap: verticalScale(4),
  },
  ListIcon: {
    height: verticalScale(44),
    width: verticalScale(44),
    backgroundColor: colors.neutral500,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius._15, // Ensure radius._15 exists in your utilities
    borderCurve: "continuous", // Optional: check if this property is supported
  },
  listItem: {
    marginBottom: verticalScale(17),
  },
  accountOptions: {
    marginTop: spacingY._35,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._10,
  },
});

