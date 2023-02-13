import React from "react";
import { useState, useEffect } from "react";
import CodeEditor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import { useLocation } from "react-router-dom";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

//this page is the Editor that will display code
//and the user will be able to rewrite it.

const Edits = () => {
  const [code, setCode] = useState(`console.log('Hello World');`);
  let { state } = useLocation();
  useEffect(() => {
    setCode(state.Code);
  }, []);

  const handleValueChange = (value) => {
    setCode(value);
  };

  return (
    <div>
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
    </div>
  );
};

export default Edits;
