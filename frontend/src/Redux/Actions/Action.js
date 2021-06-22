import {
  GET_PETS,
  GET_USERS,
  GET_PET_BY_ID,
  GET_USER_BY_ID,
  GET_USER_PETS,
  UPDATE_USER_PROFIL,
  DELETE_USER,
  ADD_PET_POST,
  LOGIN,
  SIGN_UP,
  LOGOUT,
  DELETE_PET,
  EDIT_A_PET,
  GET_AUTH_USER,
} from "./ActionType";

import axios from "axios";

export const getPets = () => (dispatch) => {
  axios.get("http://localhost:5000/api/pets/").then((res) => {
    dispatch({
      type: GET_PETS,
      payload: res.data,
    });
  });
};

export const getUsers = () => (dispatch) => {
  axios.get("http://localhost:5000/api/user").then((res) => {
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  });
};

export const getPetById = (id) => (dispatch) => {
  axios.get("http://localhost:5000/api/pets/" + id).then((res) => {
    dispatch({
      type: GET_PET_BY_ID,
      payload: res.data.pet,
    });
  });
};

export const getUserPets = (id) => (dispatch) => {
  axios.get("http://localhost:5000/api/user/pets/" + id).then((res) => {
    dispatch({
      type: GET_USER_PETS,
      payload: res.data.userPets,
    });
  });
};

export const getUserById = (id) => (dispatch) => {
  axios.get("http://localhost:5000/api/user/profil/" + id).then((res) => {
    dispatch({
      type: GET_USER_BY_ID,
      payload: res.data.user,
    });
  });
};

export const updateUserProfil = (id, formData) => (dispatch) => {
  axios
    .patch("http://localhost:5000/api/user/profil/" + id, formData)
    .then((res) => {
      dispatch({
        type: UPDATE_USER_PROFIL,
        payload: res.data.updatedUserProfil,
      });
    });
};

export const deleteUser = (id) => (dispatch) => {
  axios.delete("http://localhost:5000/api/user/profil/" + id).then((res) => {
    dispatch({
      type: DELETE_USER,
    });
  });
};

export const deletePet = (id) => (dispatch) => {
  axios.delete("http://localhost:5000/api/pets/" + id).then((res) => {
    dispatch({
      type: DELETE_PET,
      payload: res.data._id,
    });
  });
};

export const editAPet = (id, formData) => (dispatch) => {
  axios.patch("http://localhost:5000/api/pets/" + id, formData).then((res) => {
    dispatch({
      type: EDIT_A_PET,
      payload: res.data.updatedPetPost,
    });
  });
};

export const addPetPost = (formData) => (dispatch) => {
  axios.post("http://localhost:5000/api/pets/", formData).then((res) =>
    dispatch({
      type: ADD_PET_POST,
      payload: res.data.pet,
    })
  );
};

export const login = (formData) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/user/login", formData)
    .then((res) => {
      dispatch({
        type: LOGIN,
        payload: res.data,
      });
      localStorage.setItem(
        "userData",
        JSON.stringify({ token: res.data.token })
      );
    })
    .catch((err) => {
      console.log("err", err.message);
    });
};

export const signUp = (formData) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/user/signup", formData)
    .then((res) => {
      console.log("res", res);

      dispatch({
        type: SIGN_UP,
        payload: res.data,
      });
      localStorage.setItem(
        "userData",
        JSON.stringify({ token: res.data.token })
      );
    })
    .catch((err) => {
      console.log("err", err.message);
    });
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: LOGOUT,
  });
};
