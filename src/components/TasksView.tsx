import { mockTimeline } from '@/data/mockData';
import { CheckCircle2, Clock, Loader2, Sparkles } from 'lucide-react';

const TasksView = () => {
  const tasks = mockTimeline.filter((t) => t.type === 'task');
  const active = tasks.filter((t) => t.status !== 'completed');
  const completed = tasks.filter((t) => t.status === 'completed');

  return (
    <div>
      <h2 className="font-display font-bold text-lg text-foreground mb-1">Tasks & Ops</h2>
      <p className="font-body text-xs text-muted-foreground mb-4">
        แม่บ้าน · ช่าง · Maintenance — Auto-assigned
      </p>

      {active.length > 0 && (
        <div className="mb-6">
          <h3 className="font-display text-xs font-semibold text-primary uppercase tracking-wider mb-2">
            Active ({active.length})
          </h3>
          <div className="space-y-2">
            {active.map((item) => (
              <div key={item.id} className="timeline-card">
                <div className="flex items-center gap-2 mb-1">
                  <Loader2 size={14} className="text-muted-foreground animate-spin" />
                  <span className="font-display text-sm font-medium text-foreground">{item.title}</span>
                </div>
                <p className="font-body text-xs text-muted-foreground">{item.subtitle}</p>
                {item.data.autoCreated && (
                  <span className="inline-block mt-1 text-[10px] bg-background text-accent px-1.5 py-0.5 rounded font-display">
                    Auto-created
                  </span>
                )}
                {item.data.checklist && (
                  <div className="mt-2 space-y-1">
                    {(item.data.checklist as string[]).map((c, i) => (
                      <div key={i} className="flex items-center gap-2 font-body text-xs text-muted-foreground">
                        <div className="w-3 h-3 rounded border border-muted-foreground/30" />
                        {c}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {completed.length > 0 && (
        <div>
          <h3 className="font-display text-xs font-semibold text-accent uppercase tracking-wider mb-2">
            Completed ({completed.length})
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

export default TasksView;
