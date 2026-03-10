import { mockTimeline, propertyImages } from '@/data/mockData';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const TasksView = () => {
  const { t } = useLanguage();
  const tasks = mockTimeline.filter((item) => item.type === 'task');
  const active = tasks.filter((item) => item.status !== 'completed');
  const completed = tasks.filter((item) => item.status === 'completed');

  return (
    <div>
      <h2 className="font-display font-bold text-lg text-foreground mb-1">{t('tasks.title')}</h2>
      <p className="font-body text-xs text-muted-foreground mb-5">{t('tasks.subtitle')}</p>

      {active.length > 0 && (
        <div className="mb-6">
          <h3 className="section-header">{t('tasks.active')} ({active.length})</h3>
          <div className="space-y-3">
            {active.map((item, idx) => {
              const img = propertyImages[item.data.property as string];
              return (
                <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: idx * 0.06 }} className="glass-card p-0 overflow-hidden">
                  {img && <img src={img} alt="" className="w-full h-28 object-cover" />}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Loader2 size={14} className="text-villa-gold animate-spin" />
                      <span className="font-display text-sm font-semibold text-foreground">{item.title}</span>
                    </div>
                    <p className="font-body text-xs text-muted-foreground">{item.subtitle}</p>
                    {item.data.autoCreated && <span className="badge-accent mt-2 inline-block">{t('tasks.auto_created')}</span>}
                    {item.data.checklist && (
                      <div className="mt-3 space-y-2">
                        {(item.data.checklist as string[]).map((c, i) => (
                          <div key={i} className="flex items-center gap-2 font-body text-xs text-muted-foreground">
                            <div className="w-4 h-4 rounded border-2 border-muted-foreground/20 flex-shrink-0" />{c}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {completed.length > 0 && (
        <div>
          <h3 className="section-header flex items-center gap-1"><CheckCircle2 size={12} className="text-accent" /> {t('tasks.completed')} ({completed.length})</h3>
          <div className="space-y-2">
            {completed.map((item) => (
              <div key={item.id} className="glass-card p-4 opacity-70">
                <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent" /><span className="font-display text-sm text-foreground">{item.title}</span></div>
                <p className="font-body text-xs text-muted-foreground mt-1">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksView;
