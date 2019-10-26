import actionTypes from 'middlewares/actions/actionTypes'
import utils from 'configs/utils'
import NavigationServices from 'routes/NavigationServices'
import screenName from 'configs/screenName'
import firebase from 'react-native-firebase'

const initialState = {
  userApp: {},
  count: 0
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        userApp: action.payload,
        count: action.count
      }
    case actionTypes.LOGOUT:
      utils.removeItem(utils.KEY.TOKEN)
      NavigationServices.navigate(screenName.AuthenStack)
      firebase.messaging().deleteToken(utils.database.tokenFCM)
      return {
        ...state,
        userApp: {},
        count: 0
      }
    case actionTypes.NOTIFICATION:
      return {
        ...state,
        count: action.count
      }
    default:
      return state
  }
}
export default loginReducer
