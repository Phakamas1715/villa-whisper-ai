import { motion } from 'framer-motion';
import {
  CalendarCheck, MessageCircle, AlertTriangle, TrendingUp,
  CheckCircle2, Clock, Loader2, Shield, Users, QrCode, Bot, Sparkles,
} from 'lucide-react';
import GenerativeArt from './GenerativeArt';
import { propertyImages } from '@/data/mockData';
import type { TimelineItem } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';

interface TimelineCardProps {
  item: TimelineItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const TimelineCard = ({ item, isSelected, onSelect }: TimelineCardProps) => {
  const { t } = useLanguage();

  const typeConfig: Record<string, { icon: typeof CalendarCheck; color: string; bg: string; label: string }> = {
    booking: { icon: CalendarCheck, color: 'text-accent', bg: 'bg-accent/10', label: t('timeline.booking') },
    inquiry: { icon: MessageCircle, color: 'text-villa-ocean', bg: 'bg-villa-ocean/10', label: t('timeline.inquiry') },
    task: { icon: Sparkles, color: 'text-villa-gold', bg: 'bg-villa-gold/10', label: t('timeline.task') },
    damage: { icon: AlertTriangle, color: 'text-destructive', bg: 'bg-destructive/10', label: t('timeline.damage') },
    pricing: { icon: TrendingUp, color: 'text-accent', bg: 'bg-accent/10', label: t('timeline.pricing_ai') },
    regulatory: { icon: Shield, color: 'text-destructive', bg: 'bg-destructive/10', label: t('timeline.regulatory') },
    community: { icon: Users, color: 'text-villa-ocean', bg: 'bg-villa-ocean/10', label: t('timeline.community') },
    guest_flow: { icon: QrCode, color: 'text-accent', bg: 'bg-accent/10', label: t('timeline.guest_flow') },
  };

  const statusBadge = (status?: string) => {
    switch (status) {
      case 'confirmed':
        return <span className="badge-accent flex items-center gap-1"><CheckCircle2 size={10} /> {t('timeline.booking')}</span>;
      case 'completed':
        return <span className="badge-accent flex items-center gap-1"><CheckCircle2 size={10} /> ✓</span>;
      case 'in_progress':
        return <span className="badge-muted flex items-center gap-1"><Loader2 size={10} className="animate-spin" /> {t('stats.active')}</span>;
      case 'pending':
        return <span className="inline-flex items-center gap-1 text-[10px] font-display font-semibold px-2 py-0.5 rounded-full bg-villa-gold/10 text-villa-gold"><Clock size={10} /> {t('stats.pending')}</span>;
      case 'reported':
        return <span className="badge-destructive flex items-center gap-1"><AlertTriangle size={10} /> {t('timeline.damage')}</span>;
      default:
        return null;
    }
  };

  const formatTime = (ts: string) => new Date(ts).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
  const formatDate = (ts: string) => {
    const d = new Date(ts);
    const today = new Date();
    if (d.toDateString() === today.toDateString()) return t('timeline.today');
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (d.toDateString() === yesterday.toDateString()) return t('timeline.yesterday');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const config = typeConfig[item.type] || typeConfig.booking;
  const Icon = config.icon;
  const showArt = item.type === 'booking' && item.status === 'confirmed';
  const propertyName = item.data.property as string | undefined;
  const propertyImage = propertyName ? propertyImages[propertyName] : undefined;

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onClick={() => onSelect(item.id)}
      className={`glass-card w-full text-left cursor-pointer p-0 overflow-hidden ${isSelected ? 'selected' : ''}`}
    >
      {/* Image header for bookings */}
      {item.type === 'booking' && propertyImage && (
        <div className="relative h-36 overflow-hidden">
          <img src={propertyImage} alt={propertyName} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
          {showArt && (
            <div className="absolute inset-0 opacity-30 mix-blend-overlay">
              <GenerativeArt seed={item.data.artSeed as number} width={500} height={144} className="w-full h-full" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
            <span className="font-display font-bold text-sm text-primary-foreground drop-shadow-sm">{propertyName}</span>
            {statusBadge(item.status)}
          </div>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 p-2 rounded-xl ${config.bg} ${config.color} flex-shrink-0`}>
            <Icon size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-display text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{config.label}</span>
              {item.type !== 'booking' && statusBadge(item.status)}
            </div>
            <h3 className="font-display font-semibold text-sm text-foreground leading-snug">{item.title}</h3>
            <p className="font-body text-xs text-muted-foreground leading-relaxed mt-1">{item.subtitle}</p>

            {/* AI draft for inquiry */}
            {item.type === 'inquiry' && item.data.aiResponse && (
              <div className="mt-3 bg-accent/5 rounded-xl p-3 border border-accent/15">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Bot size={12} className="text-accent" />
                  <span className="font-display text-[10px] text-accent font-bold">
                    {t('timeline.ai_draft')} · {((item.data.aiConfidence as number) * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="font-body text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{item.data.aiResponse as string}</p>
              </div>
            )}

            {/* Booking price */}
            {item.type === 'booking' && item.data.totalPrice && (
              <div className="mt-2.5 flex items-center gap-2">
                <span className="font-display text-base font-bold text-accent">฿{(item.data.totalPrice as number).toLocaleString()}</span>
                <span className="badge-muted">{item.data.source as string}</span>
              </div>
            )}

            {/* Pricing suggestion */}
            {item.type === 'pricing' && (
              <div className="mt-2.5 flex items-center gap-2">
                <span className="font-display text-xs text-muted-foreground line-through">฿{(item.data.currentPrice as number).toLocaleString()}</span>
                <span className="font-display text-base font-bold text-accent">฿{(item.data.suggestedPrice as number).toLocaleString()}{t('detail.night')}</span>
              </div>
            )}

            {/* Damage cost */}
            {item.type === 'damage' && (
              <div className="mt-2.5 flex items-center gap-2">
                <span className="font-display text-sm font-semibold text-destructive">Est. ฿{(item.data.estimatedCost as number).toLocaleString()}</span>
                {item.data.aiDetected && <span className="badge-accent">{t('timeline.ai_detected')}</span>}
              </div>
            )}

            {/* Guest flow items */}
            {item.type === 'guest_flow' && item.data.items && (
              <div className="mt-2.5 flex flex-wrap gap-1">
                {(item.data.items as string[]).slice(0, 3).map((it, i) => <span key={i} className="badge-muted">{it}</span>)}
                {(item.data.items as string[]).length > 3 && <span className="badge-muted">+{(item.data.items as string[]).length - 3}</span>}
              </div>
            )}

            {/* Community engagement */}
            {item.type === 'community' && (
              <div className="mt-2.5 flex items-center gap-3 text-[11px] text-muted-foreground font-display">
                <span>👍 {item.data.likes as number}</span>
                <span>💬 {item.data.replies as number}</span>
                <span className="badge-muted">{item.data.region as string}</span>
              </div>
            )}

            {/* Regulatory deadline */}
            {item.type === 'regulatory' && item.data.deadline && (
              <div className="mt-2.5 flex items-center gap-2">
                <span className="badge-destructive">{t('detail.deadline')}: {item.data.deadline as string}</span>
                {item.data.autoGenerated && <span className="badge-accent">{t('timeline.auto_generated')}</span>}
              </div>
            )}
          </div>

          <div className="text-[10px] text-muted-foreground font-display whitespace-nowrap text-right flex-shrink-0">
            {formatDate(item.timestamp)}<br />{formatTime(item.timestamp)}
          </div>
        </div>
      </div>
    </motion.button>
  );
};

export default TimelineCard;
