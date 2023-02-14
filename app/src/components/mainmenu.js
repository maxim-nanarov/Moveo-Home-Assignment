import React from "react";
import CodeBlock from "./CodeBlock";
import "../App.scss";
import { Link } from "react-router-dom";
//in here all the code templates will be displayed
export default function MainMenu() {
  return (
    <div className="Main-Container">
      <h1>Main Menu</h1>
      <Link to="/New">New</Link>
      <CodeBlock></CodeBlock>
    </div>
  );
}
