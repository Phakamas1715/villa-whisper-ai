import { calendarEvents, propertyImages } from '@/data/mockData';
import { CheckCircle2, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const CalendarView = () => {
  const { t } = useLanguage();

  const days: { date: Date; currentMonth: boolean }[] = [];
  const startDate = new Date(2026, 2, 1);
  const startDay = startDate.getDay();
  for (let i = startDay - 1; i >= 0; i--) days.push({ date: new Date(2026, 1, 28 - i), currentMonth: false });
  for (let i = 1; i <= 31; i++) days.push({ date: new Date(2026, 2, i), currentMonth: true });
  while (days.length < 42) days.push({ date: new Date(2026, 3, days.length - 31 - startDay + 1), currentMonth: false });

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return calendarEvents.filter((e) => dateStr >= e.checkIn && dateStr < e.checkOut);
  };

  const today = new Date();

  return (
    <div>
      <h2 className="font-display font-bold text-lg text-foreground mb-1">{t('calendar.title')}</h2>
      
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-5">
        <p className="font-display text-sm font-semibold text-foreground">{t('calendar.month')}</p>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"><ChevronLeft size={16} className="text-muted-foreground" /></button>
          <button className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"><ChevronRight size={16} className="text-muted-foreground" /></button>
        </div>
      </div>

      <div className="glass-card p-4 mb-6">
        <div className="grid grid-cols-7 gap-0.5 mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="text-center font-display text-[10px] text-muted-foreground uppercase tracking-wider py-2 font-bold">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {days.map(({ date, currentMonth }, idx) => {
            const events = getEventsForDate(date);
            const isToday = date.toDateString() === today.toDateString();
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className={`min-h-[60px] rounded-xl p-1.5 transition-all cursor-pointer ${!currentMonth ? 'opacity-20' : ''} ${isToday ? 'bg-accent/10 ring-2 ring-accent/30 shadow-sm' : 'hover:bg-muted/50'}`}
              >
                <span className={`font-display text-[11px] font-medium ${isToday ? 'text-accent font-extrabold' : 'text-foreground'}`}>{date.getDate()}</span>
                <div className="mt-0.5 space-y-0.5">
                  {events.map((ev) => (
                    <div key={ev.id} className={`text-[7px] font-display font-semibold px-1 py-0.5 rounded-md truncate ${ev.status === 'confirmed' ? 'bg-accent/15 text-accent' : 'bg-villa-gold/10 text-villa-gold'}`}>{ev.property.replace('Villa ', '')}</div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <h3 className="section-header">{t('calendar.upcoming')}</h3>
      <div className="space-y-2.5">
        {calendarEvents.map((ev, idx) => {
          const img = propertyImages[ev.property];
          return (
            <motion.div key={ev.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: idx * 0.06 }} className="glass-card p-0 overflow-hidden flex group cursor-pointer">
              {img && (
                <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                  <img src={img} alt={ev.property} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                </div>
              )}
              <div className="flex-1 p-3 flex items-center gap-3">
                {ev.status === 'confirmed' ? <CheckCircle2 size={18} className="text-accent flex-shrink-0" /> : <Clock size={18} className="text-villa-gold flex-shrink-0" />}
                <div className="min-w-0">
                  <span className="font-display text-sm font-bold text-foreground block truncate">{ev.property}</span>
                  <span className="font-body text-xs text-muted-foreground block truncate">{ev.guest}</span>
                  <span className="font-display text-[10px] text-muted-foreground mt-0.5 block">{ev.checkIn} → {ev.checkOut}</span>
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
