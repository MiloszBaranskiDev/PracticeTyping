import React, { useEffect, useState } from "react";
import { loremIpsum } from "../LoremIpsum";
import "styles/components/Text.scss";

interface Props {
  letterIndex: number;
  updateLetterIndex: (arg0: number) => void;
}

const Text: React.FC<Props> = ({ letterIndex, updateLetterIndex }) => {
  const currentText = loremIpsum[0];
  const words = currentText.split(" ");
  const [wordIndex, updateWordIndex] = useState<number>(0);

  useEffect(() => {
    if (
      words[wordIndex].length <= letterIndex &&
      words.length - 1 > wordIndex
    ) {
      updateWordIndex((prevWordIndex: any) => prevWordIndex + 1);
      updateLetterIndex(0);
    }
  }, [letterIndex]);

  console.log("word", wordIndex);
  console.log("letter:", letterIndex);

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
