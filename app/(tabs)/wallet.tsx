import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import Typo from '@/components/Typo';
import * as Icons from "phosphor-react-native";
import { useRouter } from 'expo-router';

const Wallet = () => {
  const router = useRouter();

  const getTotalBalance = (): number => {
    return 2222;
  };

  return (
    <ScreenWrapper >
      <View style={styles.container}>
        <View style={styles.balanceView}>
          <View style={{ alignItems: 'center' }}>
            <Typo size={45} fontWeight="800">
              ${getTotalBalance()?.toFixed(2)}
            </Typo>
            <Typo size={16} color={colors.neutral300}>
              Total Balance
            </Typo>
          </View>
        </View>

        <View style={styles.wallets}>
          <View style={styles.flexRow}>
            <Typo size={20} fontWeight="700">
              Wallets
            </Typo>
            <TouchableOpacity onPress={() => router.push("/(modals)/walletModal")}>
              <Icons.PlusCircle size={verticalScale(33)} color={colors.primary} weight="fill" />
            </TouchableOpacity>
          </View>

          <View style={styles.listStyle}>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  balanceView: {
    height: verticalScale(160),
    // backgroundColor: "transparent",
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
