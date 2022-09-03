import { authService } from '../services/auth.service'

export function login(user) {
  return async (dispatch) => {
    const loggedUser = await authService.login(user)
    if (!loggedUser) return false
    dispatch({ type: 'SET_USER', user: loggedUser })
    return true
  }
}

export function signup(user) {
  return async (dispatch) => {
    const newUser = await authService.signup(user)
    if (!newUser) return false
    dispatch({ type: 'SET_USER', user: newUser })
    return true
  }
}

export function logout() {
  return async (dispatch) => {
    await authService.logout()
    dispatch({ type: 'SET_USER', user: null })
  }
}
