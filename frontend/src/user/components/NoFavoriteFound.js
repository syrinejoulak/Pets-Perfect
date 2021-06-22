import React from "react";

import "./NoFavoriteFound.css";

const NoFavoriteFound = () => {
  return (
    <div className="no-favorite">
      <h1>No favorites here yet</h1>
      <h3>
        When you find a pet you love, add it to your
        <br /> favorites list by tapping the favorite button{" "}
        <i className="far fa-heart"></i>
      </h3>
    </div>
  );
};

export default NoFavoriteFound;
