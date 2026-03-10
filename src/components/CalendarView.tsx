import { calendarEvents } from '@/data/mockData';
import { CheckCircle2, Clock } from 'lucide-react';

const CalendarView = () => {
  const days = [];
  const startDate = new Date(2026, 2, 1); // March 2026

  for (let i = 0; i < 35; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    days.push(d);
  }

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return calendarEvents.filter((e) => {
      return dateStr >= e.checkIn && dateStr < e.checkOut;
    });
  };

  const today = new Date();

  return (
    <div>
      <h2 className="font-display font-bold text-lg text-foreground mb-1">Calendar</h2>
      <p className="font-display text-xs text-muted-foreground mb-4">March 2026</p>

      {/* Week headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-display text-[10px] text-muted-foreground uppercase tracking-wider py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, idx) => {
          const events = getEventsForDate(date);
          const isToday = date.toDateString() === today.toDateString();
          const isCurrentMonth = date.getMonth() === 2;

          return (
            <div
              key={idx}
              className={`timeline-card min-h-[72px] p-1.5 ${
                !isCurrentMonth ? 'opacity-30' : ''
              } ${isToday ? 'ring-1 ring-accent' : ''}`}
            >
              <span className={`font-display text-xs ${isToday ? 'text-accent font-bold' : 'text-foreground'}`}>
                {date.getDate()}
              </span>
              <div className="mt-1 space-y-0.5">
                {events.map((ev) => (
                  <div
                    key={ev.id}
                    className={`text-[8px] font-display px-1 py-0.5 rounded truncate ${
                      ev.status === 'confirmed'
                        ? 'bg-accent/10 text-accent'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {ev.property.replace('Villa ', '')}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Upcoming bookings list */}
      <div className="mt-6">
        <h3 className="font-display font-semibold text-sm text-foreground mb-3">Upcoming Bookings</h3>
        <div className="space-y-2">
          {calendarEvents.map((ev) => (
            <div key={ev.id} className="timeline-card flex items-center gap-3">
              {ev.status === 'confirmed' ? (
                <CheckCircle2 size={14} className="text-accent flex-shrink-0" />
              ) : (
                <Clock size={14} className="text-muted-foreground flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <span className="font-display text-sm font-medium text-foreground block truncate">
                  {ev.property}
                </span>
                <span className="font-body text-xs text-muted-foreground">
                  {ev.guest} · {ev.checkIn} → {ev.checkOut}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
