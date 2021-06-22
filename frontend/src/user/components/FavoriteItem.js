import React from "react";
import { Link } from "react-router-dom";

import "./FavoriteItem.css";

const FavoriteItem = (props) => {
  return <div>
    <li className="favorite-item" key={props.id}>
      
      <div>
        <img className="favorite-item__image" src={props.image} alt={props.name} />
        <div className="heart-container">
          <i
            className="far fa-heart"
            id={props.id}
          ></i>
        </div>
      </div>
      <Link to={`/${props.id}/description`} style={{ textDecoration: "none" }}>
      <div className="favorite-item__info">
        <h2>{props.name}</h2>
      </div>
    </Link>
  </li>
  </div>;
};

export default FavoriteItem;
