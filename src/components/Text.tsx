import React, { useEffect, useState, useRef } from "react";
import { loremIpsum } from "../LoremIpsum";
import "styles/components/Text.scss";

interface Props {
  clickedLetter: string;
  letterIndex: number;
  updateLetterIndex: (arg0: number) => void;
  updateShowResult: (arg0: boolean) => void;
  updateTextAccuracy: (arg0: HTMLDivElement) => void;
  updatePointAccuracy: (arg0: string) => void;
  updatePercentageAccuracy: (arg0: string) => void;
}

const Text: React.FC<Props> = ({
  clickedLetter,
  letterIndex,
  updateLetterIndex,
  updateShowResult,
  updateTextAccuracy,
  updatePointAccuracy,
  updatePercentageAccuracy,
}) => {
  const [loremIndex, randomLoremIndex] = useState<number>(0);
  const [wordIndex, updateWordIndex] = useState<number>(0);

  const textDiv = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const currentWordDiv =
    React.useRef() as React.MutableRefObject<HTMLDivElement>;

  const getRandomLoremIndex = (exclude: number) => {
    const loremLength: number = loremIpsum.length - 1;
    let randomIndex: number = Math.floor(
      Math.random() * (loremLength - 0 + 1) + 0
    );

    if (randomIndex === exclude) {
      getRandomLoremIndex(exclude);
    } else {
      randomLoremIndex(randomIndex);
    }
  };

  useEffect(() => {
    getRandomLoremIndex(Number(localStorage.getItem("loremIndex")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("loremIndex", JSON.stringify(loremIndex));
  }, [loremIndex]);

  const words: string[] = loremIpsum[loremIndex].split(" ");

  useEffect(() => {
    if (
      words[wordIndex].length <= letterIndex &&
      words.length - 1 > wordIndex
    ) {
      updateWordIndex((prevWordIndex: number) => prevWordIndex + 1);
      updateLetterIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letterIndex]);

  useEffect(() => {
    if (clickedLetter !== null && clickedLetter !== "") {
      let index: number = letterIndex - 1;
      let letters: string[] = Array.from(words[wordIndex]);
      let previousLetterSpan: Element = currentWordDiv.current.childNodes[
        index
      ] as Element;

      if (letters[letterIndex - 1] === undefined) {
        letters = Array.from(words[wordIndex - 1]);
        index = letters.length - 1;
        previousLetterSpan = currentWordDiv.current.parentNode!.childNodes[
          wordIndex - 1
        ].childNodes[words[wordIndex - 1].length - 1] as Element;
      }

      if (letters[index].toLowerCase() === clickedLetter) {
        previousLetterSpan.classList.add("text__letter--correct");
      } else {
        previousLetterSpan.classList.add("text__letter--incorrect");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedLetter]);

  useEffect(() => {
    if (
      wordIndex === words.length - 1 &&
      letterIndex === words[wordIndex].length
    ) {
      setTimeout(() => {
        saveAccuracy();
        updateTextAccuracy(textDiv.current);
        updateShowResult(true);
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordIndex, letterIndex]);

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
      String(
        ((correctLettersQuantity / allLettersQuantity) * 100).toFixed(2) + "%"
      )
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
