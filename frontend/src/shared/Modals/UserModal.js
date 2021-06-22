import React, { useState } from "react";

import { updateUserProfil } from "../../Redux/Actions/Action";

import { useDispatch } from "react-redux";

import "./UserModal.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Col,
  Input,
  Label,
} from "reactstrap";
import { AiOutlineEdit } from "react-icons/ai";

const UserModal = ({ user }) => {
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState({
    name: user.name,
    city: user.city,
  });
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfil(user._id, edit));
    
    toggle();
  };


  console.log("edit", edit);

  const toggle = (props) => {
    setModal(!modal);
    setEdit({
      name: user.name,
      city: user.city,
    });
  };

  return (
    <React.Fragment>
      <AiOutlineEdit className="user-icon edit" onClick={toggle} />

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>Edit profil</ModalHeader>

        <ModalBody>
          <FormGroup row>
            <Label for="userName" sm={3}>
              Name
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                name="name"
                id="userName"
                value={edit.name}
                placeholder="Edit your name"
                onChange={onChangeHandler}
              />
            </Col>
          </FormGroup>

          <br />

          <FormGroup row>
            <Label for="city" sm={3}>
              City
            </Label>
            <Col sm={8}>
              <Input
                type="select"
                name="city"
                value={edit.city}
                id="city"
                onChange={onChangeHandler}
              >
                <option disabled selected hidden>
                  --Select--
                </option>
                <option value="Tunis">Tunis</option>
                <option value="Sfax">Sfax</option>
                <option value="Sousse">Sousse</option>
                <option value="Gabès">Gabès</option>
                <option value="Kairouan">Kairouan</option>
                <option value="Bizerte">Bizerte</option>
                <option value="Gafsa">Gafsa</option>
                <option value="Nabeul">Nabeul</option>
                <option value="Ariana">Ariana</option>
                <option value="Kasserine">Kasserine</option>
                <option value="Monastir">Monastir</option>
                <option value="Tataouine">Tataouine</option>
                <option value="Medenine">Medenine</option>
                <option value="Béja">Béja</option>
                <option value="Jendouba">Jendouba</option>
                <option value="El Kef">El Kef</option>
                <option value="Mahdia">Mahdia</option>
                <option value="Sidi Bouzid">Sidi Bouzid</option>
                <option value="Tozeur">Tozeur</option>
                <option value="Siliana">Siliana</option>
                <option value="Kebili">Kebili</option>
                <option value="Zaghouan">Zaghouan</option>
                <option value="Ben Arous">Ben Arous</option>
                <option value="Manouba">Manouba</option>
              </Input>
            </Col>
          </FormGroup>

          <br />

          <br />
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={updateHandler}>
            Edit
          </Button>
          <Button color="danger" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default UserModal;
