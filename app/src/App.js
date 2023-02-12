import React, { useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";

const CodeBlock = ({ title, code }) => {
  const [currentCode, setCurrentCode] = useState(code);
  const codeRef = React.createRef();

  const handleCodeUpdate = (event) => {
    setCurrentCode(event.target.value);
  };

  React.useEffect(() => {
    hljs.highlightBlock(codeRef.current);
  }, [currentCode]);

  return (
    <div className="code-block">
      <h2>{title}</h2>
      <textarea value={currentCode} onChange={handleCodeUpdate} />
      <pre>
        <code ref={codeRef} className="javascript">
          {currentCode}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
