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
    message: 'Hồng Hạc',
    description,
  })
}
function alertSuccess(description) {
  showMessage({
    type: 'success',
    icon: 'success',
    message: 'Hồng Hạc',
    description,
  })
}
function alertNone(description) {
  showMessage({
    type: 'none',
    icon: 'none',
    message: 'Hồng Hạc',
    description,
  })
}
function alertInfo(description) {
  showMessage({
    type: 'info',
    icon: 'info',
    message: 'Hồng Hạc',
    description,
  })
}
function alertDanger(description) {
  showMessage({
    type: 'danger',
    icon: 'danger',
    message: 'Hồng Hạc',
    description,
  })
}

function logout() {
  removeItem(KEY.TOKEN)
  NavigationServices.navigate(screenName.AuthenStack)
  firebase.messaging().deleteToken(database.tokenFCM)
}


function regexName(name) {
  let message
  let validated = true
  if (name.length < 2) {
    message = "Tên không được ít hơn 2 ký tự";
    validated = false
  } else {
    let regex = /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽếềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
    if (!regex.test(name)) {
      message = "Tên không được chứa ký tự đặc biệt";
      validated = false
    }
  }
  return {
    message, validated
  }
}

function regexPhone(phone) {
  let validated = true
  if (!!phone) {
    let message
    if (phone.charAt(0) !== '0' || phone.length != 10) {
      validated = false
      message = "Số điện thoại không đúng định dạng";
    } else {
      let regex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
      if (!regex.test(phone)) {
        message = "Số điện thoại chỉ được chứa số";
        validated = false
      }
    }
    return {
      message, validated
    }
  } else return { validated }
}

function regexPassword(password) {
  let message
  let validated = true
  if (password.length < 6) {
    validated = false,
      message = 'Mật khẩu không được ít hơn 6 ký tự'
  }
  return {
    validated, message
  }
}


function regexEmail(email) {
  let message
  let validated = true
  if (email.length <= 0) {
    message = "Email không được để trống"
    validated = false
  } else {
    let regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!regex.test(email.toLowerCase())) {
      validated = false
      message = "Email chưa đúng"
    }
  }
  return {
    message, validated
  }
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
  logout,
  regexEmail,
  regexPassword,
  regexPhone,
  regexName
}
