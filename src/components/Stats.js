import React from "react";

const Stats = ({ stats, id, handleConfidence }) => {
  return (
    <div>
      <div>Times practiced: {stats.timesPracticed}</div>
      <div>Confidence level: {stats.confidence}</div>
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={stats.confidence}
        onChange={(e) => handleConfidence(id, e.target.value)}
      />
      <div>Notes: {stats.notes}</div>
    </div>
  );
};

export default Stats;
