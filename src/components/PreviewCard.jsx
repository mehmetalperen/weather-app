import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PreviewCard.css";

function PreviewCard() {
  return (
    <div className="PreviewCard">
      <div className="previewCard-container">
        <h3 className="city-name">City Name</h3>
        <Button variant="outline-info">Save</Button>
      </div>
    </div>
  );
}

export default PreviewCard;
