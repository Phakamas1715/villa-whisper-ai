import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarCheck,
  User,
  MapPin,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MessageCircle,
  X,
} from 'lucide-react';
import GenerativeArt from './GenerativeArt';
import type { TimelineItem } from '@/data/mockData';
import { Button } from '@/components/ui/button';

interface DetailPaneProps {
  item: TimelineItem | null;
  onClose: () => void;
}

const DetailPane = ({ item, onClose }: DetailPaneProps) => {
  return (
    <AnimatePresence mode="wait">
      {item ? (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.25 }}
          className="detail-pane h-full p-5"
        >
          {/* Close on mobile */}
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          >
            <X size={20} />
          </button>

          {/* Booking detail */}
          {item.type === 'booking' && <BookingDetail item={item} />}
          {item.type === 'inquiry' && <InquiryDetail item={item} />}
          {item.type === 'task' && <TaskDetail item={item} />}
          {item.type === 'damage' && <DamageDetail item={item} />}
          {item.type === 'pricing' && <PricingDetail item={item} />}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="detail-pane h-full flex items-center justify-center p-5"
        >
          <div className="text-center">
            <CalendarCheck size={32} className="mx-auto mb-3 text-muted-foreground/30" />
            <p className="font-display text-sm text-muted-foreground">
              Select an item to view details
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function BookingDetail({ item }: { item: TimelineItem }) {
  const d = item.data;
  return (
    <div className="space-y-5">
      {item.status === 'confirmed' && d.artSeed && (
        <div className="-mx-5 -mt-5 overflow-hidden rounded-t-lg">
          <GenerativeArt seed={d.artSeed as number} width={500} height={200} className="w-full" />
        </div>
      )}
      <div>
        <h2 className="font-display font-bold text-lg text-foreground">{d.property as string}</h2>
        <div className="flex items-center gap-1 mt-1">
          {item.status === 'confirmed' && <CheckCircle2 size={14} className="text-accent" />}
          {item.status === 'completed' && <CheckCircle2 size={14} className="text-accent" />}
          {item.status === 'pending' && <Clock size={14} className="text-muted-foreground" />}
          <span className="font-display text-xs capitalize text-muted-foreground">{item.status}</span>
        </div>
      </div>

      <div className="space-y-3">
        <DetailRow icon={User} label="Guest" value={d.guestName as string} />
        <DetailRow icon={CalendarCheck} label="Check-in" value={d.checkIn as string} />
        <DetailRow icon={CalendarCheck} label="Check-out" value={d.checkOut as string} />
        <DetailRow icon={MapPin} label="Guests" value={`${d.guests} guests`} />
        <DetailRow icon={DollarSign} label="Total" value={`฿${(d.totalPrice as number).toLocaleString()}`} accent />
      </div>

      <div className="text-[10px] text-muted-foreground font-display">
        Source: {d.source as string}
      </div>

      {item.status === 'pending' && (
        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display">
          Confirm Booking
        </Button>
      )}
    </div>
  );
}

function InquiryDetail({ item }: { item: TimelineItem }) {
  const d = item.data;
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display font-bold text-lg text-foreground">Inquiry</h2>
        <p className="font-display text-xs text-muted-foreground mt-1">{d.channel as string} · {d.property as string}</p>
      </div>
      <div className="space-y-3">
        <DetailRow icon={User} label="From" value={d.guestName as string} />
        <div className="bg-background rounded-lg p-3">
          <MessageCircle size={14} className="text-muted-foreground mb-1" />
          <p className="font-body text-sm text-foreground leading-relaxed">{d.message as string}</p>
        </div>
      </div>
      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display">
        Reply via AI
      </Button>
    </div>
  );
}

function TaskDetail({ item }: { item: TimelineItem }) {
  const d = item.data;
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display font-bold text-lg text-foreground">{d.property as string}</h2>
        <p className="font-display text-xs text-muted-foreground mt-1 capitalize">{d.taskType as string} · {d.scheduledTime as string}</p>
      </div>
      <DetailRow icon={User} label="Assigned" value={d.assignedTo as string} />
      <div>
        <p className="font-display text-xs font-semibold text-foreground mb-2">Checklist</p>
        <ul className="space-y-2">
          {(d.checklist as string[]).map((c, i) => (
            <li key={i} className="flex items-center gap-2 font-body text-sm text-foreground">
              <CheckCircle2
                size={14}
                className={item.status === 'completed' ? 'text-accent' : 'text-muted-foreground/30'}
              />
              {c}
            </li>
          ))}
        </ul>
      </div>
      {item.status !== 'completed' && (
        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display">
          Mark as Completed
        </Button>
      )}
    </div>
  );
}

function DamageDetail({ item }: { item: TimelineItem }) {
  const d = item.data;
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display font-bold text-lg text-foreground">{d.property as string}</h2>
        <div className="flex items-center gap-1 mt-1">
          <AlertTriangle size={14} className="text-destructive" />
          <span className="font-display text-xs text-destructive capitalize">{d.severity as string} severity</span>
        </div>
      </div>
      <div className="bg-background rounded-lg p-3">
        <p className="font-body text-sm text-foreground leading-relaxed">{d.description as string}</p>
      </div>
      <div>
        <p className="font-display text-xs font-semibold text-foreground mb-1">Damaged Items</p>
        <ul className="space-y-1">
          {(d.items as string[]).map((it, i) => (
            <li key={i} className="font-body text-sm text-foreground">• {it}</li>
          ))}
        </ul>
      </div>
      <DetailRow icon={DollarSign} label="Estimated Cost" value={`฿${(d.estimatedCost as number).toLocaleString()}`} accent={false} />
      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display">
        Create Maintenance Ticket
      </Button>
    </div>
  );
}

function PricingDetail({ item }: { item: TimelineItem }) {
  const d = item.data;
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display font-bold text-lg text-foreground">{d.property as string}</h2>
        <p className="font-display text-xs text-muted-foreground mt-1">{d.period as string}</p>
      </div>
      <div className="bg-background rounded-lg p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-display text-xs text-muted-foreground">Current</span>
          <span className="font-display text-sm line-through text-muted-foreground">฿{(d.currentPrice as number).toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-display text-xs text-foreground font-semibold">Suggested</span>
          <span className="font-display text-lg font-bold text-accent">฿{(d.suggestedPrice as number).toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-display text-xs text-muted-foreground">Multiplier</span>
          <span className="font-display text-sm text-foreground">×{d.multiplier as number}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-display text-xs text-muted-foreground">Demand Score</span>
          <span className="font-display text-sm text-foreground">{d.demandScore as number}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-display text-xs text-muted-foreground">Confidence</span>
          <span className="font-display text-sm text-foreground">{((d.confidence as number) * 100).toFixed(0)}%</span>
        </div>
      </div>
      <div className="font-body text-xs text-muted-foreground italic leading-relaxed">
        Based on historical demand, local events, and seasonal patterns analyzed by the JEPA pricing engine.
      </div>
      <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display">
        Apply Price
      </Button>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
  accent = false,
}: {
  icon: typeof User;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon size={14} className="text-muted-foreground" />
      <span className="font-display text-xs text-muted-foreground w-20">{label}</span>
      <span className={`font-display text-sm font-medium ${accent ? 'text-accent' : 'text-foreground'}`}>
        {value}
      </span>
    </div>
  );
}

export default DetailPane;
