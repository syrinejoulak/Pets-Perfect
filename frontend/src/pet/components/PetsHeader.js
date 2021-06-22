import React from "react";

import "./PetsHeader.css";

const PetsHeader = () => {
  return (
    <div>
      <div className="pets-title">
        <div className="box">
          <div className="title">
            <span className="block"></span>
            <h1>
              Adopt a pet<span></span>
            </h1>
          </div>
          <div className="role">
            <div className="block"></div>
            <p>Pets Perfect</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetsHeader;
