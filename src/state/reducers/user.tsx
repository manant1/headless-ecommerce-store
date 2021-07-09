import { actionTypes } from "../actions/user"
import User from "../../shared/models/user"

export interface UserState {
  userData: User
}

const initialState: UserState = {
  userData: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER: {
      return {
        ...state,
        userData: action.user
      }
    }
    case actionTypes.REMOVE_USER: {
      return initialState
    }
    default:
      return state
  }
};
