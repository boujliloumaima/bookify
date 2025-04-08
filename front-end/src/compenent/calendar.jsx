import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../assets/calendar.css";
const Calendar = () => {
  const events = [
    { title: "RéservationA", date: "2025-04-10" },
    { title: "Maintenance", date: "2025-04-15" },
    { title: "Vacances", date: "2025-04-20" },
  ];
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
        //event click
        validRange={{
          start: today,
        }}
      />
    </div>
  );
};

export default Calendar;
