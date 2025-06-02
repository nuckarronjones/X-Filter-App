import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Spinner = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
