import React from "react";
import "styles/components/Icons.scss";

const Icons: React.FC = () => {
  return (
    <div className="icons">
      <a
        href="https://github.com/MiloszBaranskiDev/PracticeTyping"
        target="_blank"
        rel="noreferrer"
        className="icon"
      >
        <i className="fab fa-github"></i>
      </a>
      <a
        href="https://miloszbaranskidev.github.io/my-website/"
        target="_blank"
        rel="noreferrer"
        className="icon"
      >
        <i className="fas fa-envelope"></i>
      </a>
    </div>
  );
};

export default Icons;
