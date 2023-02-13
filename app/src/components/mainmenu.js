import React from "react";
import CodeBlock from "./CodeBlock";
import "../App.scss";
//in here all the code templates will be displayed
export default function MainMenu() {
  return (
    <div className="Main-Container">
      <h1>Main Menu</h1>
      <CodeBlock></CodeBlock>
    </div>
  );
}
