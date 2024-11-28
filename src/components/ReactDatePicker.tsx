"use client";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CustomDatePicker() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    // Only close the calendar if both start and end dates are selected
    if (start && end) {
      setIsCalendarOpen(false);
    }
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Date display button */}
      <button
        className="w-[300px] flex items-center border p-2 rounded-md shadow-sm bg-white hover:bg-gray-100 transition"
        onClick={toggleCalendar}
      >
        <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
        {startDate ? (
          endDate ? (
            <>
              {format(startDate, "LLL dd, y")} - {format(endDate, "LLL dd, y")}
            </>
          ) : (
            format(startDate, "LLL dd, y")
          )
        ) : (
          <span className="text-gray-500">Pick a date</span>
        )}
      </button>

      {/* Inline date picker, only shown when isCalendarOpen is true */}
      {isCalendarOpen && (
        <div className="mt-2 border rounded-md shadow-lg">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            monthsShown={2}
          />
        </div>
      )}
    </div>
  );
}

export default CustomDatePicker;
