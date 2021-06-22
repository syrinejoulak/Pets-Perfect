import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { GiCat } from "react-icons/gi";
import { FaDog } from "react-icons/fa";
import { GiFemale, GiMale } from "react-icons/gi";
import {
  AiOutlineCheckCircle,
  AiOutlineMail,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import "./PetDescription.css";
import { getPetById, getUserById } from "../../Redux/Actions/Action";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";

const PetDescription = () => {
  const { loadingPet, loadingUser, pet, user } = useSelector((state) => state);
  const petId = useParams().petId;

  const dispatch = useDispatch();
  const owner = pet.userId;

  useEffect(() => {
    dispatch(getPetById(petId));
  }, []);
  useEffect(() => {
    if (owner) dispatch(getUserById(owner));
  }, [owner]);

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
    <div className="container__pet-description">
      {loadingPet && loadingUser ? (
        <LoadingSpinner />
      ) : (
        <React.Fragment>
          <div className="container__pet-description">
            <div className="box__pet-description">
              <div className="content">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="image__pet-description"
                />
              </div>
            </div>
            <div className="info__pet-description">
              <h1 className="text__pet-description">{pet.name}</h1>
              <i> {pet.type === "Dog" ? <FaDog /> : <GiCat />}</i>
              <i> {pet.gender === "Male" ? <GiMale /> : <GiFemale />}</i>
              <h2 className="text__pet-description">Breed</h2>
              <h4 className="text__pet-description">{pet.breed}</h4>
              <h2 className="text__pet-description">Age</h2>
              <h4 className="text__pet-description">
                {calculateAge(pet.birthDate)}
              </h4>
              <h2 className="text__pet-description">
                Vaccinated{" "}
                <i>
                  {pet.vaccinated === "Yes" ? (
                    <AiOutlineCheckCircle />
                  ) : (
                    <AiOutlineCloseCircle />
                  )}
                </i>{" "}
              </h2>
            </div>
            <div className="contact__pet-description">
              <div className="card__pet-description">
                <h3>Think you and {pet.name} might be a match?</h3>
                <button className="add-to-favorite___pet-description">
                  <i className="far fa-heart"></i>Add to favorites
                </button>
                <h3>Feel free to contact the owner {user.name}:</h3>
                <i>
                  <AiOutlineMail /> {user.email}{" "}
                </i>
              </div>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default PetDescription;
