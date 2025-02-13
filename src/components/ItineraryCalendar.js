import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ItineraryCalendar({ itinerary }) {
  // Transform itineraries into FullCalendar events
  const events = itinerary.map((item) => {
    const dateTime = `${item.tour.date}T${item.tour.time}`;
    return {
      id: item.id.toString(),
      title: item.tour.name,
      start: dateTime,
      end: new Date(new Date(dateTime).getTime() + 2 * 60 * 60 * 1000).toISOString(), // Assuming 2 hour duration
      extendedProps: {
        location: item.location.name,
        address: item.location.address,
        price: item.tour.price,
        completed: item.completed,
      },
    };
  });

  const renderEventContent = (eventInfo) => (
    <div className="p-1">
      <div className="fw-bold">{eventInfo.event.title}</div>
      <div className="small">{eventInfo.event.extendedProps.location}</div>
      <div className="small text-muted">{eventInfo.event.extendedProps.time}</div>
      {eventInfo.event.extendedProps.completed && <div className="small text-success">✓ Completed</div>}
    </div>
  );

  return (
    <Card className="mb-4 w-75 mx-auto h-100">
      <Card.Header>
        <Card.Title as="h5">Calendar View</Card.Title>
      </Card.Header>
      <Card.Body className="h-100 p-2">
        <div>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            events={events}
            eventContent={renderEventContent}
            dayMaxEvents={3}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

ItineraryCalendar.propTypes = {
  itinerary: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      tour: PropTypes.shape({
        name: PropTypes.string,
        date: PropTypes.string,
        time: PropTypes.string,
        price: PropTypes.string,
      }),
      location: PropTypes.shape({
        name: PropTypes.string,
        address: PropTypes.string,
      }),
      completed: PropTypes.bool,
    }),
  ).isRequired,
};

export default ItineraryCalendar;
