import React, { useEffect, useState } from "react";
import "./Calls.css";
import CreateCall from "./CreateCall";
import axios from "axios";
import Callcard from "./Callcard";

function Calls() {
  const [calls, setCalls] = useState([]);
  const url = "http://localhost:8000/calls";

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(() => {
    getCalls();
  }, []);

  function getCalls() {
    axios
      .get(url + "?_sort=timeStamp&_order=desc")
      .then((response) => {
        setCalls(response.data);
      })
      .catch((error) => console.log(error));
  }

  function activateCall(call) {
    axios
      .put(url + `/${call.id}`, {
        ...call,
        state: "ACTIVE",
        timeStamp: new Date().getTime(),
      })
      .then((response) => {
        getCalls();
      })
      .catch((error) => console.log(error));
  }
  function startCall(call) {
    axios
      .post(url, call)
      .then(function (response) {
        console.log(response.data);
        getCalls();
        setTimeout(
          () => activateCall(response.data),
          randomIntFromInterval(1000, 10000)
        );
      })
      .catch((error) => console.log(error));
  }
  return (
    <>
      <div className="row">
        <div className="col-12 col-md-10 col-lg-8 col-xl-6 offset-md-1 offset-lg-2 offset-xl-3 p-md-0">
          <CreateCall startCall={startCall} />
          <div className="row p-md-0 pt-md-2">
            {calls.map((call) => (
              <Callcard call={call} key={call.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Calls;
