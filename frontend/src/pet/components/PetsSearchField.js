import React, { useState, useEffect } from "react";

import "./PetsSearchField.css";
import axios from "axios";

const PetsSearchField = ({
  selectedGender,
  selectedType,
  selectedBreed,
  selectedAge,
  setSelectedAge,
  setSelectedBreed,
  setSelectedGender,
  setSelectedType,
}) => {
  const [dogBreed, setDogBreed] = useState([]);
  const [catBreed, setCatBreed] = useState([]);

  const getDogBreed = () => {
    axios
      .get("https://dog.ceo/api/breeds/list/all")
      .then((res) => setDogBreed(Object.keys(res.data.message)))
      .catch((err) => console.error(err));
  };
  useEffect(() => getDogBreed(), []);

  const getCatBreed = () => {
    axios
      .get("https://api.thecatapi.com/v1/breeds")
      .then((res) => {
        setCatBreed(res.data);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => getCatBreed(), []);

  return (
    <div className="pets-searchfield">
      <ul className="ul-list" style={{ listStyle: "none" }}>
        <li>
          <div className="menu">
            <h4 className="result-searchfield">{selectedType}</h4>
            <h5 className="menu-title">Type</h5>
            <ul className="filter-drop">
              <li
                key="Dog"
                onClick={(event) => {
                  setSelectedType(event.target.innerHTML);
                  setSelectedBreed("All");
                }}
              >
                Dog
              </li>
              <li
                value="2"
                key="Cat"
                onClick={(event) => {
                  setSelectedType(event.target.innerHTML);
                  setSelectedBreed("All");
                }}
              >
                Cat
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div className="menu">
            <h4 className="result-searchfield">{selectedBreed}</h4>
            <h5 className="menu-title menu-title_2nd">Breed</h5>
            {selectedType === "All" ? (
              <ul className="filter-drop"></ul>
            ) : selectedType === "Dog" ? (
              <ul className="filter-drop">
                {dogBreed.map((db) => {
                  return (
                    <li
                      key={dogBreed.indexOf(db)}
                      onClick={(event) =>
                        setSelectedBreed(event.target.innerHTML)
                      }
                    >
                      {db.charAt(0).toUpperCase() + db.slice(1)}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <ul className="filter-drop">
                {catBreed.map((db, i) => {
                  return (
                    <li
                      key={i}
                      onClick={(event) =>
                        setSelectedBreed(event.target.innerHTML)
                      }
                    >
                      {db.name.charAt(0).toUpperCase() + db.name.slice(1)}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </li>
        <li>
          <div className="menu">
            <h4 className="result-searchfield">{selectedGender}</h4>
            <h5 className="menu-title menu-title_3rd">Gender</h5>
            <ul className="filter-drop">
              <li
                onClick={(event) => setSelectedGender(event.target.innerHTML)}
              >
                Male
              </li>
              <li
                onClick={(event) => setSelectedGender(event.target.innerHTML)}
              >
                Female
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div className="menu" href="#">
            <h4 className="result-searchfield">{selectedAge}</h4>
            <h5 className="menu-title menu-title_4th">Age</h5>
            <ul className="filter-drop">
              <li onClick={(event) => setSelectedAge(event.target.innerHTML)}>
                Young
              </li>
              <li onClick={(event) => setSelectedAge(event.target.innerHTML)}>
                Middle-Aged
              </li>
              <li onClick={(event) => setSelectedAge(event.target.innerHTML)}>
                Older Adult
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default PetsSearchField;
