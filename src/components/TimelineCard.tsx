import { motion } from 'framer-motion';
import {
  CalendarCheck, MessageCircle, AlertTriangle, TrendingUp,
  CheckCircle2, Clock, Loader2, Shield, Users, QrCode, Bot, Sparkles,
} from 'lucide-react';
import GenerativeArt from './GenerativeArt';
import { propertyImages } from '@/data/mockData';
import type { TimelineItem } from '@/data/mockData';

interface TimelineCardProps {
  item: TimelineItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const typeConfig: Record<string, { icon: typeof CalendarCheck; color: string; label: string }> = {
  booking: { icon: CalendarCheck, color: 'text-accent', label: 'Booking' },
  inquiry: { icon: MessageCircle, color: 'text-villa-ocean', label: 'Inquiry' },
  task: { icon: Sparkles, color: 'text-villa-gold', label: 'Task' },
  damage: { icon: AlertTriangle, color: 'text-destructive', label: 'Damage' },
  pricing: { icon: TrendingUp, color: 'text-accent', label: 'Pricing AI' },
  regulatory: { icon: Shield, color: 'text-destructive', label: 'Regulatory' },
  community: { icon: Users, color: 'text-villa-ocean', label: 'Community' },
  guest_flow: { icon: QrCode, color: 'text-accent', label: 'Guest Flow' },
};

const statusBadge = (status?: string) => {
  switch (status) {
    case 'confirmed':
    case 'completed':
      return <span className="badge-accent flex items-center gap-1"><CheckCircle2 size={10} /> {status}</span>;
    case 'in_progress':
      return <span className="badge-muted flex items-center gap-1"><Loader2 size={10} className="animate-spin" /> In Progress</span>;
    case 'pending':
    case 'reported':
      return <span className="badge-muted flex items-center gap-1"><Clock size={10} /> {status}</span>;
    default:
      return null;
  }
};

const formatTime = (ts: string) => new Date(ts).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

const formatDate = (ts: string) => {
  const d = new Date(ts);
  const today = new Date();
  if (d.toDateString() === today.toDateString()) return 'Today';
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const TimelineCard = ({ item, isSelected, onSelect }: TimelineCardProps) => {
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
      {/* Property image header for bookings */}
      {item.type === 'booking' && propertyImage && (
        <div className="relative h-32 overflow-hidden">
          <img src={propertyImage} alt={propertyName} className="w-full h-full object-cover" />
          {showArt && (
            <div className="absolute inset-0 opacity-40">
              <GenerativeArt seed={item.data.artSeed as number} width={500} height={128} className="w-full h-full" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4">
            <span className="font-display font-bold text-sm text-primary-foreground">{propertyName}</span>
          </div>
          <div className="absolute top-3 right-3">
            {statusBadge(item.status)}
          </div>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 p-1.5 rounded-lg bg-muted/50 ${config.color}`}>
            <Icon size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-display text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {config.label}
              </span>
              {item.type !== 'booking' && statusBadge(item.status)}
            </div>
            <h3 className="font-display font-semibold text-sm text-foreground leading-snug">
              {item.title}
            </h3>
            <p className="font-body text-xs text-muted-foreground leading-relaxed mt-1">
              {item.subtitle}
            </p>

            {/* AI response preview for inquiries */}
            {item.type === 'inquiry' && item.data.aiResponse && (
              <div className="mt-3 bg-accent/5 rounded-lg p-2.5 border border-accent/10">
                <div className="flex items-center gap-1 mb-1">
                  <Bot size={10} className="text-accent" />
                  <span className="font-display text-[10px] text-accent font-semibold">
                    AI Draft · {((item.data.aiConfidence as number) * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="font-body text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                  {item.data.aiResponse as string}
                </p>
              </div>
            )}

            {/* Booking price */}
            {item.type === 'booking' && item.data.totalPrice && (
              <div className="mt-2 flex items-center gap-2">
                <span className="font-display text-sm font-bold text-accent">
                  ฿{(item.data.totalPrice as number).toLocaleString()}
                </span>
                <span className="badge-muted">{item.data.source as string}</span>
              </div>
            )}

            {/* Price suggestion */}
            {item.type === 'pricing' && (
              <div className="mt-2 flex items-center gap-2">
                <span className="font-display text-xs text-muted-foreground line-through">
                  ฿{(item.data.currentPrice as number).toLocaleString()}
                </span>
                <span className="font-display text-sm font-bold text-accent">
                  ฿{(item.data.suggestedPrice as number).toLocaleString()}/night
                </span>
              </div>
            )}

            {/* Damage */}
            {item.type === 'damage' && (
              <div className="mt-2 flex items-center gap-2">
                <span className="font-display text-sm font-semibold text-destructive">
                  Est. ฿{(item.data.estimatedCost as number).toLocaleString()}
                </span>
                {item.data.aiDetected && <span className="badge-accent">AI Detected</span>}
              </div>
            )}

            {/* Guest flow items */}
            {item.type === 'guest_flow' && item.data.items && (
              <div className="mt-2 flex flex-wrap gap-1">
                {(item.data.items as string[]).map((it, i) => (
                  <span key={i} className="badge-muted">{it}</span>
                ))}
              </div>
            )}

            {/* Community */}
            {item.type === 'community' && (
              <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground font-display">
                <span>👍 {item.data.likes as number}</span>
                <span>💬 {item.data.replies as number}</span>
                <span className="badge-muted">{item.data.region as string}</span>
              </div>
            )}

            {/* Regulatory deadline */}
            {item.type === 'regulatory' && item.data.deadline && (
              <div className="mt-2 flex items-center gap-2">
                <span className="badge-destructive">Deadline: {item.data.deadline as string}</span>
                {item.data.autoGenerated && <span className="badge-accent">Auto-generated</span>}
              </div>
            )}
          </div>

          <div className="text-[10px] text-muted-foreground font-display whitespace-nowrap text-right flex-shrink-0">
            {formatDate(item.timestamp)}
            <br />
            {formatTime(item.timestamp)}
          </div>
        </div>
      </div>

      {showArt && (
        <div className="px-4 pb-3">
          <p className="font-body text-[10px] text-muted-foreground/60 italic">
            Unique art for booking #{item.id} — generated from season & demand
          </p>
        </div>
      )}
    </motion.button>
  );
};

export default TimelineCard;
