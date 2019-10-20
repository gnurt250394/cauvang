import React from 'react'
import { Image, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation'
import screenName from 'configs/screenName'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import R from 'res/R';
import HomeScreen from 'screens/HomeScreen';
import { BottomNavigation, Text } from 'react-native-paper';
import AccountScreen from 'screens/AccountScreen';
import NotificationScreen from 'screens/NotificationScreen';
import utils from 'configs/utils';

export default createBottomTabNavigator(
    {
        [screenName.HomeScreen]: {
            screen: HomeScreen,
            navigationOptions: {
                title: 'Trang chủ',
                tabBarIcon: ({ tintColor }) => <Image source={R.images.icons.home.ic_home} style={[styles.imageTab, { tintColor }]} />,


            }
        },
        [screenName.AccountScreen]: {
            screen: AccountScreen,
            navigationOptions: {
                title: 'Tài khoản',
                tabBarIcon: ({ tintColor }) => <Image source={R.images.icons.home.ic_account} style={[styles.imageTab, { tintColor }]} />,
                tabBarOnPress: ({ navigation, defaultHandler }) => {
                    if (!utils.database.token) {
                        utils.alertWarn("Vui lòng đăng nhập")
                        return
                    }
                    navigation.navigate(screenName.AccountScreen)

                }
            }
        },
        [screenName.NotificationScreen]: {
            screen: NotificationScreen,
            navigationOptions: {
                title: 'Thông báo',
                tabBarIcon: ({ tintColor }) => <Image source={R.images.icons.home.ic_noti} style={[styles.imageTab, { tintColor }]} />,
                tabBarOnPress: ({ navigation, defaultHandler }) => {
                    if (!utils.database.token) {
                        utils.alertWarn("Vui lòng đăng nhập")
                        return
                    }
                    navigation.navigate(screenName.NotificationScreen)
                }
            }
        },
    },
    {
        lazy: true,
        defaultNavigationOptions: {
        },
        tabBarOptions: {
            activeTintColor: R.colors.black,
            activeBackgroundColor: R.colors.secondColor,
            inactiveBackgroundColor: R.colors.defaultColor,
            inactiveTintColor: R.colors.white,
            labelStyle: {
                fontWeight: 'bold',
                fontFamily: R.fonts.Italic
            },


        }

    }
);

const styles = StyleSheet.create({
    imageTab: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
})