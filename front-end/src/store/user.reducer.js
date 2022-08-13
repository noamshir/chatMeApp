import { authService } from "../services/auth.service";

const initialState = {
  user: authService.getLoggedUser(),
  msg: null,
};

export function userReducer(state = initialState, action) {
  let newState = state;
  switch (action.type) {
    case "SET_USER":
      newState = { ...state, user: action.user };
      break;
    default:
      break;
  }
  return newState;
}
