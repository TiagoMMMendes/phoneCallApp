import React, { useState, useEffect } from "react";
import "./Callcard.css";
function Callcard(props) {
  const { call, endCall } = props;
  const calculateDuration = function () {
    if (call.state === "RING") return "00:00:00";
    const milisecondsDiff = new Date().getTime() - call.timeStamp;
    var date = new Date(0);
    date.setMilliseconds(milisecondsDiff);
    return date.toISOString().substr(11, 8) || "";
  };

  const [duration, setDuration] = useState(calculateDuration());

  const setDurationAfter1s = function () {
    setDuration(calculateDuration());
  };

  useEffect(() => {
    let interval;
    if (call.state === "ACTIVE")
      interval = setInterval(() => setDurationAfter1s(), 1000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [call]);

  return (
    <div className="col-md-6">
      <div className="card">
        <h5 className="card-header">Call</h5>
        <div className="card-body">
          <h5 className="card-title" style={{ display: "inline-block" }}>
            <i className="bi bi-telephone" style={{ paddingRight: "5px" }}></i>
            {call && call.callerId}
          </h5>
          <button
            className="btn btn-primary red"
            style={{
              background: "red",
              display: "inline-block",
              borderRadius: "50%",
              float: "right",
            }}
            onClick={() => endCall(call)}
          >
            <i
              className="bi bi-telephone hang-out-icon"
              style={{ background: "red", transform: "rotate(45deg)" }}
            ></i>
          </button>
          <p className="card-text">
            {call.state === "RING" ? "Ringing..." : `Duration: ${duration}`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Callcard;
