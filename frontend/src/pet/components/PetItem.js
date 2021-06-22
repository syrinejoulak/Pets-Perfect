import React from "react";
import { Link } from "react-router-dom";



import { GiFemale, GiMale } from "react-icons/gi";

import "./PetItem.css";

const PetItem = (props) => {
  return (
    <li className="Pet-item" key={props.id}>
      <div>
        <img className="Pet-item__image" src={props.image} alt={props.name} />
        <div className="gender-container">
          <i className="gender">
            {" "}
            {props.gender === "Male" ? <GiMale /> : <GiFemale />}
          </i>
        </div>
      </div>
      <Link to={`/description/${props.id}`} style={{ textDecoration: "none" }}>
        <div className="Pet-item__info">
          <h2 className="pet-item__name">{props.name}</h2>
        </div>
      </Link>
    </li>
  );
};

export default PetItem;
