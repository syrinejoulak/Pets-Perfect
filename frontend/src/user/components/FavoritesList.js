import React from "react";

import "./FavoritesList.css";
import FavoriteItem from "./FavoriteItem";

const FavoritesList = ({ items }) => {
  return (
    <div className="favorite-list__container">
      <ul className="favorite-list">
        {items.map((pet) => {
          return (
            <FavoriteItem
              id={pet.petId}
              key={pet.petId}
              name={pet.name}
              image={pet.image}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default FavoritesList;
