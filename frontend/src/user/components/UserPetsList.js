import React from "react";

import UserPetsItem from "./UserPetsItem";
import "./UserPetsList.css";

const UserPetsList = ({ userPets }) => {
 
  return (
    <div>
      <ul className="user-pets-list">
        {userPets.map((pet) => {
          return (
            <UserPetsItem
              id={pet._id}
              key={pet._id}
              name={pet.name}
              image={pet.image}
              type={pet.type}
              breed={pet.breed}
              birthDate={pet.birthDate}
              vaccinated={pet.vaccinated}
              gender={pet.gender}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default UserPetsList;
