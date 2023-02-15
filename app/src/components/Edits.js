import React, { useState, useEffect } from "react";
// import CodeEditor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import { Link } from "react-router-dom";
import axios from "axios";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import io from "socket.io-client";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
// //http://localhost:3001
// //"https://moveo-ha-server-socket.herokuapp.com/"
// //http://localhost:2999
// //this page is the Editor that will display code
// //and the user will be able to rewrite it.

// const Edits = () => {
//   const [socket, setSocket] = useState(null);
//   const [code, setCode] = useState(`console.log('Hello World');`);

//   useEffect(() => {
//     const newSocket = io.connect("http://localhost:3001");
//     setSocket(newSocket);
//   }, []);

//   useEffect(() => {
//     socket.on("updateText", (newText) => {
//       setCode(newText);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [socket]);

//   const handleTextChange = (event) => {
//     const newCode = event.target.value;
//     setCode(newCode);
//     socket.emit("updateText", newCode);
//   };

//   useEffect(() => {
//     setCode(state.Code);
//   }, [state]);
//   //an update function to the database
//   function Update() {
//     axios
//       .put(
//         `https://moveo-ha-server.herokuapp.com/Code-Blocks-Update/${state.Title}`,
//         {
//           code,
//         }
//       )
//       .then((res) => {
//         console.log(res);
//         alert("Edit was Completed!");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   return (
//     <div className="Edit">
//       <h1>Edit</h1>
//       <CodeEditor
//         value={code}
//         onValueChange={handleTextChange}
//         highlight={(code) => highlight(code, languages.javascript)}
//         padding={10}
//         style={{
//           fontFamily: '"Fira code", "Fira Mono", monospace',
//           fontSize: 12,
//         }}
//       />
//       <div>
//         <button onClick={Update}>Save</button>
//         <Link to="/mainmenu">Back</Link>
//       </div>
//     </div>
//   );
// };

// export default Edits;

//

const socket = io("http://localhost:3001"); // Replace with your Socket.io server address

const Edits = (state) => {
  const [text, setText] = useState(state.state.state);

  useEffect(() => {
    socket.on("updateText", (newText) => {
      setText(newText);
    });
    console.log(state.state.state);
    return () => {
      socket.disconnect();
    };
  }, [state]);

  const handleTextChange = (event) => {
    const newText = event;
    setText(newText);
    socket.emit("updateText", newText);
  };

  //Update: code in database
  function Update() {
    axios
      .put(
        `https://moveo-ha-server.herokuapp.com/Code-Blocks-Update/${state.Title}`,
        {
          text,
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

  return (
    <div className="Edit">
      <h1>Edit</h1>
      <div>
        <CodeMirror
          value={text}
          height="200px"
          extensions={[javascript({ jsx: true })]}
          onChange={handleTextChange}
        />
      </div>
      <div>
        <button onClick={Update}>Save</button>
        <Link to="/mainmenu">Back</Link>
      </div>
    </div>
  );
};

export default Edits;
