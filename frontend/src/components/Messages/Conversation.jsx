import React from "react";

const Conversation = () => {
  return (
    <div
      className="d-flex align-items-center gap-3 p-2"
      style={{ cursor: "pointer", borderRadius: "0.375rem" /* md */ }}
    >
      <div className="position-relative">
        <img
          src={"https://via.placeholder.com/150"}
          className="rounded-circle"
          style={{ width: "3rem", height: "3rem" }}
          alt="Profile"
        />
        {true && (
          <span
            className="position-absolute bottom-1 right-1 end-0 translate-middle p-1 bg-success border border-light rounded-circle"
            style={{ width: "1rem", height: "1rem" }}
          ></span>
        )}
      </div>

      <div className="flex-grow-1 w-50 p-1 ">
        <div className="text-start text-truncate mb-1">John Doe</div>
        <div className="text-start text-truncate"> hello from a very long message sdfjn sdhba sfdkhjb asdfhk</div>
      </div>
    </div>
  );
};

export default Conversation;
