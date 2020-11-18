import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="Navbar">
      <Link style={{ textDecoration: "none", color: "black" }} to="/">
        <h1 className="app-title">What's The Weather?</h1>
      </Link>

      <Link
        style={{ textDecoration: "none", color: "black" }}
        to="/FavPlacePage"
      >
        <h4 className="fav-place">Your Places</h4>
      </Link>
    </div>
  );
}

export default Navbar;
