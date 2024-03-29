import { StackActions, NavigationActions, DrawerActions } from 'react-navigation'
let _navigator;
function setTopNavigator(refNavigator) {
    _navigator = refNavigator
}

function navigate(routeName, params, action) {
    _navigator.dispatch(NavigationActions.navigate({
        routeName,
        params,
        action
    }))
}
function pop() {
    _navigator.dispatch(StackActions.pop())
}
function reset(routeName, params, actions) {
    _navigator.dispatch(StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate(routeName, params, actions)],
    }))
}
function replace(routeName, params, action) {
    _navigator.dispatch(StackActions.replace({
        routeName,
        params,
        action
    }))
}
function toggleDrawer() {
    _navigator.dispatch(DrawerActions.toggleDrawer())
}
export default {
    setTopNavigator,
    navigate,
    pop,
    reset,
    replace,
    toggleDrawer
}