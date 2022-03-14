import React, { useState } from "react";
import Text from "components/Text";
import Keyboard from "components/Keyboard";
import Result from "components/Result";
import "./App.scss";

const App: React.FC = () => {
  const [showResult, updateShowResult] = useState<boolean>(false);

  const [textAccuracy, updateTextAccuracy] = useState<Node | null>(null);
  const [pointAccuracy, updatePointAccuracy] = useState<string>("");
  const [percentageAccuracy, updatePercentageAccuracy] = useState<string>("");

  const [clickedLetter, updateClickedLetter] = useState<string>("");
  const [letterIndex, updateLetterIndex] = useState<number>(0);

  return (
    <div className="App">
      {!showResult ? (
        <>
          <Text
            clickedLetter={clickedLetter}
            letterIndex={letterIndex}
            updateLetterIndex={updateLetterIndex}
            updateShowResult={updateShowResult}
            updateTextAccuracy={updateTextAccuracy}
            updatePointAccuracy={updatePointAccuracy}
            updatePercentageAccuracy={updatePercentageAccuracy}
          />
          <Keyboard
            updateClickedLetter={updateClickedLetter}
            updateLetterIndex={updateLetterIndex}
          />
        </>
      ) : (
        <Result
          textAccuracy={textAccuracy}
          pointAccuracy={pointAccuracy}
          percentageAccuracy={percentageAccuracy}
        />
      )}
    </div>
  );
};

export default App;
