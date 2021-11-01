import React, { useRef } from "react";
import "../index.css";
import DropDown from "./DropDown";
import { useDetectOutsideClick } from "../hooks";
import { ReactComponent as More } from "../assets/icon/more.svg";

function App() {
  //useRef로 변수를 관리하게 되면, 그 변수가 업데이트
  const dropdownRef = useRef();
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const toggleActive = () => setIsActive(!isActive);
  return (
    <div>
      <button onClick={toggleActive}>
        <More />
        <DropDown
          _ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
        />
      </button>
    </div>
  );
}

export default App;
