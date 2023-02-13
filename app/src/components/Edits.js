import React from "react";
import { useState, useEffect } from "react";
import CodeEditor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

//this page is the Editor that will display code
//and the user will be able to rewrite it.

const Edits = () => {
  const [code, setCode] = useState(`console.log('Hello World');`);
  let { state } = useLocation();
  useEffect(() => {
    console.log(state);
    setCode(state.Code);
  }, [code, state]);

  const handleValueChange = (value) => {
    setCode(value);
  };
  ///?id=${state._id}
  function Update() {
    axios
      .put(`http://localhost:2999/Code-Blocks-Update/${state.Title}`, {
        code,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="Edit">
      <h1>Edit</h1>
      <CodeEditor
        value={code}
        onValueChange={handleValueChange}
        highlight={(code) => highlight(code, languages.javascript)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
      <div>
        <button onClick={Update}>Save</button>
        <Link to="/mainmenu">Back</Link>
      </div>
    </div>
  );
};

export default Edits;
