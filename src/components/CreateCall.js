import React, { useState } from "react";
import "./CreateCall.css";

function CreateCall(props) {
  const [callerIdType, setCallerIdType] = useState("phoneNumber");
  const [callerId, setCallerId] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    setCallerId("");
    props.startCall({
      callerId: callerId,
      callerIdType: callerIdType,
      timeStamp: new Date().getTime(),
      state: "RING",
    });
  }

  function callerIdTypeChange(event) {
    setCallerId("");
    if (event && event.target.value) setCallerIdType(event.target.value);
  }

  function callerIdChange(event) {
    if (event && event.target) {
      if (callerIdType === "phoneNumber") {
        setCallerId(event.target.value.replace(/\D/g, ""));
      } else {
        setCallerId(event.target.value.replace(/[0-9]/g, ""));
      }
    }
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
            value={callerId}
            required
            onChange={(event) => callerIdChange(event)}
          />
        </div>
        <div className="col-auto submit-button-container">
          <button type="submit" className="btn btn-primary">
            Start Call
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCall;
