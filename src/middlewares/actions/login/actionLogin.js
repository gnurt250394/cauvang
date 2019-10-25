import actionTypes from "../actionTypes"

const _login = (payload) => {
    return {
        type: actionTypes.LOGIN,
        payload
    }
}
const _logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}
export const login = (payload) => {
    return (dispatch, getState) => {
        dispatch(_login(payload))
    }
}

export const logout = () => {
    return (dispatch, getState) => {
        dispatch(_logout())
    }
}