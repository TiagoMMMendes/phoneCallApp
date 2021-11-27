import React, { useState } from "react";
import "./CreateCall.css";

function CreateCall(props) {
  const [callerIdType, setCallerIdType] = useState("phoneNumber");
  const [callerId, setCallerId] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    props.startCall({
      callerId: callerId,
      callerIdType: callerIdType,
      timeStamp: new Date().getTime(),
      state: "RING",
    });
  }

  function callerIdTypeChange(event) {
    if (event && event.target.value) setCallerIdType(event.target.value);
  }

  function callerIdChange(event) {
    if (event && event.target) setCallerId(event.target.value);
  }

  return (
    <div className="create-call-container">
      <form className="row" onSubmit={(event) => onSubmit(event)}>
        <div className="form-group col-auto">
          <select
            className="form-select"
            id="callerIdType"
            required
            onChange={(event) => callerIdTypeChange(event)}
          >
            <option value="phoneNumber">phone number</option>
            <option value="personName">person name</option>
          </select>
        </div>
        <div className="form-group col-auto">
          <input
            type="text"
            className="form-control"
            id="callerId"
            required
            onChange={(event) => callerIdChange(event)}
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary">
            Start Call
          </button>
        </div>
      </form>

      <h3>{callerId}</h3>
    </div>
  );
}

export default CreateCall;
