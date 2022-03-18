import React, { useState, useEffect } from "react";
import Text from "components/Text";
import Keyboard from "components/Keyboard";
import Result from "components/Result";
import Icons from "components/Icons";
import "./App.scss";

const App: React.FC = () => {
  const [showResult, updateShowResult] = useState<boolean>(false);

  const [textAccuracy, updateTextAccuracy] = useState<Node | null>(null);
  const [pointAccuracy, updatePointAccuracy] = useState<string>("");
  const [percentageAccuracy, updatePercentageAccuracy] = useState<string>("");

  const [clickedLetter, updateClickedLetter] = useState<string>("");
  const [letterIndex, updateLetterIndex] = useState<number>(0);

  const [width, updateWidth] = useState<number>(window.innerWidth);

  const widthHandler = () => {
    updateWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", widthHandler);
    return () => window.removeEventListener("resize", widthHandler);
  }, []);

  return (
    <div className="App">
      <Icons />
      <div className="container">
        {width > 1023 ? (
          <>
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
          </>
        ) : (
          <div className="error">
            <p>
              Sorry. This app is not intended for use on mobile. Please visit on
              laptop or desktop with minimum 1024px width.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
