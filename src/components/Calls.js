import React from "react";
import "./Calls.css";
import CreateCall from "./CreateCall";
import axios from "axios";

function Calls() {
  function startCall(call) {
    axios
      .post("http://localhost:8000/calls", call)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <>
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3">
          <CreateCall startCall={startCall} />
        </div>
      </div>
    </>
  );
}

export default Calls;
