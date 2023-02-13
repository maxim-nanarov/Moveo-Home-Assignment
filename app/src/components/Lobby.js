import React from "react";
import { Link } from "react-router-dom";

//the lobby page where the users first see when entering the application
export default function Lobby() {
  return (
    <div>
      <h1>Lobby</h1>
      <Link to="mainmenu">Enter</Link>
    </div>
  );
}
