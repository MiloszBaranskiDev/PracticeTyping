import React from "react";

interface Props {
  pointAccuracy: string;
  percentageAccuracy: string;
}

const Result: React.FC<Props> = ({ pointAccuracy, percentageAccuracy }) => {
  return (
    <div>
      <p>Points: {pointAccuracy}</p>
      <p>Percentage: {percentageAccuracy}</p>
    </div>
  );
};

export default Result;
