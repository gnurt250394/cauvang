import AsyncStorage from '@react-native-community/async-storage'

import { Dimensions } from 'react-native';
import { showMessage } from 'react-native-flash-message'
import NavigationServices from 'routes/NavigationServices';
import screenName from './screenName';
import firebase from 'react-native-firebase';
const database = {
  token: '',
  tokenFCM: ''
}
const KEY = {
  TOKEN: 'TOKEN'
}
export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
export const { width, height } = Dimensions.get('window')
async function getItem(key, object) {
  try {
    let params = await AsyncStorage.getItem(key)
    if (object) params = JSON.parse(params)
    return params
  } catch (error) { }
}
function setItem(key, value) {
  try {
    let params = value
    if (typeof value == "object") params = JSON.stringify(value)

    AsyncStorage.setItem(key, params)
  } catch (error) { }
}
function removeItem(key) {
  try {
    AsyncStorage.removeItem(key)
  } catch (error) { }
}
function alertWarn(description) {
  showMessage({
    type: 'warning',
    icon: 'warning',
    message: 'Cảnh báo',
    description,
  })
}
function alertSuccess(description) {
  showMessage({
    type: 'success',
    icon: 'success',
    message: 'Thông báo',
    description,
  })
}
function alertNone(description) {
  showMessage({
    type: 'none',
    icon: 'none',
    message: 'Thông báo',
    description,
  })
}
function alertInfo(description) {
  showMessage({
    type: 'info',
    icon: 'info',
    message: 'Thông tin',
    description,
  })
}
function alertDanger(description) {
  showMessage({
    type: 'danger',
    icon: 'danger',
    message: 'Lỗi!!!',
    description,
  })
}

function logout (){
  removeItem(KEY.TOKEN)
  NavigationServices.navigate(screenName.AuthenStack)
  firebase.messaging().deleteToken(database.tokenFCM)
}
export default {
  getItem,
  setItem,
  removeItem,
  KEY,
  database,
  alertDanger,
  alertInfo,
  alertNone,
  alertSuccess,
  alertWarn,
  guid,
  logout
}
