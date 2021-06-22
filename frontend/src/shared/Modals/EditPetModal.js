import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

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
import { editAPet } from "../../Redux/Actions/Action";
import { BiEdit } from "react-icons/bi";

const EditPetModal = (props) => {
  const [modal, setModal] = useState(false);

  const [dogBreed, setDogBreed] = useState([]);
  const [catBreed, setCatBreed] = useState([]);
  const [selectedType, setSelectedType] = useState(props.type);

  const [form, setForm] = useState({
    name: props.name,
    type: selectedType,
    breed: props.breed,
    birthDate: props.birthDate,
    gender: props.gender,
    vaccinated: props.vaccinated,
    image: "",
  });
  console.log("props", props);
  console.log("for", form);
  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSelectedType(e.target.value);
  };

  const onChangeTypeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSelectedType(e.target.value);
  };

  const dispatch = useDispatch();

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(editAPet(props.id, form));

    toggle();
  };

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

  const toggle = (props) => {
    setModal(!modal);
  };

  return (
    <React.Fragment>
      <div className="edit-container" onClick={toggle}>
        <h4 style={{ fontSize: "13px", paddingTop: "6px" }}>Edit</h4>
        <BiEdit id={props.id} className="pet-edit-icon" />
      </div>

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
                value={form.name || ""}
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
                value={form.type || "--Select--"}
                type="select"
                name="type"
                id="petType"
                onChange={onChangeTypeHandler}
              >
                <option selected hidden>
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
                min="1990-01"
                max="2021-05"
                value={form.birthDate || ""}
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
                value={form.type || "--Select--"}
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
                value={form.vaccinated ? "Yes" : "No" || "--Select--"}
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
                accept="image/png, image/jpeg"
                name="image"
                id="petPicture"
                onChange={onChangeHandler}
              />
              <FormText color="muted">Update your pet's picture.</FormText>
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={updateHandler}>
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

export default EditPetModal;
