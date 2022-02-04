import React from "react";
import Keys from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "styles/components/Keyboard.scss";

const Keyboard: React.FC = () => {
  return (
    <div className="keyboard">
      <p>Keyboard</p>
      <Keys />
    </div>
  );
};

export default Keyboard;
