import React from "react";
import { useState } from "react";
import CodeEditor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

const Edits = () => {
  const [code, setCode] = useState(`console.log('Hello World');`);

  const handleValueChange = (value) => {
    setCode(value);
  };

  return (
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
  );
};

export default Edits;
