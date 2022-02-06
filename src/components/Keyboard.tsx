import React, { useState } from "react";
import Keys from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "styles/components/Keyboard.scss";

const Keyboard: React.FC = () => {
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

  window.addEventListener("keydown", (e: { key: string }) => {
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
  });

  return (
    <div className="keyboard">
      <Keys onInit={(keyboard: any) => initKeysHandler(keyboard)} />
    </div>
  );
};

export default Keyboard;
