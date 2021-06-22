import React, { useEffect } from "react";

import { useSelector } from "react-redux";

import { getUserById } from "../../Redux/Actions/Action";

import { AiOutlineMail } from "react-icons/ai";
import { MdLocationCity } from "react-icons/md";

import DeleteAcountModal from "../../shared/Modals/DeleteAcountModal";
import UserModal from "../../shared/Modals/UserModal";
import "./UserInfo.css";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";

const UserInfo = ({ uid, dispatch, setIsLoggedIn }) => {
  const { loadingUser, user } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getUserById(uid));
  }, []);

  return (
    <div className="user-info">
      {loadingUser ? (
        <LoadingSpinner />
      ) : (
        <div className="user-card">
          <h2>
            {user.name.charAt(0).toUpperCase() + user.name.slice(1)}{" "}
            <div className="profil-icons-container">
              <UserModal user={user} />
              <DeleteAcountModal
                name={user.name}
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                dispatch={dispatch}
              />
            </div>{" "}
          </h2>
          <hr />
          <i>
            <AiOutlineMail /> {user.email}
          </i>
          <i>
            <MdLocationCity /> {user.city}
          </i>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
