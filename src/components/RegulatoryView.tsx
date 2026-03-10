import { mockTimeline, propertyImages } from '@/data/mockData';
import { Shield, CheckCircle2, Clock, AlertTriangle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const RegulatoryView = () => {
  const { t } = useLanguage();
  const items = mockTimeline.filter((ti) => ti.type === 'regulatory');
  const pending = items.filter((ti) => ti.status === 'pending');
  const completed = items.filter((ti) => ti.status === 'completed');

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Shield size={20} className="text-accent" />
        <h2 className="font-display font-bold text-lg text-foreground">{t('regulatory.title')}</h2>
      </div>
      <p className="font-body text-xs text-muted-foreground mb-5">{t('regulatory.subtitle')}</p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <motion.button initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card flex flex-col items-center justify-center py-6 hover:ring-2 hover:ring-accent/30 transition-all">
          <Shield size={28} className="text-accent mb-2" />
          <span className="font-display text-sm font-bold text-foreground">TM30</span>
          <span className="font-display text-[10px] text-muted-foreground mt-0.5">{t('regulatory.auto_generate')}</span>
        </motion.button>
        <motion.button initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 }} className="glass-card flex flex-col items-center justify-center py-6 hover:ring-2 hover:ring-accent/30 transition-all">
          <FileText size={28} className="text-villa-ocean mb-2" />
          <span className="font-display text-sm font-bold text-foreground">ภ.ง.ด.</span>
          <span className="font-display text-[10px] text-muted-foreground mt-0.5">{t('regulatory.export_tax')}</span>
        </motion.button>
      </div>

      {pending.length > 0 && (
        <div className="mb-6">
          <h3 className="section-header flex items-center gap-1"><AlertTriangle size={12} className="text-destructive" /> {t('regulatory.action_required')} ({pending.length})</h3>
          <div className="space-y-2.5">
            {pending.map((item) => {
              const img = propertyImages[item.data.property as string];
              return (
                <div key={item.id} className="glass-card p-0 overflow-hidden">
                  {img && (
                    <div className="relative h-28 overflow-hidden">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-r from-destructive/20 to-transparent" />
                      <div className="absolute top-2.5 left-3"><span className="badge-destructive shadow-sm">{t('regulatory.urgent')}</span></div>
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="font-display text-sm font-bold text-foreground">{item.title}</h4>
                    <p className="font-body text-xs text-muted-foreground mt-1">{item.subtitle}</p>
                    {item.data.deadline && <p className="badge-destructive inline-block mt-2">{t('detail.deadline')}: {item.data.deadline as string}</p>}
                    <Button size="sm" className="mt-3 w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display font-bold text-xs h-10">{t('regulatory.submit_now')}</Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {completed.length > 0 && (
        <div>
          <h3 className="section-header flex items-center gap-1"><CheckCircle2 size={12} className="text-accent" /> {t('regulatory.completed')} ({completed.length})</h3>
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

export default RegulatoryView;
