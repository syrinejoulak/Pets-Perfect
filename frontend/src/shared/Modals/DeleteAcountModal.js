import React, { useState } from "react";

import { deleteUser } from "../../Redux/Actions/Action";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { TiUserDeleteOutline } from "react-icons/ti";

const DeleteAcountModal = ({ name, setIsLoggedIn, user, dispatch }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  console.log("logged", setIsLoggedIn);

  const deleteAccountHandler = (e) => {
    e.preventDefault();
    dispatch(deleteUser(user._id));
    setIsLoggedIn(false);
  };

  return (
    <div>
      <TiUserDeleteOutline className="user-icon delete" onClick={toggle} />

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>Delete Account</ModalHeader>
        <ModalBody>
          Hey {name}, after deleting your account, all your information will be
          destroyed and can not be restored.
          <br />
          Are you sure you want to delete your account?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={deleteAccountHandler}>
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DeleteAcountModal;
