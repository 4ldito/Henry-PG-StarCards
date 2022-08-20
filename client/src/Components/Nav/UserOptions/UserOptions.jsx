import React from "react";
import { Link } from "react-router-dom";

export default function UserOptions() {
  return (
    <div>
      <Link to="/shopcart"> Shopcart </Link>
      <Link to="/userProfile"> User Profile </Link>
    </div>
  );
}
