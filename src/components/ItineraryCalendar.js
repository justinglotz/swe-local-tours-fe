import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getSingleTour } from '@/api/tourData';

function ItineraryCalendar({ itinerary }) {
  const [eventsWithDuration, setEventsWithDuration] = useState([]);

  useEffect(() => {
    const fetchTourDetails = async () => {
      const eventPromises = itinerary.map(async (item) => {
        try {
          const tourDetails = await getSingleTour(item.tour.id);
          const dateTime = `${item.tour.date}T${item.tour.time}`;
          const startDate = new Date(dateTime);
          const endDate = new Date(startDate.getTime() + tourDetails.duration * 60 * 1000);

          return {
            id: item.id.toString(),
            title: item.tour.name,
            start: dateTime,
            end: endDate.toISOString(),
            extendedProps: {
              location: item.location.name,
              completed: item.completed,
            },
          };
        } catch (error) {
          console.error(`Error fetching tour details for tour ${item.tour.id}:`, error);
          const dateTime = `${item.tour.date}T${item.tour.time}`;
          return {
            id: item.id.toString(),
            title: item.tour.name,
            start: dateTime,
            end: new Date(new Date(dateTime).getTime() + 2 * 60 * 60 * 1000).toISOString(),
            extendedProps: {
              location: item.location.name,
              completed: item.completed,
            },
          };
        }
      });

      const resolvedEvents = await Promise.all(eventPromises);
      setEventsWithDuration(resolvedEvents);
    };

    fetchTourDetails();
  }, [itinerary]);

  const renderEventContent = (eventInfo) => {
    const isWeekView = eventInfo.view.type === 'timeGridWeek';
    const isDayView = eventInfo.view.type === 'timeGridDay';

    return (
      <div className="event-content">
        <div className="fw-bold">{eventInfo.event.title}</div>
        {!isWeekView && !isDayView && (
          <>
            <div className="small">{eventInfo.event.extendedProps.location}</div>
            <div className="small text-muted">${eventInfo.event.extendedProps.price}</div>
            {eventInfo.event.extendedProps.completed && <div className="small text-success">✓ Completed</div>}
          </>
        )}
      </div>
    );
  };

  return (
    <Card className="mb-4 w-75 mx-auto h-100">
      <Card.Header>
        <Card.Title as="h5">Calendar View</Card.Title>
      </Card.Header>
      <Card.Body className="h-100 p-2">
        <style>
          {`
            .fc-event-title, .fc-event-main-frame {
              white-space: normal !important;
              overflow: visible !important;
              display: block !important;
            }
            .fc-event-main {
              display: block !important;
              overflow: visible !important;
            }
            .fc-daygrid-event, .fc-timegrid-event {
              height: auto !important;
            }
          `}
        </style>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          events={eventsWithDuration}
          eventContent={renderEventContent}
          dayMaxEvents={3}
        />
      </Card.Body>
    </Card>
  );
}

ItineraryCalendar.propTypes = {
  itinerary: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      tour: PropTypes.shape({
        id: PropTypes.number,
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
