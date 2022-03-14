import React from "react";
import DOMPurify from "dompurify";

interface Props {
  textAccuracy: Node | null;
  pointAccuracy: string;
  percentageAccuracy: string;
}

const Result: React.FC<Props> = ({
  textAccuracy,
  pointAccuracy,
  percentageAccuracy,
}) => {
  return (
    <div className="result">
      <h1 className="result__heading">Your result</h1>
      {textAccuracy && (
        <div
          className="result__text"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(textAccuracy) }}
        ></div>
      )}
      <p className="result__points">Points: {pointAccuracy}</p>
      <p className="result__percentage">Percentage: {percentageAccuracy}</p>
    </div>
  );
};

export default Result;
