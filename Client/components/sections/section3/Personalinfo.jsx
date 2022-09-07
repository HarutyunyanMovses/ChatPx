import React, { useState } from "react";
import PersonalinfoOpened from "./PersonalinfoOpened";
import "./section3.css";

function Personalinfo() {
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState("⮝");

  const handleClick = () => {
    icon === "⮝" ? setIcon("⮟") : setIcon("⮝");
    setOpen(!open);
  };

  return (
    <>
      <div className="personalinfo">
        <div className="personalinfoHeader" onClick={handleClick}>
          <p>Personal information</p>
          <p>{icon}</p>
        </div>

        {open ? <PersonalinfoOpened /> : null}
      </div>
    </>
  );
}

export default Personalinfo;