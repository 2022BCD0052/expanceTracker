import { View, Platform, TouchableOpacity, StyleSheet } from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { Text, PlatformPressable } from "@react-navigation/elements";
import *as Icons from "phosphor-react-native"
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { colors, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";

export default function CustomTabs({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const tabbarIcons : any = {

    index : (isFocussed:Boolean)=>(
      <Icons.House
      size={verticalScale(30)}
      color={isFocussed ? colors.primary : colors.neutral400}
      weight={isFocussed ? "fill" : "regular"}
      />
    ),
    statistics : (isFocussed:Boolean)=>(
      <Icons.ChartBar
      size={verticalScale(30)}
      color={isFocussed? colors.primary : colors.neutral400}
      weight={isFocussed? "fill" : "regular"}
      />
    ),
    wallet : (isFocussed:Boolean)=>(
      <Icons.Wallet
      size={verticalScale(30)}
      color={isFocussed? colors.primary : colors.neutral400}
      weight={isFocussed? "fill" : "regular"}
      />
    ),
    profile : (isFocussed:Boolean)=>(
      <Icons.Person
      size={verticalScale(30)}
      color={isFocussed? colors.primary : colors.neutral400}
      weight={isFocussed? "fill" : "regular"} 
      />
    )
  }
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: any =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            // href={buildHref(route.name, route.params)}
            key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem }
          >
            <Text
              style={{ color: isFocused ? colors.primary : colors.neutral800 }}
            >
              {
                tabbarIcons[route.name] && tabbarIcons[route.name](isFocused)
              }
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// Usage

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    width: "100%",
    height: Platform.OS==='ios'?verticalScale(73):verticalScale(55),
    justifyContent:"space-between",
    alignItems:"center",
    backgroundColor: colors.neutral700,
    borderTopWidth: 1,
    borderTopColor: colors.neutral300,
    paddingHorizontal: 20,

  },
  tabBarItem: {
    flex: 1,
    marginBottom : Platform.OS === 'ios' ?spacingY._10 : spacingY._5,
    justifyContent: "center",
    alignItems: "center",
  },
});
 