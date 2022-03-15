import React from "react";
import DOMPurify from "dompurify";
import "styles/components/Result.scss";

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
      <div className="result__stats">
        <p className="result__points">
          Points: <strong>{pointAccuracy}</strong>
        </p>
        <p className="result__percentage">
          Percentage: <strong>{percentageAccuracy}</strong>
        </p>
      </div>
      <button
        type="button"
        className="result__btn"
        onClick={() => {
          window.location.reload();
        }}
      >
        Restart
      </button>
    </div>
  );
};

export default Result;
