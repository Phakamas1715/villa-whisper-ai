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
  Shield,
  Users,
  QrCode,
  Bot,
} from 'lucide-react';
import GenerativeArt from './GenerativeArt';
import type { TimelineItem } from '@/data/mockData';

interface TimelineCardProps {
  item: TimelineItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const typeConfig: Record<string, { icon: typeof CalendarCheck; accent: string; label: string }> = {
  booking: { icon: CalendarCheck, accent: 'text-accent', label: 'Booking' },
  inquiry: { icon: MessageCircle, accent: 'text-primary', label: 'Inquiry' },
  task: { icon: Sparkles, accent: 'text-primary', label: 'Task' },
  damage: { icon: AlertTriangle, accent: 'text-destructive', label: 'Damage' },
  pricing: { icon: TrendingUp, accent: 'text-accent', label: 'Pricing AI' },
  regulatory: { icon: Shield, accent: 'text-destructive', label: 'Regulatory' },
  community: { icon: Users, accent: 'text-primary', label: 'Community' },
  guest_flow: { icon: QrCode, accent: 'text-accent', label: 'Guest Flow' },
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
            <span className="font-display text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              {config.label}
            </span>
            {statusIcon(item.status)}
          </div>
          <span className="font-display font-semibold text-sm text-foreground leading-snug block">
            {item.title}
          </span>
          <p className="font-body text-xs text-muted-foreground leading-relaxed mt-1">
            {item.subtitle}
          </p>

          {/* AI response preview for inquiries */}
          {item.type === 'inquiry' && item.data.aiResponse && (
            <div className="mt-2 bg-background rounded-md p-2 border border-border">
              <div className="flex items-center gap-1 mb-1">
                <Bot size={10} className="text-accent" />
                <span className="font-display text-[10px] text-accent font-medium">AI Draft ({((item.data.aiConfidence as number) * 100).toFixed(0)}%)</span>
              </div>
              <p className="font-body text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                {item.data.aiResponse as string}
              </p>
            </div>
          )}

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
              {item.data.factors && (
                <span className="text-[10px] text-muted-foreground font-display">
                  · {(item.data.factors as string[]).length} factors
                </span>
              )}
            </div>
          )}

          {/* Damage cost */}
          {item.type === 'damage' && (
            <div className="mt-2 flex items-center gap-2">
              <span className="font-display text-xs text-destructive">
                Est. ฿{(item.data.estimatedCost as number).toLocaleString()}
              </span>
              {item.data.aiDetected && (
                <span className="text-[10px] bg-background text-accent px-1.5 py-0.5 rounded font-display font-medium">
                  AI Detected
                </span>
              )}
            </div>
          )}

          {/* Guest flow items */}
          {item.type === 'guest_flow' && item.data.items && (
            <div className="mt-2 flex flex-wrap gap-1">
              {(item.data.items as string[]).map((it, i) => (
                <span key={i} className="text-[10px] bg-background text-muted-foreground px-1.5 py-0.5 rounded font-display">
                  {it}
                </span>
              ))}
            </div>
          )}

          {/* Community likes/replies */}
          {item.type === 'community' && (
            <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground font-display">
              <span>👍 {item.data.likes as number}</span>
              <span>💬 {item.data.replies as number}</span>
              <span className="text-primary">{item.data.region as string}</span>
            </div>
          )}

          {/* Regulatory deadline */}
          {item.type === 'regulatory' && item.data.deadline && (
            <div className="mt-2">
              <span className="font-display text-[10px] text-destructive font-medium">
                Deadline: {item.data.deadline as string}
              </span>
              {item.data.autoGenerated && (
                <span className="ml-2 text-[10px] bg-background text-accent px-1.5 py-0.5 rounded font-display">
                  Auto-generated
                </span>
              )}
            </div>
          )}
        </div>
        <div className="text-[10px] text-muted-foreground font-display whitespace-nowrap text-right">
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
