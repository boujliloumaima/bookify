import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import axios from "axios";
import { useState, useEffect } from "react";
import "../assets/calendar.css";

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/events");
      console.log(res.data);
      const formattedEvents = res.data.map((event) => ({
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Erreur de récupération des événements :", error);
    }
  };
  const handleDateSelect = async (selectInfo) => {
    const title = prompt("Titre de l'événement:");
    if (!title) return;

    const newEvent = {
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      status: "encour",
    };

    try {
      const res = await axios.post(
        "http://localhost:8000/api/events",
        newEvent
      );
      const createdEvent = res.data;

      setEvents([
        ...events,
        {
          id: createdEvent.id,
          title: createdEvent.title,
          start: createdEvent.start,
          end: createdEvent.end,
          backgroundColor: getColorByStatus(createdEvent.status),
        },
      ]);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'événement:", error);
    }
  };

  const handleEventDrop = async (dropInfo) => {
    const { id, start, end } = dropInfo.event;

    try {
      await axios.put(`http://localhost:8000/api/events/${id}`, {
        start: start.toISOString(),
        end: end ? end.toISOString() : start.toISOString(),
      });
      fetchEvents();
    } catch (error) {
      console.error("Erreur lors du déplacement de l'événement:", error);
    }
  };

  const handleEventResize = async (resizeInfo) => {
    const { id, start, end } = resizeInfo.event;

    try {
      await axios.put(`http://localhost:8000/api/events/${id}`, {
        start: start.toISOString(),
        end: end.toISOString(),
      });
      fetchEvents();
    } catch (error) {
      console.error("Erreur lors du redimensionnement de l'événement:", error);
    }
  };

  const handleEventClick = async (clickInfo) => {
    if (
      window.confirm(`Supprimer cet événement: '${clickInfo.event.title}' ?`)
    ) {
      try {
        await axios.delete(
          `http://localhost:8000/api/events/${clickInfo.event.id}`
        );
        fetchEvents();
      } catch (error) {
        console.error("Erreur lors de la suppression de l'événement:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        eventContent={(eventInfo) => {
          return <div className="event-title">{eventInfo.event.title} </div>;
        }}
        editable={true}
        selectMirror={true}
        events={events}
        select={handleDateSelect}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        eventClick={handleEventClick}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
      />
    </div>
  );
};

export default Calendar;
