import React from "react";

const Stats = ({ stats }) => {
  return (
    <div>
      <div>Times practiced: {stats.timesPracticed}</div>
      <div>Confidence level: {stats.confidence}</div>
      <div>Notes: {stats.notes}</div>
    </div>
  );
};

export default Stats;
