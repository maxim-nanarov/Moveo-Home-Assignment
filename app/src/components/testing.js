import React from "react";
import Edits from "./Edits";
import { useLocation } from "react-router-dom";

function EditParent() {
  const state = useLocation();

  return (
    <div>
      <h1>Realtime Text Page</h1>
      <Edits state={state} />
    </div>
  );
}

export default EditParent;
