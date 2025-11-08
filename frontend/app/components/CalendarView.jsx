'use client';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import { format, parseISO } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Use date-fns localizer instead of moment
const localizer = momentLocalizer(require('moment')); // you can use date-fns localizer if you prefer

export default function CalendarView({ tasks }) {
  // Convert your tasks into events for the calendar
  const events = tasks
    .filter((t) => t.dueDate) // only tasks with due dates
    .map((task) => ({
      id: task._id,
      title: `${task.title} (${task.category})`,
      start: parseISO(task.dueDate),
      end: parseISO(task.dueDate),
      allDay: true,
      resource: task,
    }));

  const eventStyleGetter = (event) => {
    const priority = event.resource.priority;
    let backgroundColor =
      priority === 'High'
        ? '#FCA5A5' // red-300
        : priority === 'Medium'
        ? '#FCD34D' // yellow-300
        : '#86EFAC'; // green-300
    return { style: { backgroundColor, borderRadius: '6px' } };
  };

  return (
    <div className="bg-white p-3 md:p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        📅 Calendar View
      </h2>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
        views={['month', 'week', 'day']}
        popup
      />
    </div>
  );
}
