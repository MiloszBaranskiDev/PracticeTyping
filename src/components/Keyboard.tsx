import React, { useState, useEffect } from "react";
import Keys from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "styles/components/Keyboard.scss";

interface Props {
  updateLetterIndex: (prevLetterIndex: any) => void;
}

const Keyboard: React.FC<Props> = ({ updateLetterIndex }) => {
  const [keys, updateKeys] = useState<any>([]);

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
    window.addEventListener("keyup", (e: { key: string }) => {
      const keysStrings: string[] = [];
      keys.forEach((key: HTMLDivElement) => {
        keysStrings.push(key.innerText);
        key.classList.remove("currentKey");
      });

      const currentKey: number = keysStrings.indexOf(e.key);
      if (currentKey !== -1) {
        keys[currentKey].classList.add("currentKey");
        setTimeout(() => {
          keys[currentKey].classList.remove("currentKey");
        }, 100);
      }

      updateLetterIndex((prevLetterIndex: any) => prevLetterIndex + 1);
      console.log("click");
    });
  }, [keys]);

  return (
    <div className="keyboard">
      <Keys onInit={(keyboard: any) => initKeysHandler(keyboard)} />
    </div>
  );
};

export default Keyboard;
