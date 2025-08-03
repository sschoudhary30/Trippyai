import React from "react";
import Chatbox from "./_components/Chatbox";

function CreateNewTrip() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-10">
      <div>
        <Chatbox />
      </div>
      <div>Hello map is here</div>
    </div>
  );
}

export default CreateNewTrip;
