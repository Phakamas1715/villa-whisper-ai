import { mockTimeline } from '@/data/mockData';
import { Shield, CheckCircle2, Clock, AlertTriangle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RegulatoryView = () => {
  const regulatoryItems = mockTimeline.filter((t) => t.type === 'regulatory');
  const pending = regulatoryItems.filter((t) => t.status === 'pending');
  const completed = regulatoryItems.filter((t) => t.status === 'completed');

  return (
    <div>
      <h2 className="font-display font-bold text-lg text-foreground mb-1">Thai Regulatory Intelligence</h2>
      <p className="font-body text-xs text-muted-foreground mb-4">
        TM30 · TDAC · ภาษี ภ.ง.ด. — ระบบจัดการเอกสารอัตโนมัติ
      </p>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        <button className="timeline-card flex flex-col items-center justify-center py-4 hover:ring-1 hover:ring-accent transition-all">
          <Shield size={20} className="text-accent mb-1" />
          <span className="font-display text-xs font-semibold text-foreground">TM30</span>
          <span className="font-display text-[10px] text-muted-foreground">Auto-generate</span>
        </button>
        <button className="timeline-card flex flex-col items-center justify-center py-4 hover:ring-1 hover:ring-accent transition-all">
          <FileText size={20} className="text-primary mb-1" />
          <span className="font-display text-xs font-semibold text-foreground">ภ.ง.ด.</span>
          <span className="font-display text-[10px] text-muted-foreground">Export ภาษี</span>
        </button>
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <div className="mb-6">
          <h3 className="font-display text-xs font-semibold text-destructive uppercase tracking-wider mb-2 flex items-center gap-1">
            <AlertTriangle size={12} /> Action Required ({pending.length})
          </h3>
          <div className="space-y-2">
            {pending.map((item) => (
              <div key={item.id} className="timeline-card border-l-2 border-destructive">
                <div className="flex items-center gap-2 mb-1">
                  <Clock size={14} className="text-destructive" />
                  <span className="font-display text-sm font-medium text-foreground">{item.title}</span>
                </div>
                <p className="font-body text-xs text-muted-foreground">{item.subtitle}</p>
                {item.data.deadline && (
                  <p className="font-display text-[10px] text-destructive mt-1">
                    Deadline: {item.data.deadline as string}
                  </p>
                )}
                <Button size="sm" className="mt-2 bg-accent text-accent-foreground hover:bg-accent/90 font-display text-xs">
                  Submit Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed */}
      {completed.length > 0 && (
        <div>
          <h3 className="font-display text-xs font-semibold text-accent uppercase tracking-wider mb-2 flex items-center gap-1">
            <CheckCircle2 size={12} /> Completed ({completed.length})
          </h3>
          <div className="space-y-2">
            {completed.map((item) => (
              <div key={item.id} className="timeline-card opacity-75">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-accent" />
                  <span className="font-display text-sm text-foreground">{item.title}</span>
                </div>
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
