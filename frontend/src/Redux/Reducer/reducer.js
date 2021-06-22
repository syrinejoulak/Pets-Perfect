import {
  GET_PETS,
  GET_USERS,
  GET_PET_BY_ID,
  GET_USER_BY_ID,
  GET_USER_PETS,
  UPDATE_USER_PROFIL,
  ADD_PET_POST,
  SIGN_UP,
  LOGIN,
  LOGOUT,
  DELETE_PET,
  EDIT_A_PET,
} from "../Actions/ActionType";

const initialState = {
  allPets: [],
  loadingPets: true,

  allUsers: [],
  loadingUsers: true,

  user: {},
  loadingUser: true,

  pet: {},
  loadingPet: true,

  userPets: [],
  loadingUserPets: true,

  userId: null,
  isLoggedIn: false,
  isLoading: false,
  token: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PETS:
      return { ...state, allPets: payload, loadingPets: false };

    case GET_USERS:
      return { ...state, allUsers: payload, loadingUsers: false };

    case GET_PET_BY_ID:
      return { ...state, pet: payload, loadingPet: false };

    case GET_USER_BY_ID:
      return { ...state, user: payload, loadingUser: false };

    case GET_USER_PETS:
      return { ...state, userPets: payload, loadingUserPets: false };

    case UPDATE_USER_PROFIL:
      return { ...state, user: payload, loadingUser: false };
    case EDIT_A_PET:
      return { ...state, pet: payload, loadingPet: false };

    case ADD_PET_POST:
      return {
        ...state,
        allPets: [payload, ...state.allPets],
        userPets: [payload, ...state.userPets],
      };
    case DELETE_PET:
      let userPost = [...state.userPets];
      userPost.filter((pet) => pet._id !== payload);
      return { ...state, userPets: userPost };
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        token: payload.token,
        userId: payload.userId,
      };
    case SIGN_UP:
      return {
        ...state,
        isLoggedIn: true,
        token: payload.token,
        userId: payload.userId,
      };
    case LOGOUT:
      return {
        ...state,
        isLoading: false,
        token: null,
        user: null,
        isAuth: null,
      };

    default:
      return state;
  }
};

export default reducer;
