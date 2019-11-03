import React from 'react'
import { Image, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation'
import screenName from 'configs/screenName'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import R from 'res/R';
import utils from 'configs/utils';
import ListDoctorScreen from 'screens/community/ListDoctorScreen';
import HistoryMessageScreen from 'screens/community/HistoryMessageScreen';

export default createAppContainer(createMaterialTopTabNavigator(
    {
        [screenName.ListDoctorScreen]: {
            screen: ListDoctorScreen,
            navigationOptions: {
                title: 'Danh sách bác sĩ',


            }
        },
        [screenName.HistoryMessage]: {
            screen: HistoryMessageScreen,
            navigationOptions: {
                title: 'Lịch sử',
                // tabBarOnPress: ({ navigation, defaultHandler }) => {
                //     if (!utils.database.token) {
                //         utils.alertWarn("Vui lòng đăng nhập")
                //         return
                //     }
                //     navigation.navigate(screenName.AccountScreen)

                // }
            }
        },
    },
    {
        resetOnBlur: true,
        lazy: true,
        defaultNavigationOptions: {
        },
        tabBarOptions: {
            labelStyle: {
                fontWeight: 'bold',
                fontFamily: R.fonts.Italic,
            },
            activeTintColor:R.colors.black,
            inactiveTintColor:R.colors.black,
            indicatorStyle:{
                backgroundColor:R.colors.secondColor,
                height:'100%',
                borderRadius:20,
                zIndex: 10000,
            },
            style:{
                backgroundColor:R.colors.green,
                margin:10,
            },
            tabStyle:{
                backgroundColor:'transparents'
            }
        }

    }
));

const styles = StyleSheet.create({
    imageTab: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
})