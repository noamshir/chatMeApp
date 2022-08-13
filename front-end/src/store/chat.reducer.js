const initialState = {
  chats: [],
};

export function chatReducer(state = initialState, action) {
  let newState = state;
  switch (action.type) {
    case "SET_CHATS":
      newState = { ...state, chats: action.chats };
      break;
    case "ADD_CHAT":
      newState = { ...state, chats: [...state.chats, action.chat] };
      break;
    case "UPDATE_CHAT":
      newState = {
        ...state,
        chats: state.chats.map((chat) =>
          chat._id === action.updatedChat._id ? action.updatedChat : chat
        ),
      };
    default:
      break;
  }
  return newState;
}
