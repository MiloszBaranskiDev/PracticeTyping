import React, { useState, useEffect } from "react";
import Keys from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "styles/components/Keyboard.scss";

interface Props {
  updateLetterIndex: (prevLetterIndex: any) => void;
}

const Keyboard: React.FC<Props> = ({ updateLetterIndex }) => {
  const [keys, updateKeys] = useState<any>([]);
  const [keysStrings, updateKeysStrings] = useState<string[] | null>(null);

  const initKeysHandler = (keys: {
    keys: object;
    keyboardRowsDOM: HTMLDivElement;
  }) => {
    const rows = keys.keyboardRowsDOM.childNodes;
    rows.forEach((row) => {
      const rowItems = row.childNodes;
      rowItems.forEach((rowItem) => {
        updateKeys((oldArr: HTMLDivElement[] | []) => [...oldArr, rowItem]);
      });
    });
  };

  useEffect(() => {
    if (keys.length > 0) {
      const arr: string[] = [];
      keys.forEach((key: HTMLDivElement) => {
        arr.push(key.innerText);
      });
      updateKeysStrings(arr);
    }
  }, [keys]);

  useEffect(() => {
    window.addEventListener("keyup", (e: { key: string }) => {
      if (keysStrings !== null) {
        const clickedKeyIndex: number = keysStrings.indexOf(e.key);
        updateLetterIndex((prevLetterIndex: any) => prevLetterIndex + 1);
        keyAnimation(clickedKeyIndex);
      }
    });
  }, [keysStrings]);

  const keyAnimation = (index: number) => {
    if (index !== -1) {
      keys[index].classList.add("currentKey");
      setTimeout(() => {
        keys[index].classList.remove("currentKey");
      }, 100);
    }
  };

  return (
    <div className="keyboard">
      <Keys onInit={(keyboard: any) => initKeysHandler(keyboard)} />
    </div>
  );
};

export default Keyboard;
