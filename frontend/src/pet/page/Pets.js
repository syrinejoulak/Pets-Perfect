import React, { useEffect, useState } from "react";
import PetsList from "../components/PetsList";
import "./Pets.css";
import { useSelector, useDispatch } from "react-redux";
import { getPets } from "../../Redux/Actions/Action";
import PetsHeader from "../components/PetsHeader";
import PetsSearchField from "../components/PetsSearchField";
import NoPetFound from "../components/NoPetFound";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";

const Pets = () => {
  const { allPets, loadingPets } = useSelector((state) => state);
  const [selectedType, setSelectedType] = useState("All");
  const [selectedBreed, setSelectedBreed] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedAge, setSelectedAge] = useState("All");

  function calculateAge(birthday) {
    const year = Number(birthday.match(/\d+/g)[0]);
    const month = Number(birthday.match(/\d+/g)[1]);
    const date = new Date(year, month);
    var ageDifMs = Date.now();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - date.getUTCFullYear());
  }

  const filteredPets = allPets.filter(
    (pets) =>
      (selectedType === "All" ? pets : pets.type === selectedType) &&
      (selectedBreed === "All" ? pets : pets.breed === selectedBreed) &&
      (selectedGender === "All" ? pets : pets.gender === selectedGender) &&
      (selectedAge === "All"
        ? pets
        : selectedAge === "Young"
        ? calculateAge(pets.birthDate) <= 1
        : selectedAge === "Middle-Aged"
        ? calculateAge(pets.birthDate) >= 1 && calculateAge(pets.birthDate) <= 8
        : calculateAge(pets.birthDate) > 8)
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPets());
  }, []);

  if (allPets.length === 0) {
    return (
      <div id="first">
        {loadingPets ? (
          <React.Fragment>
            <PetsHeader />
            <LoadingSpinner />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <PetsHeader />
            <PetsSearchField />
            <NoPetFound />
          </React.Fragment>
        )}
      </div>
    );
  }

  return (
    <div id="first">
      {loadingPets ? (
        <React.Fragment>
          <PetsHeader />
          <LoadingSpinner />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <PetsHeader />
          <PetsSearchField
            selectedGender={selectedGender}
            selectedType={selectedType}
            selectedBreed={selectedBreed}
            selectedAge={selectedAge}
            setSelectedAge={setSelectedAge}
            setSelectedBreed={setSelectedBreed}
            setSelectedGender={setSelectedGender}
            setSelectedType={setSelectedType}
          />
          <PetsList items={filteredPets} />
        </React.Fragment>
      )}
    </div>
  );
};

export default Pets;
