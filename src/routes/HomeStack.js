import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import screenName from 'configs/screenName'
import HomeScreen from 'screens/HomeScreen'
import { fromLeft, zoomIn, zoomOut, fadeIn, fadeOut, flipX, flipY, fromBottom, fromRight, fromTop, } from 'react-navigation-transitions';
import RegisterScreen from 'screens/Register/RegisterScreen';
import BottomTabStack from './BottomTabStack';
import ScheduleScreen from 'screens/Schedule/ScheduleScreen';
import FollowHealthScreen from 'screens/FollowHealth/FollowHealthScreen';
import DetailScheduleScreen from 'screens/Schedule/DetailScheduleScreen';
import NoteDoctorScreen from 'screens/FollowHealth/NoteDoctorScreen';
import DrugScreen from 'screens/drug/DrugScreen';
import BookingDrugScreen from 'screens/drug/BookingDrugScreen';
import ConfirmBookingScreen from 'screens/drug/ConfirmBookingScreen';
import MessageScreen from 'screens/community/MessageScreen';
import ListDoctorScreen from 'screens/community/ListDoctorScreen';
import CallVideoScreen from 'screens/community/CallVideoScreen';
import authenStack from './AuthenStack';
const handleCustomTransition = ({ scenes }) => {
    const prevScene = scenes[scenes.length - 2];
    const nextScene = scenes[scenes.length - 1];
    // Custom transitions go there
    if (prevScene
        && prevScene.route.routeName === screenName.HomeScreen
        && nextScene.route.routeName === screenName.HomeScreen) {
        return zoomIn();
    } else if (prevScene
        && prevScene.route.routeName === screenName.HomeScreen
        && nextScene.route.routeName === screenName.ScheduleScreen) {
        return fromBottom();
    }
    else if (prevScene
        && prevScene.route.routeName === screenName.BookingDrugScreen
        && nextScene.route.routeName === screenName.ConfirmBookingScreen) {
        return fromBottom();
    }
    return fromRight();
}
const homeStack = createStackNavigator({
    [screenName.HomeScreen]: { screen: BottomTabStack },
    [screenName.ScheduleScreen]: { screen: ScheduleScreen },
    [screenName.FollowHealthScreen]: { screen: FollowHealthScreen },
    [screenName.DetailScheduleScreen]: { screen: DetailScheduleScreen },
    [screenName.NoteDoctorScreen]: { screen: NoteDoctorScreen },
    [screenName.DrugScreen]: { screen: DrugScreen },
    [screenName.BookingDrugScreen]: { screen: BookingDrugScreen },
    [screenName.ConfirmBookingScreen]: { screen: ConfirmBookingScreen },
    [screenName.MessageScreen]: { screen: MessageScreen },
    [screenName.ListDoctorScreen]: { screen: ListDoctorScreen },
    [screenName.VideoCallScreen]: { screen: CallVideoScreen },
    [screenName.AuthenStack]: { screen: authenStack },

}, {
    initialRouteName: screenName.AuthenStack,
    headerMode: 'none',
    transitionConfig: (transitionProps) => handleCustomTransition(transitionProps),
})

export default homeStack