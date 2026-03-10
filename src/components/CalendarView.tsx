import { calendarEvents, propertyImages } from '@/data/mockData';
import { CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const CalendarView = () => {
  const days = [];
  const startDate = new Date(2026, 2, 1);
  const startDay = startDate.getDay();

  // Fill previous month days
  for (let i = startDay - 1; i >= 0; i--) {
    const d = new Date(2026, 1, 28 - i);
    days.push({ date: d, currentMonth: false });
  }
  for (let i = 1; i <= 31; i++) {
    days.push({ date: new Date(2026, 2, i), currentMonth: true });
  }
  // Fill to 42 cells
  while (days.length < 42) {
    const d = new Date(2026, 3, days.length - 31 - startDay + 1);
    days.push({ date: d, currentMonth: false });
  }

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return calendarEvents.filter((e) => dateStr >= e.checkIn && dateStr < e.checkOut);
  };

  const today = new Date();

  return (
    <div>
      <h2 className="font-display font-bold text-lg text-foreground mb-1">Calendar</h2>
      <p className="font-display text-xs text-muted-foreground mb-5">March 2026</p>

      <div className="glass-card p-4 mb-6">
        <div className="grid grid-cols-7 gap-0.5 mb-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="text-center font-display text-[10px] text-muted-foreground uppercase tracking-wider py-2 font-semibold">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0.5">
          {days.map(({ date, currentMonth }, idx) => {
            const events = getEventsForDate(date);
            const isToday = date.toDateString() === today.toDateString();

            return (
              <div
                key={idx}
                className={`min-h-[56px] rounded-lg p-1 transition-colors ${
                  !currentMonth ? 'opacity-20' : ''
                } ${isToday ? 'bg-accent/10 ring-1 ring-accent/30' : 'hover:bg-muted/50'}`}
              >
                <span className={`font-display text-[11px] font-medium ${isToday ? 'text-accent font-bold' : 'text-foreground'}`}>
                  {date.getDate()}
                </span>
                <div className="mt-0.5 space-y-0.5">
                  {events.map((ev) => (
                    <div
                      key={ev.id}
                      className={`text-[7px] font-display font-medium px-1 py-px rounded truncate ${
                        ev.status === 'confirmed' ? 'bg-accent/15 text-accent' : 'bg-muted text-muted-foreground'
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
      </div>

      <h3 className="section-header">Upcoming</h3>
      <div className="space-y-2">
        {calendarEvents.map((ev, idx) => {
          const img = propertyImages[ev.property];
          return (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.06 }}
              className="glass-card p-0 overflow-hidden flex"
            >
              {img && <img src={img} alt={ev.property} className="w-20 h-20 object-cover flex-shrink-0" />}
              <div className="flex-1 p-3 flex items-center gap-3">
                {ev.status === 'confirmed' ? (
                  <CheckCircle2 size={16} className="text-accent flex-shrink-0" />
                ) : (
                  <Clock size={16} className="text-muted-foreground flex-shrink-0" />
                )}
                <div className="min-w-0">
                  <span className="font-display text-sm font-semibold text-foreground block truncate">{ev.property}</span>
                  <span className="font-body text-xs text-muted-foreground block truncate">{ev.guest}</span>
                  <span className="font-display text-[10px] text-muted-foreground">{ev.checkIn} → {ev.checkOut}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
