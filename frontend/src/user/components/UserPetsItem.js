import React from "react";

import "./UserPetsItem.css";

import DeletePetModal from "../../shared/Modals/DeletePetModal";
import EditPetModal from "../../shared/Modals/EditPetModal";

const UserPetsItem = (props) => {
  console.log("props", props);
  function calculateAge(birthday) {
    const year = Number(birthday.match(/\d+/g)[0]);
    const month = Number(birthday.match(/\d+/g)[1]);
    const date = new Date(year, month);
    var ageDifMs = Date.now();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - date.getUTCFullYear()) > 1
      ? `${Math.abs(ageDate.getUTCFullYear() - date.getUTCFullYear())} years`
      : `${Math.abs(ageDate.getUTCMonth() - date.getUTCMonth())} months`;
  }

  return (
    <li className="user-pet-item" key={props.id}>
      <div>
        <DeletePetModal name={props.name} id={props.id} />

        <EditPetModal
          title="Edit pet"
          buttonClassName="edit-container"
          image={props.image}
          name={props.name}
          type={props.type}
          birthDate={props.birthDate}
          breed={props.breed}
          vaccinated={props.vaccinated}
          gender={props.gender}
          id={props.id}
        />
        <img
          className="user-pet-item__image"
          src={props.image}
          alt={props.name}
        />
      </div>
      <div className="user-pet-item__name">
        <h2>
          <b>Name:</b> {props.name}
        </h2>
        <h2>
          <b>Type:</b> {props.type}
        </h2>
        <h2>
          <b>Age:</b> {calculateAge(props.birthDate)}
        </h2>
        <h2>
          <b>Gender:</b> {props.gender}
        </h2>
        <h2>
          <b>Breed:</b> {props.breed}
        </h2>
        <h2>
          <b>Vaccinated:</b> {props.vaccinated ? "Yes" : "No"}
        </h2>
      </div>
    </li>
  );
};

export default UserPetsItem;
