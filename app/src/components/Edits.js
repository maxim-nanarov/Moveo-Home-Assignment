import React from "react";
import { useState, useEffect } from "react";
import CodeEditor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import io from "socket.io-client";
//http://localhost:3001
//"https://moveo-ha-server-socket.herokuapp.com/"
//http://localhost:2999
const socket = io.connect("http://localhost:3001");

//this page is the Editor that will display code
//and the user will be able to rewrite it.

const Edits = () => {
  const [code, setCode] = useState(`console.log('Hello World');`);
  const [admin, setAdmin] = useState(false);
  let { state } = useLocation();

  //showing if you're an admin
  useEffect(() => {
    console.log("Before", state.code);
    setCode(state.code);
    socket.on("youre_admin", () => {
      setAdmin(true);
      alert("Youre the 'mentor' you cant write");
    });
  }, [state]);
  //when a user writes something in the code
  //it updates the state of the code
  //Code Updater
  const handleValueChange = (value) => {
    console.log(value);
    setCode(value);
  };

  //a message to the admin that he cant write
  const handleValueChangeadmin = () => {
    alert("You are the mentor you cant write");
  };
  //a use effect that gets data from the socket io
  //and changes the data accordingly
  useEffect(() => {
    socket.on("recive_data", (data) => {
      console.log(data.code);
      setCode(data.code);
    });
  });
  useEffect(() => {
    setCode(state.Code);
  }, [state]);
  //an update function to the database
  function Update() {
    axios
      .put(
        `https://moveo-ha-server.herokuapp.com/Code-Blocks-Update/${state.Title}`,
        {
          code,
        }
      )
      .then((res) => {
        console.log(res);
        alert("Edit was Completed!");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // const handlebuttondown = (data) => {
  //   console.log(data);
  // };

  useEffect(() => {
    socket.emit("Send_Code", { code: code });
  }, [code]);

  return (
    <div className="Edit">
      <h1>Edit</h1>
      <CodeEditor
        value={code}
        onValueChange={admin ? handleValueChange : handleValueChangeadmin}
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
