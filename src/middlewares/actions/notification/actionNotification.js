import actionTypes from "../actionTypes"

const _notification = (count) => {
    return {
        type: actionTypes.NOTIFICATION,
        count
    }
}

export const updateCountNoti = (count) => {
    return (dispatch, getState) => {
        dispatch(_notification(count))
    }
}