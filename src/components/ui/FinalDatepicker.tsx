"use client";
import { format, isBefore, isSameDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

function FinalDatepicker() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const today = new Date();

  const handleDateChange = (day) => {
    if (isBefore(day, today)) return;
    // Prevent selecting dates before today

    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
      setHoverDate(null);
    } else if (startDate && !endDate) {
      if (day > startDate) {
        setEndDate(day);
        setHoverDate(null);
        setIsCalendarOpen(false);
      } else {
        setStartDate(day);
      }
    }
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const generateCalendarDays = (month, year) => {
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = endOfMonth.getDate();

    let days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const isDateInRange = (date) => {
    return startDate && endDate && date >= startDate && date <= endDate;
  };

  const isDateSelected = (date) => {
    return (
      startDate &&
      format(date, "yyyy-MM-dd") === format(startDate, "yyyy-MM-dd")
    );
  };

  const isEndDateSelected = (date) => {
    return (
      endDate && format(date, "yyyy-MM-dd") === format(endDate, "yyyy-MM-dd")
    );
  };

  const isHoveredDate = (date) => {
    return hoverDate && date >= startDate && date <= hoverDate;
  };

  const renderCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = generateCalendarDays(month, year);
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div className="">
        <div className="bg-white p-4 w-[350px] md:h-[330px] h-[300px] shadow-sm ">
          {/* Month and Year Navigation */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => changeMonth(-1)}
              className="px-3 rounded bg-gray-200 hover:bg-gray-300"
            >
              &lt;
            </button>
            <span className="font-semibold">{format(date, "MMMM yyyy")}</span>
            <button
              onClick={() => changeMonth(1)}
              className="px-3 rounded bg-gray-200 hover:bg-gray-300"
            >
              &gt;
            </button>
          </div>

          {/* Weekday Names */}
          <div className="grid grid-cols-7 text-center text-gray-600">
            {weekDays.map((day) => (
              <span key={day} className="text-sm">
                {day}
              </span>
            ))}
          </div>

          {/* Days of the Month */}
          <div className="grid grid-cols-7 gap-2 mt-2">
            {days.map((day) => {
              const isToday = isSameDay(day, today);
              const isBeforeToday = isBefore(day, today);

              return (
                <button
                  key={day.toISOString()}
                  className={`p-2 w-10 rounded ${
                    isToday
                      ? "border " // Highlight today's date
                      : isDateSelected(day)
                      ? "bg-black text-white"
                      : isEndDateSelected(day)
                      ? "bg-black text-white"
                      : isDateInRange(day)
                      ? "bg-gray-200"
                      : isHoveredDate(day)
                      ? "bg-gray-200"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleDateChange(day)}
                  onMouseEnter={() =>
                    startDate && !endDate && !isBeforeToday && setHoverDate(day)
                  }
                  onMouseLeave={() => setHoverDate(null)}
                  disabled={isBeforeToday} // Disable dates before today
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Calculate the next month's date for the second calendar
  const nextMonthDate = new Date(currentDate);
  nextMonthDate.setMonth(currentDate.getMonth() + 1);

  return (
    <div className="flex flex-col items-center relative">
      {/* Date display button */}
      <button
        className="w-[400px] flex items-center relative border p-2 rounded-md shadow-sm bg-white hover:bg-gray-100 transition"
        onClick={toggleCalendar}
      >
        <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
        {startDate ? (
          endDate ? (
            <>
              {format(startDate, "EEEE, LLL dd, yyyy")} -{" "}
              {format(endDate, "EEEE, LLL dd, yyyy")}
            </>
          ) : (
            format(startDate, "EEEE, LLL dd, yyyy")
          )
        ) : (
          <span className="text-gray-500">Pick a date</span>
        )}
      </button>

      {/* Calendars shown side by side */}
      {isCalendarOpen && (
        <div className="mt-2 md:flex absolute top-10 z-20">
          {renderCalendar(currentDate)}
          {renderCalendar(nextMonthDate)}
        </div>
      )}
    </div>
  );
}

export default FinalDatepicker;

// "use client";
// import { format } from "date-fns";
// import { Calendar as CalendarIcon } from "lucide-react";
// import { useState } from "react";

// function FinalDatepicker() {
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [hoverDate, setHoverDate] = useState(null);
//   const [isCalendarOpen, setIsCalendarOpen] = useState(false);
//   const [currentDate, setCurrentDate] = useState(new Date());

//   console.log(startDate, endDate);
//   const handleDateChange = (day) => {
//     if (!startDate || (startDate && endDate)) {
//       setStartDate(day);
//       setEndDate(null);
//       setHoverDate(null);
//     } else if (startDate && !endDate) {
//       if (day > startDate) {
//         setEndDate(day);
//         setHoverDate(null);
//         setIsCalendarOpen(false);
//       } else {
//         setStartDate(day);
//       }
//     }
//   };

//   const toggleCalendar = () => {
//     setIsCalendarOpen(!isCalendarOpen);
//   };

//   const changeMonth = (direction) => {
//     const newDate = new Date(currentDate);
//     newDate.setMonth(newDate.getMonth() + direction);
//     setCurrentDate(newDate);
//   };

//   const generateCalendarDays = (month, year) => {
//     const startOfMonth = new Date(year, month, 1);
//     const endOfMonth = new Date(year, month + 1, 0);
//     const daysInMonth = endOfMonth.getDate();

//     let days = [];
//     for (let i = 1; i <= daysInMonth; i++) {
//       days.push(new Date(year, month, i));
//     }
//     return days;
//   };

//   const isDateInRange = (date) => {
//     return startDate && endDate && date >= startDate && date <= endDate;
//   };

//   const isDateSelected = (date) => {
//     return (
//       startDate &&
//       format(date, "yyyy-MM-dd") === format(startDate, "yyyy-MM-dd")
//     );
//   };

//   const isEndDateSelected = (date) => {
//     return (
//       endDate && format(date, "yyyy-MM-dd") === format(endDate, "yyyy-MM-dd")
//     );
//   };

//   const isHoveredDate = (date) => {
//     return hoverDate && date >= startDate && date <= hoverDate;
//   };

//   const renderCalendar = (date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const days = generateCalendarDays(month, year);

//     return (
//       <div className="">
//         <div className="  bg-white p-4 w-64">
//           {/* Month and Year Navigation */}
//           <div className="flex justify-between items-center mb-4">
//             <button
//               onClick={() => changeMonth(-1)}
//               className="px-3 rounded bg-gray-200 hover:bg-gray-300 "
//             >
//               &lt;
//             </button>
//             <span className="font-semibold">{format(date, "MMMM yyyy")}</span>
//             <button
//               onClick={() => changeMonth(1)}
//               className="px-3 rounded bg-gray-200 hover:bg-gray-300"
//             >
//               &gt;
//             </button>
//           </div>
//           {/* Days of the Month */}
//           <div className="grid grid-cols-7 gap-2">
//             {days.map((day) => (
//               <button
//                 key={day.toISOString()}
//                 className={`p-2 w-10 rounded ${
//                   isDateSelected(day)
//                     ? "bg-black text-white"
//                     : isEndDateSelected(day)
//                     ? "bg-black text-white"
//                     : isDateInRange(day)
//                     ? "bg-gray-200"
//                     : isHoveredDate(day)
//                     ? "bg-gray-200"
//                     : "hover:bg-gray-100"
//                 }`}
//                 onClick={() => handleDateChange(day)}
//                 onMouseEnter={() => startDate && !endDate && setHoverDate(day)}
//                 onMouseLeave={() => setHoverDate(null)}
//               >
//                 {day.getDate()}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Calculate the next month's date for the second calendar
//   const nextMonthDate = new Date(currentDate);
//   nextMonthDate.setMonth(currentDate.getMonth() + 1);

//   return (
//     <div className="flex flex-col items-center relative">
//       {/* Date display button */}
//       <button
//         className="w-[400px] flex items-center relative border p-2 rounded-md shadow-sm bg-white hover:bg-gray-100 transition"
//         onClick={toggleCalendar}
//       >
//         <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
//         {startDate ? (
//           endDate ? (
//             <>
//               {format(startDate, "EEEE, LLL dd, yyyy")} -{" "}
//               {format(endDate, "EEEE, LLL dd, yyyy")}
//             </>
//           ) : (
//             format(startDate, "EEEE, LLL dd, yyyy")
//           )
//         ) : (
//           <span className="text-gray-500">Pick a date</span>
//         )}
//       </button>

//       {/* Calendars shown side by side */}
//       {isCalendarOpen && (
//         <div className="mt-2 md:flex  absolute top-10 z-20">
//           {renderCalendar(currentDate)}
//           {renderCalendar(nextMonthDate)}
//         </div>
//       )}
//     </div>
//   );
// }

// export default FinalDatepicker;