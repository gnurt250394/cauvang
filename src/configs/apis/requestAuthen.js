import apis from 'configs/apis'
import utils from 'configs/utils'

export const requestLogin = (username, password) => {
  let params = {
    username,
    password,
    token: utils.database.tokenFCM
  }
  return apis.post(apis.PATH.LOGIN, params)
}
export const requestRegister = (fullname, password, email, phone, gender) => {
  let params = {
    name: fullname,
    password,
    phone,
    email,
    gender
  }
  return apis.post(apis.PATH.REGISTER, params)
}
export const getLogin = () => {
  return apis.fetch(apis.PATH.LOGIN)
}