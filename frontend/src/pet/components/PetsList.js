import React from "react";
import NoPetFound from "./NoPetFound";
import PetItem from "./PetItem";
import "./PetsList.css";

const PetsList = ({ items }) => {
  return (
    <div>
      <ul className="pets-list">
        {items.map((pet, i) => {
          if (pet) {
            return (
              <PetItem
                key={i}
                id={pet._id}
                name={pet.name}
                image={pet.image}
                breed={pet.breed}
                birthDate={pet.birthDate}
                gender={pet.gender}
              />
            );
          } else {
            return <NoPetFound></NoPetFound>;
          }
        })}
      </ul>
    </div>
  );
};

export default PetsList;
