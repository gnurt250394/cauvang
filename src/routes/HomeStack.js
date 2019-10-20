import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import screenName from 'configs/screenName'
import HomeScreen from 'screens/HomeScreen'
import { fromLeft, zoomIn, zoomOut ,fadeIn,fadeOut,flipX,flipY,fromBottom,fromRight,fromTop,} from 'react-navigation-transitions';
import RegisterScreen from 'screens/Register/RegisterScreen';
import BottomTabStack from './BottomTabStack';
import ScheduleScreen from 'screens/Schedule/ScheduleScreen';
import FollowHealthScreen from 'screens/FollowHealth/FollowHealthScreen';
const handleCustomTransition = ({ scenes }) => {
    const prevScene = scenes[scenes.length - 2];
    const nextScene = scenes[scenes.length - 1];
    // Custom transitions go there
    if (prevScene
        && prevScene.route.routeName === screenName.HomeScreen
        && nextScene.route.routeName === screenName.HomeScreen) {
        return zoomIn();
    } else if (prevScene
        && prevScene.route.routeName === 'ScreenB'
        && nextScene.route.routeName === 'ScreenC') {
        return zoomOut();
    }
    return fromBottom();
}
const homeStack = createStackNavigator({
    [screenName.HomeScreen]: { screen: BottomTabStack },
    [screenName.ScheduleScreen]: { screen: ScheduleScreen },
    [screenName.FollowHealthScreen]: { screen: FollowHealthScreen },

}, {
    headerMode: 'none',
    transitionConfig: (transitionProps) => handleCustomTransition(transitionProps),
})

export default homeStack