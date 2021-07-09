import User from "../../shared/models/user"

export const actionTypes = {
  ADD_USER: 'ADD_USER',
  REMOVE_USER: 'REMOVE_USER'
};

export const addUser = (user: User) => ({type: actionTypes.ADD_USER, user});
export const removeUser = (email: string) => ({type: actionTypes.REMOVE_USER, email})