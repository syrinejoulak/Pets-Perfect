import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Col,
  FormText,
  Input,
  Label,
} from "reactstrap";
import "./EditPetModal.css";
import { MdPets } from "react-icons/md";

import { addPetPost } from "../../Redux/Actions/Action";
import { useDispatch } from "react-redux";

const AddAPetModal = (props) => {
  const [modal, setModal] = useState(false);

  const [dogBreed, setDogBreed] = useState([]);
  const [catBreed, setCatBreed] = useState([]);
  const [selectedType, setSelectedType] = useState("--Select--");

  const [form, setForm] = useState({
    name: "",
    type: selectedType,
    breed: "--Select--",
    birthDate: "",
    gender: "--Select--",
    vaccinated: "--Select--",
    image: "",
    userId: props.uid,
  });
  console.log("uid", props.uid);

  const getDogBreed = () => {
    axios
      .get("https://dog.ceo/api/breeds/list/all")
      .then((res) => {
        setDogBreed(Object.keys(res.data.message));
      })
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

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onChangeTypeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSelectedType(e.target.value);
  };
  const toggle = () => {
    setModal(!modal);
  };

  const disptach = useDispatch();

  console.log("form", form);

  const addAPetHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("type", form.type);
    formData.append("breed", form.breed);
    formData.append("gender", form.gender);
    formData.append("birthDate", form.birthDate);
    formData.append("vaccinated", form.vaccinated);
    formData.append("userId", form.userId);
    formData.append("image", form.image);
    disptach(addPetPost(formData));
    toggle();
  };

  return (
    <React.Fragment>
      <button className={props.buttonClassName} onClick={toggle}>
        {props.title} <MdPets />
      </button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>{props.title}</ModalHeader>

        <ModalBody>
          <FormGroup row>
            <Label for="petName" sm={3}>
              Name
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                name="name"
                id="petName"
                value={form.name}
                placeholder="Add your pet's name here"
                onChange={onChangeHandler}
              />
            </Col>
          </FormGroup>

          <br />

          <FormGroup row>
            <Label for="petType" sm={3}>
              Type
            </Label>
            <Col sm={8}>
              <Input
                value={form.type}
                type="select"
                name="type"
                id="petType"
                onChange={onChangeTypeHandler}
              >
                <option disabled selected hidden value="--Select--">
                  --Select--
                </option>
                <option>Dog</option>
                <option>Cat</option>
              </Input>
            </Col>
          </FormGroup>

          <br />

          <FormGroup row>
            <Label for="petBreed" sm={3}>
              Breed
            </Label>
            <Col sm={8}>
              <Input
                type="select"
                name="breed"
                id="petBreed"
                value={form.breed}
                disabled={selectedType === "--Select--"}
                onChange={onChangeHandler}
              >
                <option disabled selected hidden>
                  --Select--
                </option>
                {selectedType === "Dog"
                  ? dogBreed.map((db, i) => {
                      return <option key={i}>{db}</option>;
                    })
                  : catBreed.map((db, i) => {
                      return <option key={i}>{db.name}</option>;
                    })}
              </Input>
            </Col>
          </FormGroup>

          <br />

          <FormGroup row>
            <Label for="petBirthDate" sm={3}>
              Birth date
            </Label>
            <Col sm={8}>
              <Input
                type="month"
                id="petBirthDate"
                name="birthDate"
                value={form.birthDate}
                min="1990-01"
                max="2021-05"
                onChange={onChangeHandler}
              ></Input>
            </Col>
          </FormGroup>

          <br />

          <FormGroup row>
            <Label for="petGender" sm={3}>
              Gender
            </Label>
            <Col sm={8}>
              <Input
                type="select"
                value={form.gender}
                name="gender"
                id="petGender"
                onChange={onChangeHandler}
              >
                <option disabled selected hidden>
                  --Select--
                </option>
                <option>Male</option>
                <option>Female</option>
              </Input>
            </Col>
          </FormGroup>

          <br />

          <FormGroup row>
            <Label for="petVaccinated" sm={3}>
              Vaccinated
            </Label>
            <Col sm={8}>
              <Input
                type="select"
                value={form.vaccinated}
                name="vaccinated"
                id="petVaccinated"
                onChange={onChangeHandler}
              >
                <option disabled selected hidden>
                  --Select--
                </option>
                <option>Yes</option>
                <option>No</option>
              </Input>
            </Col>
          </FormGroup>

          <br />

          <FormGroup row>
            <Label for="petPicture" sm={3}>
              Picture
            </Label>
            <Col sm={8}>
              <Input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                name="image"
                id="petPicture"
                value={form.image}
                onChange={onChangeHandler}
              />
              <FormText color="muted">Update your pet's picture.</FormText>
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={addAPetHandler}>
            {props.title === "Add a pet" ? "Add" : "Update"}
          </Button>
          <Button color="danger" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default AddAPetModal;
