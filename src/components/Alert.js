import React from "react";

function Alert({ type, text }) {
  return <div className={`alert alert-${type}`}>{text}</div>;
}

export default Alert;
