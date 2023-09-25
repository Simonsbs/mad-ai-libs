import React, { useState } from "react";
import "./SidePanel.css";
import { List, XCircle } from "react-bootstrap-icons";

const SidePanel = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className={`side-panel ${isOpen ? "side-panel-open" : ""}`}>
        <button
          className="side-panel-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <>
              <XCircle className="me-1" />
              Close
            </>
          ) : (
            <span>
              <List className="me-1" />
              Options
            </span>
          )}
        </button>
        <div className="side-panel-content">{children}</div>
      </div>
    </>
  );
};

export default SidePanel;
