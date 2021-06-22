import React from "react";

const ErrorModal = (props) => {
  return (
    <div header="An Error Occurred!" footer={<button>Okay</button>}>
      <p>{props.error}</p>{" "}
    </div>
  );
};

export default ErrorModal;
