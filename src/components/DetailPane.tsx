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
  Shield,
  Users,
  QrCode,
  Bot,
  Send,
  TrendingUp,
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
          className="detail-pane h-full p-5 relative"
        >
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 text-muted-foreground hover:text-foreground z-10"
          >
            <X size={20} />
          </button>

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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="detail-pane h-full flex items-center justify-center p-5"
        >
          <div className="text-center">
            <CalendarCheck size={32} className="mx-auto mb-3 text-muted-foreground/30" />
            <p className="font-display text-sm text-muted-foreground">
              เลือกรายการเพื่อดูรายละเอียด
            </p>
            <p className="font-body text-xs text-muted-foreground/60 mt-1">
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
          {(item.status === 'confirmed' || item.status === 'completed') && <CheckCircle2 size={14} className="text-accent" />}
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
      <div className="text-[10px] text-muted-foreground font-display">Source: {d.source as string}</div>
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
        <p className="font-display text-xs text-muted-foreground mt-1">{d.channel as string} · {d.property as string} · {d.language === 'th' ? '🇹🇭' : '🇬🇧'}</p>
      </div>
      <DetailRow icon={User} label="From" value={d.guestName as string} />
      <div className="bg-background rounded-lg p-3">
        <MessageCircle size={14} className="text-muted-foreground mb-1" />
        <p className="font-body text-sm text-foreground leading-relaxed">{d.message as string}</p>
      </div>
      {d.aiResponse && (
        <div className="bg-background rounded-lg p-3 border-l-2 border-accent">
          <div className="flex items-center gap-1 mb-2">
            <Bot size={14} className="text-accent" />
            <span className="font-display text-xs text-accent font-semibold">AI Draft Response</span>
            <span className="font-display text-[10px] text-muted-foreground ml-auto">
              Confidence: {((d.aiConfidence as number) * 100).toFixed(0)}%
            </span>
          </div>
          <p className="font-body text-sm text-foreground leading-relaxed">{d.aiResponse as string}</p>
        </div>
      )}
      <div className="flex gap-2">
        <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 font-display">
          <Send size={14} className="mr-1" /> Send AI Reply
        </Button>
        <Button variant="outline" className="font-display">Edit</Button>
      </div>
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
        {d.autoCreated && (
          <span className="inline-block mt-1 text-[10px] bg-background text-accent px-1.5 py-0.5 rounded font-display">Auto-created</span>
        )}
      </div>
      <DetailRow icon={User} label="Assigned" value={d.assignedTo as string} />
      <div>
        <p className="font-display text-xs font-semibold text-foreground mb-2">Checklist</p>
        <ul className="space-y-2">
          {(d.checklist as string[]).map((c, i) => (
            <li key={i} className="flex items-center gap-2 font-body text-sm text-foreground">
              <CheckCircle2 size={14} className={item.status === 'completed' ? 'text-accent' : 'text-muted-foreground/30'} />
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
        <div className="flex items-center gap-2 mt-1">
          <AlertTriangle size={14} className="text-destructive" />
          <span className="font-display text-xs text-destructive capitalize">{d.severity as string} severity</span>
          {d.aiDetected && (
            <span className="text-[10px] bg-background text-accent px-1.5 py-0.5 rounded font-display font-medium">AI Detected</span>
          )}
        </div>
      </div>
      {d.guestName && <DetailRow icon={User} label="Guest" value={d.guestName as string} />}
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
      <DetailRow icon={DollarSign} label="Est. Cost" value={`฿${(d.estimatedCost as number).toLocaleString()}`} />
      {d.autoChargeReady && (
        <div className="bg-background rounded-lg p-3 border-l-2 border-accent">
          <p className="font-display text-xs text-foreground font-semibold mb-1">Auto Charge Ready</p>
          <p className="font-body text-[11px] text-muted-foreground">
            Method: {d.chargeMethod as string} · ส่งเรียกเก็บเงินอัตโนมัติภาษา{d.chargeMethod === 'Stripe' ? 'อังกฤษ' : 'ไทย'}
          </p>
        </div>
      )}
      <div className="flex gap-2">
        <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 font-display">
          Send Charge
        </Button>
        <Button variant="outline" className="font-display">Create Ticket</Button>
      </div>
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
          <span className="font-display text-xs text-muted-foreground">Demand</span>
          <span className="font-display text-sm text-foreground">{d.demandScore as number}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-display text-xs text-muted-foreground">Confidence</span>
          <span className="font-display text-sm text-foreground">{((d.confidence as number) * 100).toFixed(0)}%</span>
        </div>
      </div>
      {d.factors && (
        <div>
          <p className="font-display text-xs font-semibold text-foreground mb-2">AI Factors</p>
          <ul className="space-y-1">
            {(d.factors as string[]).map((f, i) => (
              <li key={i} className="font-body text-xs text-muted-foreground flex items-center gap-2">
                <TrendingUp size={10} className="text-accent" /> {f}
              </li>
            ))}
          </ul>
        </div>
      )}
      <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display">
        Apply Price
      </Button>
    </div>
  );
}

function RegulatoryDetail({ item }: { item: TimelineItem }) {
  const d = item.data;
  const isCompleted = item.status === 'completed';
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display font-bold text-lg text-foreground">{d.documentType as string}</h2>
        <p className="font-display text-xs text-muted-foreground mt-1">{d.property as string}</p>
      </div>
      <div className="space-y-3">
        <DetailRow icon={User} label="Guest" value={d.guestName as string} />
        <DetailRow icon={MapPin} label="Nationality" value={d.nationality as string} />
        {d.deadline && <DetailRow icon={Clock} label="Deadline" value={d.deadline as string} />}
      </div>
      <div className="bg-background rounded-lg p-3">
        <p className="font-body text-sm text-foreground leading-relaxed">{d.description as string}</p>
      </div>
      {d.autoGenerated && (
        <div className="bg-background rounded-lg p-3 border-l-2 border-accent">
          <div className="flex items-center gap-1">
            <Shield size={14} className="text-accent" />
            <span className="font-display text-xs text-accent font-semibold">Auto-generated</span>
          </div>
          <p className="font-body text-[11px] text-muted-foreground mt-1">
            เอกสารสร้างอัตโนมัติจากข้อมูลการจอง พร้อมส่ง
          </p>
        </div>
      )}
      {!isCompleted ? (
        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display">
          <Shield size={14} className="mr-1" /> Submit {d.documentType as string}
        </Button>
      ) : (
        <div className="flex items-center gap-2 justify-center py-2">
          <CheckCircle2 size={16} className="text-accent" />
          <span className="font-display text-sm text-accent font-semibold">Submitted Successfully</span>
        </div>
      )}
    </div>
  );
}

function CommunityDetail({ item }: { item: TimelineItem }) {
  const d = item.data;
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display font-bold text-lg text-foreground">Community — {d.region as string}</h2>
        <p className="font-display text-xs text-muted-foreground mt-1">by {d.author as string}</p>
      </div>
      <div className="bg-background rounded-lg p-4">
        <p className="font-body text-sm text-foreground leading-relaxed">{d.message as string}</p>
      </div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground font-display">
        <span>👍 {d.likes as number} likes</span>
        <span>💬 {d.replies as number} replies</span>
      </div>
      <Button variant="outline" className="w-full font-display">
        <MessageCircle size={14} className="mr-1" /> Reply
      </Button>
    </div>
  );
}

function GuestFlowDetail({ item }: { item: TimelineItem }) {
  const d = item.data;
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display font-bold text-lg text-foreground">Guest Self-Service</h2>
        <p className="font-display text-xs text-muted-foreground mt-1">{d.property as string} · {d.channel as string}</p>
      </div>
      <DetailRow icon={User} label="Guest" value={d.guestName as string} />
      <div>
        <p className="font-display text-xs font-semibold text-foreground mb-2">Sent Items</p>
        <div className="space-y-2">
          {(d.items as string[]).map((it, i) => (
            <div key={i} className="flex items-center gap-2 font-body text-sm text-foreground">
              <CheckCircle2 size={14} className="text-accent" />
              {it}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-background rounded-lg p-3 border-l-2 border-accent">
        <div className="flex items-center gap-1">
          <QrCode size={14} className="text-accent" />
          <span className="font-display text-xs text-accent font-semibold">Zero-Phone</span>
        </div>
        <p className="font-body text-[11px] text-muted-foreground mt-1">
          {d.description as string}
        </p>
      </div>
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
      <Icon size={14} className="text-muted-foreground flex-shrink-0" />
      <span className="font-display text-xs text-muted-foreground w-20 flex-shrink-0">{label}</span>
      <span className={`font-display text-sm font-medium ${accent ? 'text-accent' : 'text-foreground'}`}>
        {value}
      </span>
    </div>
  );
}

export default DetailPane;
