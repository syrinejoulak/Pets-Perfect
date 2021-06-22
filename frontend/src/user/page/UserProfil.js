import React from "react";

import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";

import "./UserProfil.css";
import UserInfo from "../components/UserInfo";
import UserPets from "../components/UserPets"; 

const UserProfil = ({ setIsLoggedIn }) => {
  const uid = useParams().userId;

  const dispatch = useDispatch();

  return (
    <div className="user-profil">
      <UserInfo uid={uid} dispatch={dispatch} setIsLoggedIn={setIsLoggedIn} />
      <UserPets uid={uid} dispatch={dispatch} />
    </div>
  );
};

export default UserProfil;
