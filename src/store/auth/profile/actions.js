import { PROFILE_ERROR, PROFILE_SUCCESS, EDIT_PROFILE, RESET_PROFILE_FLAG } from "./actionTypes"

export const editProfile = user => ({
    type: EDIT_PROFILE,
    payload: { user },
  })

export const profileSuccess = msg => ({
    type: PROFILE_SUCCESS,
    payload: msg,
  })

export const profileError = error => ({
    type: PROFILE_ERROR,
    payload: error,
  })

export const resetProfileFlag = error => ({
    type: RESET_PROFILE_FLAG,
  })
