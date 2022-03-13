import React, { useEffect, useState, useRef } from "react";
import { loremIpsum } from "../LoremIpsum";
import "styles/components/Text.scss";

interface Props {
  clickedLetter: string | null;
  letterIndex: number;
  updateLetterIndex: (arg0: number) => void;
  updateShowResult: (arg0: boolean) => void;
  updatePointAccuracy: (arg0: string) => void;
  updatePercentageAccuracy: (arg0: string) => void;
}

const Text: React.FC<Props> = ({
  clickedLetter,
  letterIndex,
  updateLetterIndex,
  updateShowResult,
  updatePointAccuracy,
  updatePercentageAccuracy,
}) => {
  const textDiv = useRef(null as any);
  const currentWordDiv = useRef(null as any);

  const currentText: string = loremIpsum[0];
  const words: string[] = currentText.split(" ");

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

  useEffect(() => {
    if (
      wordIndex === words.length - 1 &&
      letterIndex === words[wordIndex].length
    ) {
      saveAccuracy();
      updateShowResult(true);
    }
  }, [wordIndex, letterIndex]);

  useEffect(() => {
    if (clickedLetter !== null && clickedLetter !== "") {
      let index: number = letterIndex - 1;
      let letters: string[] = Array.from(words[wordIndex]);
      let previousLetterSpan: HTMLSpanElement =
        currentWordDiv.current.childNodes[index];

      if (letters[letterIndex - 1] === undefined) {
        letters = Array.from(words[wordIndex - 1]);
        index = letters.length - 1;
        previousLetterSpan =
          currentWordDiv.current.parentNode.childNodes[wordIndex - 1]
            .childNodes[words[wordIndex - 1].length - 1];
      }

      if (letters[index].toLowerCase() === clickedLetter) {
        previousLetterSpan.classList.add("text__letter--correct");
      } else {
        previousLetterSpan.classList.add("text__letter--incorrect");
      }
    }
  }, [clickedLetter]);

  const saveAccuracy = () => {
    const allLettersQuantity: number =
      document.querySelectorAll(".text__letter").length;
    const correctLettersQuantity: number = document.querySelectorAll(
      ".text__letter--correct"
    ).length;

    updatePointAccuracy(
      String(correctLettersQuantity + "/" + allLettersQuantity)
    );
    updatePercentageAccuracy(
      String((correctLettersQuantity / allLettersQuantity) * 100 + "%")
    );
  };

  return (
    <div className="text" ref={textDiv}>
      {words.map((word, i) => (
        <div
          key={word + i}
          ref={wordIndex === Number(i) ? currentWordDiv : null}
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
