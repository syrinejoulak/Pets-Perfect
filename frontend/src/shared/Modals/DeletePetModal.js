import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { deletePet } from "../../Redux/Actions/Action";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FaTrashAlt } from "react-icons/fa";

const DeletePetModal = (props) => {
  console.log("props del", props.id);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const dispatch = useDispatch();

  const confirmeDeleteHandler = () => {
    dispatch(deletePet(props.id));
    toggle();
  };

  return (
    <div>
      <div className="trash-container" onClick={toggle}>
        <h4 style={{ fontSize: "13px", paddingTop: "6px" }}>Delete</h4>
        <FaTrashAlt id={props.id} className="pet-trash-icon" />
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>Delete item</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this item?
          <br />
          Please note that it can't be undone thereafter.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={confirmeDeleteHandler}>
            Delete {props.name}'s post
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DeletePetModal;
