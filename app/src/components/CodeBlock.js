import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import javascript from "highlight.js/lib/languages/javascript";
import "../App.scss";

hljs.registerLanguage("javascript", javascript);

//in here all the code templates will be displayed
export default function CodeBlock() {
  const [Display, setDisplay] = useState(<></>);
  useEffect(() => {
    //renders 4 code blocks
    axios
      .get("http://localhost:2999/Code-Block")
      .then((res) => {
        console.log("Code Block Request: ");
        let data = res.data;
        let count = 0;
        setDisplay(
          data.map((e) => {
            count++;
            return (
              <div key={count} className="Container">
                <h3>{e.Title}</h3>
                <Code code={e.Code} />
                <Link to="/Edit" state={e}>
                  Code
                </Link>
              </div>
            );
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div className="Code-Container">{Display}</div>;
}

const Code = ({ title, code }) => {
  const [currentCode, setCurrentCode] = useState(code);
  const codeRef = React.createRef();

  const handleCodeUpdate = (event) => {
    setCurrentCode(event.target.value);
  };

  useEffect(() => {
    hljs.highlightBlock(codeRef.current);
  }, [currentCode]);

  return (
    <div className="code-block">
      <pre>
        <code ref={codeRef} className="javascript">
          {currentCode}
        </code>
      </pre>
    </div>
  );
};
