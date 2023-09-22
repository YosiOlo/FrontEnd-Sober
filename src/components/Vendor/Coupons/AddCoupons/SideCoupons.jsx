import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
function SideCoupons() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <div>
      <div className="card bg-white rounded-md p-5 text-black">
        <div className="startDate mb-5">
          <p>Start Date</p>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            locale="pt-BR"
            showTimeSelect
            timeFormat="p"
            timeIntervals={15}
            dateFormat="Pp"
            className="bg-[#f9f9f9] p-2"
          />
        </div>
        <div className="endDate">
          <p>End Time</p>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            locale="pt-BR"
            showTimeSelect
            timeFormat="p"
            timeIntervals={15}
            dateFormat="Pp"
            className="bg-[#f9f9f9] p-2"
          />
        </div>
      </div>
      <div className="mt-3 card bg-white rounded-md grid grid-cols-2 p-4 gap-6">
        <button className="bg-white border-2 rounded-md w-[]">Cancel</button>
        <button className="bg-[#0DCAF0] rounded-md text-white">Save</button>
      </div>
    </div>
  );
}

export default SideCoupons;
