"use client";
import { format, isBefore, isSameDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";

type Time = {
  hours: string;
  minutes: string;
};

function ZiarahTime() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Time>({ hours: "", minutes: "" });
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const today = new Date();

  const handleDateChange = (day: Date) => {
    if (isBefore(day, today)) return;
    setStartDate(day);
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleTimeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTime((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const renderCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = Array.from(
      { length: new Date(year, month + 1, 0).getDate() },
      (_, i) => new Date(year, month, i + 1)
    );
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div className="bg-white p-4 w-[330px] md:h-[330px] h-[300px]">
        <div className="flex items-center mb-4">
          <button
            onClick={() => changeMonth(-1)}
            className="px-3 rounded bg-gray-200 hover:bg-gray-300"
          >
            &lt;
          </button>
          <span className="flex-1 text-center font-semibold">
            {format(date, "MMMM yyyy")}
          </span>
          <button
            onClick={() => changeMonth(1)}
            className="px-3 rounded bg-gray-200 hover:bg-gray-300"
          >
            &gt;
          </button>
        </div>

        <div className="grid grid-cols-7 text-center text-gray-600">
          {weekDays.map((day) => (
            <span key={day} className="text-sm">
              {day}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 mt-2">
          {days.map((day) => (
            <button
              key={day.toISOString()}
              className={`p-2 w-10 rounded text-sm ${
                isSameDay(day, today) ? "border" : "hover:bg-gray-100"
              } ${
                isSameDay(day, startDate)
                  ? "bg-black hover:bg-black text-white"
                  : ""
              }`}
              onClick={() => handleDateChange(day)}
              disabled={isBefore(day, today)}
            >
              {day.getDate()}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center relative">
      <button
        className="w-[400px] flex items-center relative border p-2 rounded-md shadow-sm bg-white hover:bg-gray-100 transition"
        onClick={toggleCalendar}
      >
        <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
        {startDate ? (
          `${format(startDate, "EEEE, LLL dd, yyyy")} ${
            time.hours && time.minutes ? `, ${time.hours}:${time.minutes}` : ""
          }`
        ) : (
          <span className="text-gray-500">Pick a date and time</span>
        )}
      </button>

      {isCalendarOpen && (
        <div className="mt-2 md:flex absolute top-10 z-20 border shadow rounded bg-white">
          {renderCalendar(currentDate)}
          <div className="bg-white p-4 w-[330px]">
            <div className="mb-4 space-y-3">
              <p className="font-semibold">Select pick-up time</p>
              <p className="text-gray-700">
                Choose your approximate flight arrival time to see prices
              </p>
            </div>

            <div className="flex justify-center space-x-2">
              <select
                name="hours"
                value={time.hours}
                onChange={handleTimeChange}
                className="p-2 border rounded w-20"
              >
                {Array.from({ length: 13 }, (_, i) => (
                  <option key={i} value={i.toString().padStart(2, "0")}>
                    {i.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
              <span>:</span>
              <select
                name="minutes"
                value={time.minutes}
                onChange={handleTimeChange}
                className="p-2 border rounded w-20"
              >
                {Array.from({ length: 60 }, (_, i) => (
                  <option key={i} value={i.toString().padStart(2, "0")}>
                    {i.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => {
                  setTime({ hours: "", minutes: "" });
                  setIsCalendarOpen(false);
                }}
                className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsCalendarOpen(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ZiarahTime;
