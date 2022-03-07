import React, { useState } from "react";
import Text from "components/Text";
import Keyboard from "components/Keyboard";
import "./App.scss";

const App: React.FC = () => {
  const [clickedLetter, updateClickedLetter] = useState<string | null>(null);
  const [letterIndex, updateLetterIndex] = useState<number>(0);

  return (
    <div className="App">
      <Text
        clickedLetter={clickedLetter}
        letterIndex={letterIndex}
        updateLetterIndex={updateLetterIndex}
      />
      <Keyboard
        updateClickedLetter={updateClickedLetter}
        updateLetterIndex={updateLetterIndex}
      />
    </div>
  );
};

export default App;
