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
        list="confidencesteplist"
      />
      <datalist id="confidencesteplist">
        <option>0</option>
        <option>25</option>
        <option>50</option>
        <option>75</option>
        <option>100</option>
      </datalist>
      <div>Notes: {stats.notes}</div>
    </div>
  );
};

export default Stats;
