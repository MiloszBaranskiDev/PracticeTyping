import React, { useEffect, useState, useRef } from "react";
import { loremIpsum } from "../LoremIpsum";
import "styles/components/Text.scss";

interface Props {
  clickedLetter: string | null;
  letterIndex: number;
  updateLetterIndex: (arg0: number) => void;
}

const Text: React.FC<Props> = ({
  clickedLetter,
  letterIndex,
  updateLetterIndex,
}) => {
  const currentText = loremIpsum[0];
  const currentWord = useRef(null as any);
  const words = currentText.split(" ");
  const [wordIndex, updateWordIndex] = useState<number>(0);

  useEffect(() => {
    if (
      words[wordIndex].length <= letterIndex &&
      words.length - 1 > wordIndex
    ) {
      updateWordIndex((prevWordIndex: number) => prevWordIndex + 1);
      updateLetterIndex(0);
    }
  }, [letterIndex]);

  if (letterIndex > words[wordIndex].length) {
    console.log("end");
  }

  useEffect(() => {
    if (clickedLetter !== null && clickedLetter !== "") {
      let index = letterIndex - 1;
      let letters = Array.from(words[wordIndex]);
      let previousLetterSpan = currentWord.current.childNodes[index];

      if (letters[letterIndex - 1] === undefined) {
        letters = Array.from(words[wordIndex - 1]);
        index = letterIndex;
        previousLetterSpan =
          currentWord.current.parentNode.childNodes[wordIndex - 1].childNodes[
            words[wordIndex - 1].length - 1
          ];
      }

      if (letters[index].toLowerCase() === clickedLetter) {
        previousLetterSpan.classList.add("text__letter--correct");
      } else {
        previousLetterSpan.classList.add("text__letter--incorrect");
      }
    }
  }, [clickedLetter]);

  return (
    <div className="text">
      {words.map((word, i) => (
        <div
          key={word + i}
          ref={wordIndex === Number(i) ? currentWord : null}
          className="text__word"
        >
          {Array.from(word).map((letter, i) => (
            <span key={letter + i} className="text__letter">
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
