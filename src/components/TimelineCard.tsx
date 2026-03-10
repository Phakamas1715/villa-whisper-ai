import { motion } from 'framer-motion';
import {
  CalendarCheck,
  MessageCircle,
  Sparkles,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  Clock,
  Loader2,
} from 'lucide-react';
import GenerativeArt from './GenerativeArt';
import type { TimelineItem } from '@/data/mockData';

interface TimelineCardProps {
  item: TimelineItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const typeConfig: Record<string, { icon: typeof CalendarCheck; accent: string }> = {
  booking: { icon: CalendarCheck, accent: 'text-accent' },
  inquiry: { icon: MessageCircle, accent: 'text-muted-foreground' },
  task: { icon: Sparkles, accent: 'text-primary' },
  damage: { icon: AlertTriangle, accent: 'text-destructive' },
  pricing: { icon: TrendingUp, accent: 'text-accent' },
};

const statusIcon = (status?: string) => {
  switch (status) {
    case 'confirmed':
    case 'completed':
      return <CheckCircle2 size={14} className="text-accent" />;
    case 'in_progress':
      return <Loader2 size={14} className="text-muted-foreground animate-spin" />;
    case 'pending':
    case 'reported':
      return <Clock size={14} className="text-muted-foreground" />;
    default:
      return null;
  }
};

const formatTime = (ts: string) => {
  const d = new Date(ts);
  return d.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
};

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

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => onSelect(item.id)}
      className={`timeline-card w-full text-left cursor-pointer ${isSelected ? 'selected' : ''}`}
    >
      {/* Art reveal for confirmed bookings */}
      {showArt && (
        <div className="mb-3 -mx-4 -mt-4 overflow-hidden rounded-t-lg animate-art-reveal">
          <GenerativeArt
            seed={item.data.artSeed as number}
            width={400}
            height={140}
            className="w-full"
          />
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${config.accent}`}>
          <Icon size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-display font-semibold text-sm text-foreground truncate">
              {item.title}
            </span>
            {statusIcon(item.status)}
          </div>
          <p className="font-body text-xs text-muted-foreground leading-relaxed">
            {item.subtitle}
          </p>

          {/* Price tag for bookings */}
          {item.type === 'booking' && item.data.totalPrice && (
            <div className="mt-2 flex items-center gap-2">
              <span className="font-display text-xs font-semibold text-accent">
                ฿{(item.data.totalPrice as number).toLocaleString()}
              </span>
              <span className="text-[10px] text-muted-foreground font-display">
                via {item.data.source as string}
              </span>
            </div>
          )}

          {/* Price suggestion */}
          {item.type === 'pricing' && (
            <div className="mt-2 flex items-center gap-3">
              <span className="font-display text-xs text-muted-foreground line-through">
                ฿{(item.data.currentPrice as number).toLocaleString()}
              </span>
              <span className="font-display text-xs font-semibold text-accent">
                ฿{(item.data.suggestedPrice as number).toLocaleString()}/night
              </span>
            </div>
          )}

          {/* Damage cost */}
          {item.type === 'damage' && (
            <div className="mt-2">
              <span className="font-display text-xs text-destructive">
                Est. ฿{(item.data.estimatedCost as number).toLocaleString()}
              </span>
            </div>
          )}
        </div>
        <div className="text-[10px] text-muted-foreground font-display whitespace-nowrap">
          {formatDate(item.timestamp)}
          <br />
          {formatTime(item.timestamp)}
        </div>
      </div>

      {showArt && (
        <p className="mt-2 text-[10px] text-muted-foreground font-body italic">
          Art for booking #{item.id}. Generated from season, demand & your unique stay.
        </p>
      )}
    </motion.button>
  );
};

export default TimelineCard;
