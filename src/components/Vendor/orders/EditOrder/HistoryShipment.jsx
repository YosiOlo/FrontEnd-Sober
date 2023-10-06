import React from "react";

function HistoryShipment({ historyData }) {
  return (
    <div className="history mt-5 bg-white">
      <div className="header p-4 border-b-[1px] border-slate-200">
        <h1>History</h1>
      </div>
      <div className="steps">
        <ul className="steps steps-vertical">
          {historyData.map((step, index) => (
            <li
              className={`step ${index % 2 === 0 ? "step-accent" : ""}`}
              key={index}
            >
              {step}
            </li>
          ))}
        </ul>
        <div className="date flex flex-col gap-16">
          <ul>
            {historyData.map((_, index) => (
              <li key={index}>2023-08-07 11:45:06</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HistoryShipment;
