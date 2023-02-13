import React from "react";
import { Link } from "react-router-dom";

export default function Lobby() {
  return (
    <div>
      <h1>Lobby</h1>
      <Link to="mainmenu">Enter</Link>
    </div>
  );
}
