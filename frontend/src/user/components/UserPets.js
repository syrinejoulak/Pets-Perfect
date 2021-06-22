import React, { useEffect } from "react";

import { useSelector } from "react-redux";

import { getUserPets } from "../../Redux/Actions/Action";

import "./UserPets.css";

import AddAPetModal from "../../shared/Modals/AddAPetModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import UserPetsList from "./UserPetsList";

const UserPets = ({ uid, dispatch }) => {
  const { userPets, loadingUserPets } = useSelector((state) => state);

  useEffect(() => {
    if (uid) dispatch(getUserPets(uid));
  }, [uid]);

  return (
    <div className="user-pet-info">
      {loadingUserPets ? (
        <LoadingSpinner />
      ) : (
        <div className="user-pet-card">
          <h2>Your current pets</h2>
          <hr />

          {userPets.length === 0 ? (
            <div className="no-user-pets" style={{ textAlign: "center" }}>
              <h4>No current pets here. </h4>
              <h4>Need to find your pet a New home?</h4>
              <h4>Click on the "Add a pet" button</h4>
            </div>
          ) : (
            <i>
              <UserPetsList userPets={userPets} />
            </i>
          )}
          <AddAPetModal
            title="Add a pet"
            buttonClassName="add-button"
            uid={uid}
          />
        </div>
      )}
    </div>
  );
};

export default UserPets;
