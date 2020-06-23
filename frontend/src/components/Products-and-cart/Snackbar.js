import React from "react";

export const Snackbar = (props) => {
  return (
    <span className="snackbar">
      <span className="snackbar-message">{props.message}</span>
      <span className="snackbar-action">{props.action}</span>
    </span>
  );
}