import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Typo from '@/components/Typo'

const wallet = () => {
  const getTotalBalanced = (): number => {
    return  2222
    // Replace with actual logic to get the total balance
    return 0;
  }
  return (
    <ScreenWrapper style={{backgroundColor:colors.black}}>
      <View style={styles.container}>
        {/*  balanced view */}
        <View style={styles.balanceView}>
          <View style={{alignItems:'center'}}>
            <Typo size={45} fontWeight={"800"}>
              ${
                getTotalBalanced()?.toFixed(2)
              }
            </Typo>

          </View>



        </View>

        </View>
    </ScreenWrapper>
  )
}

export default wallet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent : 'space-between'
  },
  balanceView: {
    height: verticalScale(160),
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._10,
  },
  wallets: {
    flex: 1,
    backgroundColor: colors.neutral900,
    borderTopRightRadius: radius._30,
    borderTopLeftRadius: radius._30,
    padding: spacingX._20,
    paddingTop: spacingX._25,
  },
  listStyle: {
    paddingVertical: spacingY._25,
    paddingTop: spacingY._15,
  },
});

