import React, { useEffect, useState, useRef } from "react";
import "./Calls.css";
import CreateCall from "./CreateCall";
import axios from "axios";
import Callcard from "./Callcard";
import delayAdapterEnhancer from "axios-delay";

function Calls() {
  const [calls, setCalls] = useState([]);
  const [cachedCalls, setCachedCalls] = useState({});
  const url = "http://localhost:8000/calls";

  const cachedCallsRef = useRef(cachedCalls);
  cachedCallsRef.current = cachedCalls;

  const api = axios.create({
    adapter: delayAdapterEnhancer(axios.defaults.adapter),
  });

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(() => {
    getCalls();
  }, []);

  const getCalls = () => {
    api
      .get(url + "?_sort=timeStamp&_order=desc", {
        delay: 1000, // delay 1 second
      })
      .then((response) => {
        setCalls(response.data);
      })
      .catch((error) => console.log(error));
  };

  const activateCall = (call, cachedCalls) => {
    if (cachedCalls[call.id])
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
  };

  const startCall = (call) => {
    axios
      .post(url, call)
      .then(function (response) {
        cachedCalls[response.data.id] = true;
        setCachedCalls(cachedCalls);
        setTimeout(() => {
          activateCall(response.data, cachedCallsRef.current);
        }, randomIntFromInterval(1000, 10000));
        getCalls();
      })
      .catch((error) => console.log(error));
  };

  const endCall = (call) => {
    if (cachedCalls[call.id]) {
      delete cachedCalls[call.id];
      setCachedCalls(cachedCalls);
    }
    axios
      .delete(url + `/${call.id}`)
      .then(() => getCalls())
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-10 col-lg-8 col-xl-6 offset-md-1 offset-lg-2 offset-xl-3 p-md-0">
          <CreateCall startCall={startCall} />
          <div className="row p-md-0 pt-md-2">
            {calls.map((call) => (
              <Callcard call={call} key={call.id} endCall={endCall} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Calls;
