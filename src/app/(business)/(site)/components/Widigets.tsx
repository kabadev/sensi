import React from "react";
import Widiget from "./Widiget";

const Widigets = () => {
  return (
    <div className="grid grid-cols-auto-fill-250 gap-5">
      <Widiget />
      <Widiget />
      <Widiget />
      <Widiget />
    </div>
  );
};

export default Widigets;
