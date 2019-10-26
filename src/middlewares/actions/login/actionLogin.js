import actionTypes from "../actionTypes"

const _login = (payload, count) => {
    return {
        type: actionTypes.LOGIN,
        payload,
        count
    }
}
const _logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}
export const login = (payload, count) => {
    return (dispatch, getState) => {
        dispatch(_login(payload, count))
    }
}

export const logout = () => {
    return (dispatch, getState) => {
        dispatch(_logout())
    }
}