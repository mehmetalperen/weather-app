import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PreviewCard.css";
import { Link } from "react-router-dom";

function PreviewCard(props) {
  return (
    <div className="PreviewCard">
      <div className="previewCard-container">
        <Link
          to={`/WeatherDetailPage/${props.id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <h3 className="city-name">
            {props.name}, {props.country}
          </h3>
        </Link>

        {props.isSaved ? (
          <Button
            variant="outline-dark"
            onClick={() => {
              props.onUnsave(props.id);
            }}
          >
            Unsave
          </Button>
        ) : (
          <Button
            variant="outline-info"
            onClick={() => {
              props.onSave(props.id);
            }}
          >
            Save
          </Button>
        )}
      </div>
    </div>
  );
}

export default PreviewCard;
