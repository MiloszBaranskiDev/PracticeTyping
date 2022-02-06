import React, { useState } from "react";
import Text from "components/Text";
import Keyboard from "components/Keyboard";
import "./App.scss";

const App: React.FC = () => {
  const [letterIndex, updateLetterIndex] = useState<number>(0);
  return (
    <div className="App">
      <Text letterIndex={letterIndex} />
      <Keyboard />
    </div>
  );
};

export default App;
