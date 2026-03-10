import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarCheck, User, MapPin, DollarSign, CheckCircle2, Clock,
  AlertTriangle, MessageCircle, X, Shield, QrCode, Bot, Send, TrendingUp,
} from 'lucide-react';
import GenerativeArt from './GenerativeArt';
import { propertyImages } from '@/data/mockData';
import type { TimelineItem } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface DetailPaneProps {
  item: TimelineItem | null;
  onClose: () => void;
}

const DetailPane = ({ item, onClose }: DetailPaneProps) => {
  const { t } = useLanguage();
  return (
    <AnimatePresence mode="wait">
      {item ? (
        <motion.div key={item.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.25 }} className="detail-pane h-full p-0 relative overflow-hidden">
          <button onClick={onClose} className="lg:hidden absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-card/80 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-foreground"><X size={16} /></button>
          {item.type === 'booking' && <BookingDetail item={item} />}
          {item.type === 'inquiry' && <InquiryDetail item={item} />}
          {item.type === 'task' && <TaskDetail item={item} />}
          {item.type === 'damage' && <DamageDetail item={item} />}
          {item.type === 'pricing' && <PricingDetail item={item} />}
          {item.type === 'regulatory' && <RegulatoryDetail item={item} />}
          {item.type === 'community' && <CommunityDetail item={item} />}
          {item.type === 'guest_flow' && <GuestFlowDetail item={item} />}
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="detail-pane h-full flex items-center justify-center p-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4"><CalendarCheck size={28} className="text-muted-foreground/30" /></div>
            <p className="font-display text-sm font-medium text-muted-foreground">{t('detail.select_item')}</p>
            <p className="font-body text-xs text-muted-foreground/50 mt-1">{t('detail.select_item_sub')}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function BookingDetail({ item }: { item: TimelineItem }) {
  const { t } = useLanguage();
  const d = item.data;
  const img = propertyImages[d.property as string];
  return (
    <div>
      {img && (
        <div className="relative h-48">
          <img src={img} alt={d.property as string} className="w-full h-full object-cover" />
          {item.status === 'confirmed' && d.artSeed && <div className="absolute inset-0 opacity-30"><GenerativeArt seed={d.artSeed as number} width={500} height={192} className="w-full h-full" /></div>}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        </div>
      )}
      <div className="p-5 space-y-5 -mt-8 relative">
        <div>
          <h2 className="font-display font-bold text-lg text-foreground">{d.property as string}</h2>
          <div className="flex items-center gap-2 mt-1">
            {(item.status === 'confirmed' || item.status === 'completed') && <span className="badge-accent flex items-center gap-1"><CheckCircle2 size={10} /> {item.status}</span>}
            {item.status === 'pending' && <span className="badge-muted flex items-center gap-1"><Clock size={10} /> pending</span>}
          </div>
        </div>
        <div className="space-y-3">
          <Row icon={User} label={t('detail.guest')} value={d.guestName as string} />
          <Row icon={CalendarCheck} label={t('detail.checkin')} value={d.checkIn as string} />
          <Row icon={CalendarCheck} label={t('detail.checkout')} value={d.checkOut as string} />
          <Row icon={MapPin} label={t('detail.guests')} value={`${d.guests} guests`} />
          <Row icon={DollarSign} label={t('detail.total')} value={`฿${(d.totalPrice as number).toLocaleString()}`} accent />
        </div>
        <div className="badge-muted inline-block">{d.source as string}</div>
        {item.status === 'pending' && <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold">{t('detail.confirm_booking')}</Button>}
      </div>
    </div>
  );
}

function InquiryDetail({ item }: { item: TimelineItem }) {
  const { t } = useLanguage();
  const d = item.data;
  return (
    <div className="p-5 space-y-5">
      <div>
        <h2 className="font-display font-bold text-lg text-foreground">{t('timeline.inquiry')}</h2>
        <p className="font-display text-xs text-muted-foreground mt-1">{d.channel as string} · {d.property as string} · {d.language === 'th' ? '🇹🇭' : '🇬🇧'}</p>
      </div>
      <Row icon={User} label={t('detail.from')} value={d.guestName as string} />
      <div className="bg-muted/50 rounded-xl p-4"><p className="font-body text-sm text-foreground leading-relaxed">{d.message as string}</p></div>
      {d.aiResponse && (
        <div className="bg-accent/5 rounded-xl p-4 border border-accent/10">
          <div className="flex items-center gap-1 mb-2">
            <Bot size={14} className="text-accent" />
            <span className="font-display text-xs text-accent font-bold">{t('timeline.ai_draft')}</span>
            <span className="font-display text-[10px] text-muted-foreground ml-auto">{((d.aiConfidence as number) * 100).toFixed(0)}%</span>
          </div>
          <p className="font-body text-sm text-foreground leading-relaxed">{d.aiResponse as string}</p>
        </div>
      )}
      <div className="flex gap-2">
        <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold"><Send size={14} className="mr-1.5" />{t('detail.send_ai_reply')}</Button>
        <Button variant="outline" className="font-display">{t('detail.edit')}</Button>
      </div>
    </div>
  );
}

function TaskDetail({ item }: { item: TimelineItem }) {
  const { t } = useLanguage();
  const d = item.data;
  const img = propertyImages[d.property as string];
  return (
    <div>
      {img && <img src={img} alt={d.property as string} className="w-full h-36 object-cover" />}
      <div className="p-5 space-y-5">
        <div>
          <h2 className="font-display font-bold text-lg text-foreground">{d.property as string}</h2>
          <p className="font-display text-xs text-muted-foreground mt-1 capitalize">{d.taskType as string} · {d.scheduledTime as string}</p>
          {d.autoCreated && <span className="badge-accent mt-1 inline-block">{t('tasks.auto_created')}</span>}
        </div>
        <Row icon={User} label={t('detail.assigned')} value={d.assignedTo as string} />
        <div>
          <p className="section-header">{t('detail.checklist')}</p>
          <ul className="space-y-2">
            {(d.checklist as string[]).map((c, i) => (
              <li key={i} className="flex items-center gap-2.5 font-body text-sm text-foreground">
                <CheckCircle2 size={16} className={item.status === 'completed' ? 'text-accent' : 'text-muted-foreground/20'} />{c}
              </li>
            ))}
          </ul>
        </div>
        {item.status !== 'completed' && <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold">{t('detail.mark_completed')}</Button>}
      </div>
    </div>
  );
}

function DamageDetail({ item }: { item: TimelineItem }) {
  const { t } = useLanguage();
  const d = item.data;
  return (
    <div className="p-5 space-y-5">
      <div>
        <h2 className="font-display font-bold text-lg text-foreground">{d.property as string}</h2>
        <div className="flex items-center gap-2 mt-1">
          <span className="badge-destructive flex items-center gap-1"><AlertTriangle size={10} /> {d.severity as string} {t('detail.severity')}</span>
          {d.aiDetected && <span className="badge-accent">{t('timeline.ai_detected')}</span>}
        </div>
      </div>
      {d.guestName && <Row icon={User} label={t('detail.guest')} value={d.guestName as string} />}
      <div className="bg-muted/50 rounded-xl p-4"><p className="font-body text-sm text-foreground leading-relaxed">{d.description as string}</p></div>
      <div>
        <p className="section-header">{t('detail.damaged_items')}</p>
        {(d.items as string[]).map((it, i) => <p key={i} className="font-body text-sm text-foreground">• {it}</p>)}
      </div>
      <Row icon={DollarSign} label={t('detail.est_cost')} value={`฿${(d.estimatedCost as number).toLocaleString()}`} />
      {d.autoChargeReady && (
        <div className="bg-accent/5 rounded-xl p-4 border border-accent/10">
          <p className="font-display text-xs font-bold text-accent mb-1">{t('detail.auto_charge_ready')}</p>
          <p className="font-body text-[11px] text-muted-foreground">via {d.chargeMethod as string}</p>
        </div>
      )}
      <div className="flex gap-2">
        <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold">{t('detail.send_charge')}</Button>
        <Button variant="outline" className="font-display">{t('detail.create_ticket')}</Button>
      </div>
    </div>
  );
}

function PricingDetail({ item }: { item: TimelineItem }) {
  const { t } = useLanguage();
  const d = item.data;
  return (
    <div className="p-5 space-y-5">
      <div>
        <h2 className="font-display font-bold text-lg text-foreground">{d.property as string}</h2>
        <p className="font-display text-xs text-muted-foreground mt-1">{d.period as string}</p>
      </div>
      <div className="bg-muted/50 rounded-xl p-5 space-y-4">
        <div className="flex justify-between"><span className="font-display text-xs text-muted-foreground">{t('detail.current')}</span><span className="font-display text-sm line-through text-muted-foreground">฿{(d.currentPrice as number).toLocaleString()}</span></div>
        <div className="flex justify-between items-center"><span className="font-display text-xs font-semibold text-foreground">{t('detail.suggested')}</span><span className="font-display text-2xl font-extrabold text-accent">฿{(d.suggestedPrice as number).toLocaleString()}</span></div>
        <div className="flex justify-between"><span className="font-display text-xs text-muted-foreground">{t('detail.multiplier')}</span><span className="font-display text-sm font-semibold text-foreground">×{d.multiplier as number}</span></div>
        <div className="flex justify-between"><span className="font-display text-xs text-muted-foreground">{t('detail.demand')}</span><span className="font-display text-sm font-semibold text-foreground">{d.demandScore as number}%</span></div>
        <div className="flex justify-between"><span className="font-display text-xs text-muted-foreground">{t('detail.confidence')}</span><span className="font-display text-sm font-semibold text-foreground">{((d.confidence as number) * 100).toFixed(0)}%</span></div>
      </div>
      {d.factors && (
        <div>
          <p className="section-header">{t('detail.ai_factors')}</p>
          {(d.factors as string[]).map((f, i) => <div key={i} className="flex items-center gap-2 mb-1.5"><TrendingUp size={12} className="text-accent" /><span className="font-body text-xs text-muted-foreground">{f}</span></div>)}
        </div>
      )}
      <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold">{t('detail.apply_price')}</Button>
    </div>
  );
}

function RegulatoryDetail({ item }: { item: TimelineItem }) {
  const { t } = useLanguage();
  const d = item.data;
  const done = item.status === 'completed';
  return (
    <div className="p-5 space-y-5">
      <div>
        <h2 className="font-display font-bold text-lg text-foreground">{d.documentType as string}</h2>
        <p className="font-display text-xs text-muted-foreground mt-1">{d.property as string}</p>
      </div>
      <Row icon={User} label={t('detail.guest')} value={d.guestName as string} />
      <Row icon={MapPin} label={t('detail.nationality')} value={d.nationality as string} />
      {d.deadline && <Row icon={Clock} label={t('detail.deadline')} value={d.deadline as string} />}
      <div className="bg-muted/50 rounded-xl p-4"><p className="font-body text-sm text-foreground leading-relaxed">{d.description as string}</p></div>
      {d.autoGenerated && (
        <div className="bg-accent/5 rounded-xl p-4 border border-accent/10">
          <div className="flex items-center gap-1"><Shield size={14} className="text-accent" /><span className="font-display text-xs text-accent font-bold">{t('timeline.auto_generated')}</span></div>
          <p className="font-body text-[11px] text-muted-foreground mt-1">{t('detail.auto_gen_desc')}</p>
        </div>
      )}
      {!done ? (
        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold">{t('detail.submit')} {d.documentType as string}</Button>
      ) : (
        <div className="flex items-center gap-2 justify-center py-3"><CheckCircle2 size={18} className="text-accent" /><span className="font-display text-sm text-accent font-bold">{t('detail.submitted')}</span></div>
      )}
    </div>
  );
}

function CommunityDetail({ item }: { item: TimelineItem }) {
  const { t } = useLanguage();
  const d = item.data;
  return (
    <div className="p-5 space-y-5">
      <div>
        <h2 className="font-display font-bold text-lg text-foreground">{t('timeline.community')} — {d.region as string}</h2>
        <p className="font-display text-xs text-muted-foreground mt-1">by {d.author as string}</p>
      </div>
      <div className="bg-muted/50 rounded-xl p-4"><p className="font-body text-sm text-foreground leading-relaxed">{d.message as string}</p></div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground font-display"><span>👍 {d.likes as number}</span><span>💬 {d.replies as number}</span></div>
      <Button variant="outline" className="w-full font-display"><MessageCircle size={14} className="mr-1.5" />{t('detail.reply')}</Button>
    </div>
  );
}

function GuestFlowDetail({ item }: { item: TimelineItem }) {
  const { t } = useLanguage();
  const d = item.data;
  return (
    <div className="p-5 space-y-5">
      <div>
        <h2 className="font-display font-bold text-lg text-foreground">{t('detail.guest_self_service')}</h2>
        <p className="font-display text-xs text-muted-foreground mt-1">{d.property as string} · {d.channel as string}</p>
      </div>
      <Row icon={User} label={t('detail.guest')} value={d.guestName as string} />
      <div>
        <p className="section-header">{t('detail.sent_items')}</p>
        <div className="space-y-2">
          {(d.items as string[]).map((it, i) => <div key={i} className="flex items-center gap-2.5 font-body text-sm text-foreground"><CheckCircle2 size={16} className="text-accent" />{it}</div>)}
        </div>
      </div>
      <div className="bg-accent/5 rounded-xl p-4 border border-accent/10">
        <div className="flex items-center gap-1"><QrCode size={14} className="text-accent" /><span className="font-display text-xs text-accent font-bold">{t('detail.zero_phone')}</span></div>
        <p className="font-body text-[11px] text-muted-foreground mt-1">{d.description as string}</p>
      </div>
    </div>
  );
}

function Row({ icon: Icon, label, value, accent = false }: { icon: typeof User; label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0"><Icon size={14} className="text-muted-foreground" /></div>
      <div>
        <span className="font-display text-[10px] text-muted-foreground block">{label}</span>
        <span className={`font-display text-sm font-medium ${accent ? 'text-accent' : 'text-foreground'}`}>{value}</span>
      </div>
    </div>
  );
}

export default DetailPane;
