import React from "react";
import { loremIpsum } from "../LoremIpsum";
import "styles/components/Text.scss";

interface Props {
  letterIndex: number;
}

const Text: React.FC<Props> = ({ letterIndex }) => {
  const currentText = loremIpsum[0];
  const words = currentText.split(" ");

  let wordIndex = 0;
  // console.log(letterIndex);

  return (
    <div className="text">
      {words.map((word, i) => (
        <div
          key={word + i}
          className={`text__word${
            wordIndex === Number(i) ? " text__word--active" : ""
          }`}
        >
          {Array.from(word).map((letter, i) => (
            <span
              key={letter + i}
              className={`text__letter${
                letterIndex === Number(i) ? " text__letter--active" : ""
              }`}
            >
              {letter}
            </span>
          ))}
          &nbsp;
        </div>
      ))}
    </div>
  );
};

export default Text;
