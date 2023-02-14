import React from "react";
import { useState } from "react";
import CodeEditor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import { Link } from "react-router-dom";
import axios from "axios";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

//this page is the Editor that will display code
//and the user will be able to rewrite it.

const AddNew = () => {
  const [code, setCode] = useState(`console.log('Hello World');`);
  const [Title, setTitle] = useState("new Function");

  const handleValueChange = (value) => {
    setCode(value);
  };

  const handleValueChangeTitle = (event) => {
    console.log("Title: " + event.target.value);
    setTitle(event.target.value);
  };
  ///?id=${state._id}
  function Insert() {
    axios
      .put(`https://moveo-ha-server.herokuapp.com/Code-Blocks-Insert`, {
        data: { code, Title },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          alert("Code Title allready exist");
        } else {
          alert("New code has been inserted");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="Edit">
      <input
        placeholder="new function"
        defaultvalue={Title}
        onChange={handleValueChangeTitle}
      />
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
        <button onClick={Insert}>Save</button>
        <Link to="/mainmenu">Back</Link>
      </div>
    </div>
  );
};

export default AddNew;
